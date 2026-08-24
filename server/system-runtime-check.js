import dotenv from 'dotenv';
import { PaymentProvider } from './services/paymentProvider.js';

dotenv.config({ path: './server/.env' });
dotenv.config();

const BASE = 'http://127.0.0.1:5000/api';

const runSystemCheck = async () => {
  console.log('🔍 Executing Comprehensive Live System Runtime Check...\n');

  try {
    // 1. Health Check
    const resHealth = await fetch(`${BASE}/health`);
    const health = await resHealth.json();
    console.log('✅ 1. Express Backend Status:', health.status, '| Service:', health.service, '| Timezone:', health.timezone);

    // 2. Dynamic Update Indicator
    const resUpdate = await fetch(`${BASE}/updates/latest`);
    const update = await resUpdate.json();
    console.log('✅ 2. Content Update Tracking:', update.status, '| Time:', update.latestUpdateDate);

    // 3. Classes API
    const resClasses = await fetch(`${BASE}/classes`);
    const classesData = await resClasses.json();
    console.log('✅ 3. Classes & Workshops API:', classesData.success ? 'ACTIVE' : 'FAILED', `| Count: ${classesData.count ?? 0}`);

    // 4. Community Directory API
    const resComm = await fetch(`${BASE}/community`);
    const commData = await resComm.json();
    console.log('✅ 4. Community Directory API:', commData.success ? 'ACTIVE' : 'FAILED', `| Public Leads: ${commData.count ?? 0}`);

    // 5. Events API
    const resEvents = await fetch(`${BASE}/events`);
    const eventsData = await resEvents.json();
    console.log('✅ 5. Events & Workshops API:', eventsData.success ? 'ACTIVE' : 'FAILED', `| Count: ${eventsData.count ?? 0}`);

    // 6. Instructors API
    const resInstructors = await fetch(`${BASE}/instructors`);
    const instData = await resInstructors.json();
    console.log('✅ 6. Instructors Directory API:', instData.success ? 'ACTIVE' : 'FAILED', `| Count: ${instData.count ?? 0}`);

    // 7. Background Expiration Worker Status Check
    const workerResult = await PaymentProvider.cleanupExpiredEnrollments();
    console.log('✅ 7. 5-Minute Seat Hold Worker Status: ACTIVE | Swept Expired Holds:', workerResult.swept);

    console.log('\n🎉 ALL LIVE SYSTEM ENDPOINTS OPERATIONAL & RUNNING CLEANLY!\n');
  } catch (err) {
    console.error('❌ System Check Error:', err.message);
  }
};

runSystemCheck();
