import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const seedAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'geetdancestudio@gmail.com';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'password123';

  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      name: 'Geet Studio Admin',
      email: adminEmail.toLowerCase(),
      phone: '8770409447',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });

    await adminUser.save();
    console.log(`🔐 Admin Seed User initialized successfully (${adminEmail})`);
  } catch (err) {
    console.warn(`⚠️ Admin Seed Note: ${err.message}`);
  }
};
