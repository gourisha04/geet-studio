import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Cost factor kept in line with the existing authentication layer (register / login).
const BCRYPT_SALT_ROUNDS = 10;

/**
 * Mask an email before writing it to logs so production logs never expose
 * the full seeded administrator identity.
 */
const maskEmail = (email) => {
  const [localPart = '', domain] = String(email).split('@');
  if (!domain) return '***';
  const visible = localPart.slice(0, 1);
  return `${visible}${'*'.repeat(Math.max(localPart.length - 1, 2))}@${domain}`;
};

/**
 * Production-safe, idempotent admin bootstrap.
 *
 * - Credentials come exclusively from ADMIN_EMAIL + ADMIN_SEED_PASSWORD.
 *   No hardcoded fallback credentials exist.
 * - If no account exists for ADMIN_EMAIL, one is created with a bcryptjs hash
 *   of ADMIN_SEED_PASSWORD.
 * - If the account already exists, its stored password hash is never touched
 *   (no reset, no re-hash, no silent role change).
 * - The plaintext password is never logged, and never returned to a caller.
 *
 * @returns {Promise<'created' | 'exists' | 'skipped'>} outcome of the seed run.
 */
export const seedAdminUser = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || '';

  if (!adminEmail || !adminPassword) {
    console.warn('⚠️ Admin seed skipped: ADMIN_EMAIL and ADMIN_SEED_PASSWORD must both be configured.');
    return 'skipped';
  }

  try {
    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      // Existing account — intentionally left untouched, especially the password hash.
      if (existingUser.role === 'admin') {
        console.log(`🔐 Admin seed: existing administrator verified (${maskEmail(adminEmail)}).`);
      } else {
        console.warn(`⚠️ Admin seed skipped: ${maskEmail(adminEmail)} already exists with a non-admin role.`);
      }
      return 'exists';
    }

    // Hash only when a new administrator actually has to be provisioned.
    const hashedPassword = await bcrypt.hash(adminPassword, BCRYPT_SALT_ROUNDS);

    const adminUser = new User({
      name: 'Geet Studio Admin',
      email: adminEmail,
      phone: '8770409447',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });

    await adminUser.save();
    console.log(`🔐 Admin seed: administrator account created (${maskEmail(adminEmail)}).`);
    return 'created';
  } catch (err) {
    // Only the error message is logged — never the credentials.
    console.warn(`⚠️ Admin Seed Note: ${err.message}`);
    return 'skipped';
  }
};
