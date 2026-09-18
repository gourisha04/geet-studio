/**
 * One-time, operator-run administrator password rotation.
 *
 * Usage (run from the `server/` directory):
 *   ADMIN_EMAIL=<email> ADMIN_SEED_PASSWORD=<new password> npm run admin:set-password
 *
 * Guarantees:
 *  - The new password is read from the ADMIN_SEED_PASSWORD environment variable ONLY. CLI
 *    arguments are never parsed, so a password can never leak into shell history or `ps` output.
 *  - The password and its hash are never logged, printed or returned. Any accidental echo of the
 *    value inside a dependency error message is redacted before logging.
 *  - Refuses to create a user: if the account does not exist, the script stops and makes no changes.
 *  - Refuses when the target account is not an administrator.
 *  - Writes exactly one field: `password` (hashed with bcryptjs, cost 10, matching register/login).
 *    `_id`, `email`, `role`, `isVerified`, `createdAt` and every other field are left untouched.
 *  - Never invoked by an HTTP route and never executed at server startup — explicit human action only.
 */
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

// Cost factor must match the existing authentication layer (register / login).
const BCRYPT_SALT_ROUNDS = 10;
// Guards against accidentally setting an unusable credential.
const MIN_PASSWORD_LENGTH = 8;

/** Mask an email so logs never expose the full administrator identity. */
const maskEmail = (email) => {
  const [localPart = '', domain] = String(email || '').split('@');
  if (!domain) return '***';
  return `${localPart.slice(0, 1)}${'*'.repeat(Math.max(localPart.length - 1, 2))}@${domain}`;
};

/** Defensive redaction: ensures a secret can never be written to a log even if echoed by a dependency. */
const redact = (text, secret) => {
  const value = String(text || '');
  if (!secret) return value;
  return value.split(String(secret)).join('[redacted]');
};

/**
 * Core rotation logic (exported for testing; performs no I/O of its own beyond the given model).
 * @returns {Promise<{ok: boolean, reason?: string, maskedEmail?: string}>}
 */
export const setAdminPassword = async ({ email, newPassword, userModel = User }) => {
  const cleanEmail = String(email || '').trim().toLowerCase();

  if (!cleanEmail || !newPassword) {
    return { ok: false, reason: 'missing-credentials' };
  }

  if (String(newPassword).length < MIN_PASSWORD_LENGTH) {
    return { ok: false, reason: 'password-too-short' };
  }

  const existingUser = await userModel.findOne({ email: cleanEmail });

  // Never provision accounts here — an existing administrator must already exist.
  if (!existingUser) {
    return { ok: false, reason: 'account-not-found', maskedEmail: maskEmail(cleanEmail) };
  }

  // Only administrators may be rotated by this script.
  if (existingUser.role !== 'admin') {
    return { ok: false, reason: 'not-an-admin', maskedEmail: maskEmail(cleanEmail) };
  }

  const hashedPassword = await bcrypt.hash(String(newPassword), BCRYPT_SALT_ROUNDS);

  const result = await userModel.updateOne(
    { _id: existingUser._id, role: 'admin' },
    { $set: { password: hashedPassword } },
    { timestamps: false } // write only the password field; no audit/other fields updated
  );

  const matched = Number(result?.matchedCount ?? result?.n ?? 0);
  if (!result || matched === 0) {
    return { ok: false, reason: 'update-failed', maskedEmail: maskEmail(cleanEmail) };
  }

  return { ok: true, maskedEmail: maskEmail(cleanEmail) };
};

const main = async () => {
  // Load server/.env when run from the repository root or from server/. Real environment
  // variables always win, which is what production hosts (Render) provide.
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });

  const email = process.env.ADMIN_EMAIL;
  const newPassword = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !newPassword) {
    console.error('✗ Refused: ADMIN_EMAIL and ADMIN_SEED_PASSWORD must both be set in the environment. No changes were made.');
    process.exitCode = 1;
    return;
  }

  let connected = false;
  try {
    connected = await connectDB();
  } catch (err) {
    console.error(`✗ Refused: database connection error (${redact(err.message, newPassword)}). No changes were made.`);
    process.exitCode = 1;
    return;
  }

  if (!connected) {
    console.error('✗ Refused: could not connect to MongoDB. No changes were made.');
    process.exitCode = 1;
    return;
  }

  try {
    const outcome = await setAdminPassword({ email, newPassword });

    if (outcome.ok) {
      console.log(`✓ Administrator password updated for ${outcome.maskedEmail}.`);
    } else {
      console.error(`✗ Refused (${outcome.reason})${outcome.maskedEmail ? ` for ${outcome.maskedEmail}` : ''}. No changes were made.`);
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(`✗ Failed: ${redact(err.message, newPassword)}. No changes were made.`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
};

// Execute only when invoked directly (never on import, never during server startup).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}