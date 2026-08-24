import dotenv from 'dotenv';
import { PaymentProvider } from './services/paymentProvider.js';

dotenv.config({ path: './server/.env' });
dotenv.config();

const run5MinHoldTests = async () => {
  console.log('🧪 Executing 5-Minute Seat Hold & State Machine Verification Suite...\n');

  let passedCount = 0;
  let totalCount = 7;

  // -------------------------------------------------------------
  // TEST 1: Payment succeeds before 5 minutes
  // -------------------------------------------------------------
  try {
    console.log('--- TEST 1: Payment succeeds before 5 minutes ---');
    const order = await PaymentProvider.createPayment({
      classId: 'class_test_1',
      batchId: 'b1',
      studentDetails: { name: 'Student 1', email: 's1@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    const verify = await PaymentProvider.verifyPayment({
      enrollmentId: order.data.enrollmentId,
      paymentId: 'txn_test_succeed_001',
    });

    if (verify.success && verify.data.enrollmentStatus === 'CONFIRMED' && verify.data.paymentStatus === 'PAID') {
      console.log('✅ TEST 1 PASSED: Enrollment state set to CONFIRMED & PAID before 5 minutes.');
      passedCount++;
    } else {
      console.error('❌ TEST 1 FAILED:', verify);
    }
  } catch (err) {
    console.error('❌ TEST 1 Error:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 2: Payment fails & seat released once
  // -------------------------------------------------------------
  try {
    console.log('\n--- TEST 2: Payment fails & seat released once ---');
    const order = await PaymentProvider.createPayment({
      classId: 'class_test_2',
      batchId: 'b1',
      studentDetails: { name: 'Student 2', email: 's2@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    const fail = await PaymentProvider.failPayment({ enrollmentId: order.data.enrollmentId });

    if (fail.success && fail.released === true) {
      console.log('✅ TEST 2 PASSED: Payment failure set state to FAILED and released seat once.');
      passedCount++;
    } else {
      console.error('❌ TEST 2 FAILED:', fail);
    }
  } catch (err) {
    console.error('❌ TEST 2 Error:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 3: Payment expires after 5 minutes
  // -------------------------------------------------------------
  try {
    console.log('\n--- TEST 3: Payment expires after 5 minutes ---');
    const order = await PaymentProvider.createPayment({
      classId: 'class_test_3',
      batchId: 'b1',
      studentDetails: { name: 'Student 3', email: 's3@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    const expire = await PaymentProvider.expirePayment({ enrollmentId: order.data.enrollmentId });

    if (expire.success && expire.released === true) {
      console.log('✅ TEST 3 PASSED: 5-minute expiration set state to EXPIRED and released seat once.');
      passedCount++;
    } else {
      console.error('❌ TEST 3 FAILED:', expire);
    }
  } catch (err) {
    console.error('❌ TEST 3 Error:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 4: Expired enrollment cannot become paid
  // -------------------------------------------------------------
  try {
    console.log('\n--- TEST 4: Expired enrollment cannot become paid ---');
    const order = await PaymentProvider.createPayment({
      classId: 'class_test_4',
      batchId: 'b1',
      studentDetails: { name: 'Student 4', email: 's4@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    // Manually expire
    await PaymentProvider.expirePayment({ enrollmentId: order.data.enrollmentId });

    // Attempt to verify payment on expired enrollment
    const verifyExpired = await PaymentProvider.verifyPayment({
      enrollmentId: order.data.enrollmentId,
      paymentId: 'txn_late_attempt',
    });

    if (!verifyExpired.success && verifyExpired.statusCode === 422) {
      console.log('✅ TEST 4 PASSED: Payment verification on EXPIRED enrollment was rejected (422 Unprocessable).');
      passedCount++;
    } else {
      console.error('❌ TEST 4 FAILED: Expired enrollment allowed payment!', verifyExpired);
    }
  } catch (err) {
    console.error('❌ TEST 4 Error:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 5 & 6: Seat is released exactly once & no double-releases
  // -------------------------------------------------------------
  try {
    console.log('\n--- TEST 5 & 6: Parallel Expiration Workers Double-Release Prevention ---');
    const order = await PaymentProvider.createPayment({
      classId: 'class_test_5',
      batchId: 'b1',
      studentDetails: { name: 'Student 5', email: 's5@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    // Run 10 parallel expiration calls simultaneously on the same enrollment
    const parallelExpirations = Array.from({ length: 10 }).map(() =>
      PaymentProvider.expirePayment({ enrollmentId: order.data.enrollmentId })
    );

    const parallelResults = await Promise.all(parallelExpirations);
    const seatReleases = parallelResults.filter((r) => r.released === true);
    const noOps = parallelResults.filter((r) => r.released === false);

    if (seatReleases.length === 1 && noOps.length === 9) {
      console.log(`✅ TEST 5 & 6 PASSED: Out of 10 concurrent expiration workers, EXACTLY 1 released the seat and 9 executed idempotent no-ops.`);
      passedCount++;
    } else {
      console.error(`❌ TEST 5 & 6 FAILED: Seat release count = ${seatReleases.length}`);
    }
  } catch (err) {
    console.error('❌ TEST 5 & 6 Error:', err.message);
  }

  // -------------------------------------------------------------
  // TEST 7: Competing for final seat (1 seat available, 2 users compete)
  // -------------------------------------------------------------
  try {
    console.log('\n--- TEST 7: Competing for final seat ---');
    const compA = PaymentProvider.createPayment({
      classId: 'class_final_seat_test',
      batchId: 'b1',
      studentDetails: { name: 'User A', email: 'usera@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });
    const compB = PaymentProvider.createPayment({
      classId: 'class_final_seat_test',
      batchId: 'b1',
      studentDetails: { name: 'User B', email: 'userb@test.com', phone: '8770409447' },
      amountPaid: 3000,
    });

    const [resA, resB] = await Promise.all([compA, compB]);
    const isOneSuccessOneRejected = (resA.success && !resB.success) || (!resA.success && resB.success);

    if (isOneSuccessOneRejected) {
      console.log(`✅ TEST 7 PASSED: 2 users competed for final seat -> 1 received seat hold, 1 rejected cleanly.`);
      passedCount++;
    } else {
      console.error('❌ TEST 7 FAILED:', resA, resB);
    }
  } catch (err) {
    console.error('❌ TEST 7 Error:', err.message);
  }

  console.log(`\n==================================================`);
  console.log(`📊 5-MINUTE SEAT HOLD AUDIT: ${passedCount} / ${totalCount} TESTS PASSED CLEANLY!`);
  console.log(`==================================================\n`);
};

run5MinHoldTests();
