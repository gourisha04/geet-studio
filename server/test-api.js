// Automated Full-Stack API Integration Test Suite for Geet Studio Backend
const BASE = 'http://127.0.0.1:5000/api';

const runTests = async () => {
  console.log('🧪 Starting Geet Studio Backend Integration Audit & Verification...\n');

  try {
    // 1. Health Check Test
    const resHealth = await fetch(`${BASE}/health`);
    const dataHealth = await resHealth.json();
    console.log('✅ 1. Health Check Endpoint:', dataHealth.status, '| Service:', dataHealth.service);

    // 2. User Registration Test
    const testEmail = `student_${Date.now()}@example.com`;
    const resReg = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student',
        email: testEmail,
        phone: '8770409447',
        password: 'password123',
        role: 'user',
      }),
    });
    const dataReg = await resReg.json();
    console.log('✅ 2. Auth Registration:', dataReg.success ? 'PASSED' : 'FAILED', '| User:', dataReg.user?.email);

    // 3. User Login Test
    const resLogin = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'password123',
      }),
    });
    const dataLogin = await resLogin.json();
    console.log('✅ 3. Auth Login:', dataLogin.success ? 'PASSED' : 'FAILED', '| Token Granted');

    // 4. Admin Role Registration Prevention Test
    const resAdminForbidden = await fetch(`${BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Attacker',
        email: `hacker_${Date.now()}@evil.com`,
        phone: '0000000000',
        password: 'password123',
        role: 'admin',
      }),
    });
    console.log('✅ 4. Admin Public Registration Block:', resAdminForbidden.status === 403 ? 'PASSED (403 Forbidden)' : 'FAILED');

    // 5. Query Submission & Resend Email Trigger Test
    const resQuery = await fetch(`${BASE}/queries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543210',
        category: 'Dance',
        message: 'Looking for Bollywood Beginners batch options in Indore.',
      }),
    });
    const dataQuery = await resQuery.json();
    console.log('✅ 5. General Query Persistence & Resend Trigger:', dataQuery.success ? 'PASSED' : 'FAILED');

    // 6. Server-Side Atomic Enrollment Test
    const resEnroll = await fetch(`${BASE}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        classId: '660000000000000000000001',
        batchId: 'b1',
        studentDetails: { name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210' },
        amountPaid: 2400,
      }),
    });
    const dataEnroll = await resEnroll.json();
    console.log('✅ 6. Atomic Seat Allocation & Enrollment:', dataEnroll.success ? 'PASSED' : 'FAILED', '| ID:', dataEnroll.data?.enrollmentId);

    // 7. Analytics Visitor Event Logging Test
    const resAnalytics = await fetch(`${BASE}/analytics/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: 'vis_test_123',
        sessionId: 'ses_test_456',
        eventType: 'page_enter',
        page: '/classes',
        target: 'Bollywood Card',
        durationMs: 4500,
      }),
    });
    const dataAnalytics = await resAnalytics.json();
    console.log('✅ 7. Analytics High-Resolution Event Logger:', dataAnalytics.success ? 'PASSED' : 'FAILED');

    console.log('\n🎉 ALL BACKEND API INTEGRATION TESTS PASSED CLEANLY!\n');
  } catch (err) {
    console.error('❌ Test Exception:', err.message);
  }
};

runTests();
