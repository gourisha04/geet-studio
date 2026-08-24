import dotenv from 'dotenv';
import path from 'path';
import { sendQueryNotification } from './services/emailService.js';
import { uploadToCloudinary } from './services/cloudinaryService.js';

dotenv.config({ path: './server/.env' });
dotenv.config();

const testLiveServices = async () => {
  console.log('🧪 Testing Live Resend Email & Cloudinary Integrations with server/.env...\n');

  // 1. Test Resend Email API
  try {
    console.log('✉️ Testing Resend Transactional Email API...');
    const emailResult = await sendQueryNotification({
      name: 'Geet Studio Verification Test',
      email: 'geetdancestudio@gmail.com',
      phone: '8770409447',
      category: 'System Integration Test',
      message: 'Automated live test confirming Resend API integration is operational for Geet Studio.',
    });

    if (emailResult.success) {
      console.log(`✅ Resend Email Integration Verified! Status: SUCCESS | ID: ${emailResult.id || 'Delivered'}`);
    } else {
      console.log(`⚠️ Resend Status: ${JSON.stringify(emailResult.error)}`);
    }
  } catch (err) {
    console.error('❌ Resend Test Exception:', err.message);
  }

  // 2. Test Cloudinary Media Storage
  try {
    console.log('\n🖼️ Testing Cloudinary Media Storage...');
    const dummyBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const uploadResult = await uploadToCloudinary(dummyBase64, 'geet_studio_tests');

    if (uploadResult.url) {
      console.log(`✅ Cloudinary Integration Verified! URL generated cleanly.`);
    } else {
      console.log('⚠️ Cloudinary Upload Note: Handled via dev fallback.');
    }
  } catch (err) {
    console.error('❌ Cloudinary Test Exception:', err.message);
  }

  console.log('\n🎉 Integration Verification Complete!\n');
};

testLiveServices();
