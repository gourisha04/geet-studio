const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Centralized fetch wrapper for backend API calls.
 * Targets http://localhost:5000 in development unless configured via VITE_API_URL.
 * Includes credentials for httpOnly cookie auth and safe JSON error handling.
 */
export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Don't set Content-Type for FormData (file uploads)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (netErr) {
    const error = new Error('Unable to connect to Geet Studio API server. Please ensure the backend is running.');
    error.status = 0;
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMsg = data?.message || (isJson ? `API Error: ${response.status}` : `Server returned invalid response (${response.status})`);
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => apiFetch(path),
  post: (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiFetch(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => apiFetch(path, { method: 'DELETE' }),
  upload: (path, formData) => apiFetch(path, { method: 'POST', body: formData }),
};
