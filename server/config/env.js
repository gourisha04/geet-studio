export const validateEnv = () => {
  const required = ['PORT', 'JWT_SECRET', 'COOKIE_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️ Warning: Missing non-critical env variables: ${missing.join(', ')}. Default fallbacks will be used.`);
  }

  console.log(`✅ Environment Loaded — Node Env: ${process.env.NODE_ENV || 'development'}`);
};
