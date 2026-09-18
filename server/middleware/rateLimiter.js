// Sliding-window API Rate Limiter
//
// Two deliberate behaviours keep normal browsing from locking real visitors out:
//   * Only requests that were actually allowed are recorded. A rejected request must never
//     extend the window, otherwise a client that keeps retrying (the page-view telemetry
//     beacon retries on every page load) would keep the bucket full forever.
//   * Buckets are namespaced per limiter AND keyed by the real client IP (see `trust proxy` in
//     server.js), so one limiter's traffic can never be counted against another's budget.
//   * Stale buckets are swept periodically so memory stays bounded on a long-running server.
const requestsMap = new Map();

// A bucket with no activity for an hour is stale and can be dropped.
const STALE_BUCKET_MS = 60 * 60 * 1000;
const SWEEP_INTERVAL_MS = 60 * 1000;
let lastSweep = 0;
let limiterInstances = 0;

// `req.ip` already resolves to the real visitor address once `trust proxy` is configured;
// the socket address is only a safety net if that is ever unavailable.
const resolveClientIp = (req) => req.ip || req.socket?.remoteAddress || '127.0.0.1';

const sweepStaleBuckets = (now) => {
  if (now - lastSweep < SWEEP_INTERVAL_MS) {
    return;
  }
  lastSweep = now;
  for (const [key, timestamps] of requestsMap) {
    if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] > STALE_BUCKET_MS) {
      requestsMap.delete(key);
    }
  }
};

export const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000, options = {}) => {
  // Every limiter keeps its own buckets per client. Sharing one bucket between limiter
  // instances would let e.g. page-view telemetry silently spend the write budget.
  limiterInstances += 1;
  const namespace = options.namespace || `limiter_${limiterInstances}`;

  return (req, res, next) => {
    if (options.skip?.(req)) {
      return next();
    }

    const ip = options.keyGenerator ? options.keyGenerator(req) : resolveClientIp(req);
    const bucketKey = `${namespace}:${ip}`;
    const now = Date.now();

    sweepStaleBuckets(now);

    const timestamps = (requestsMap.get(bucketKey) || []).filter((t) => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
      // Rejected requests are intentionally not recorded (see header note above).
      requestsMap.set(bucketKey, timestamps);
      const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - timestamps[0])) / 1000));
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message: 'Too many requests from this IP. Please try again later.',
      });
    }

    timestamps.push(now);
    requestsMap.set(bucketKey, timestamps);

    next();
  };
};
