// Resend API Email Service Abstraction Layer
export const sendEmail = async ({ to, subject, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Geet Studio <noreply@geetstudio.in>';

  if (!apiKey || apiKey.includes('1234567890')) {
    console.log(`✉️ [EMAIL DEV MOCK] To: ${to} | Subject: ${subject}`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('❌ Resend API Error:', data);
      return { success: false, error: data };
    }

    console.log(`✉️ [EMAIL SENT via Resend] ID: ${data.id} | To: ${to}`);
    return { success: true, id: data.id };
  } catch (err) {
    console.error('❌ Resend Email Exception:', err.message);
    return { success: false, error: err.message };
  }
};

export const sendQueryNotification = async (queryData) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'geetdancestudio@gmail.com';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb;">
      <h2 style="color: #d4af37;">📩 New Studio Query — Geet Studio</h2>
      <p><strong>Name:</strong> ${queryData.name}</p>
      <p><strong>Email:</strong> ${queryData.email}</p>
      <p><strong>Phone:</strong> ${queryData.phone}</p>
      <p><strong>Category:</strong> ${queryData.category || 'General'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9fafb; padding: 12px; border-left: 4px solid #d4af37;">
        ${queryData.message}
      </blockquote>
      <p style="font-size: 12px; color: #6b7280;">Received via Geet Studio Platform • Indore, MP</p>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject: `New Query from ${queryData.name} (${queryData.category || 'General'})`, html });
};

export const sendCommunityRequestNotification = async (requestData, leadName) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'geetdancestudio@gmail.com';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb;">
      <h2 style="color: #9333ea;">🌟 Community Service Hire Request — Geet Studio</h2>
      <p><strong>Target Artist/Lead:</strong> ${leadName}</p>
      <p><strong>Requester Name:</strong> ${requestData.requesterName}</p>
      <p><strong>Requester Email:</strong> ${requestData.requesterEmail}</p>
      <p><strong>Requester Phone:</strong> ${requestData.requesterPhone}</p>
      <p><strong>Service Required:</strong> ${requestData.serviceRequired}</p>
      <p><strong>Event Type:</strong> ${requestData.eventType}</p>
      <p><strong>Event Date:</strong> ${requestData.eventDate}</p>
      <p><strong>Location:</strong> ${requestData.location}</p>
      <p><strong>Requirements / Message:</strong></p>
      <blockquote style="background: #f9fafb; padding: 12px; border-left: 4px solid #9333ea;">
        ${requestData.message || 'No additional message provided.'}
      </blockquote>
      <p style="font-size: 12px; color: #6b7280;">Geet Studio Community Lead Booking System • Indore, MP</p>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject: `Community Request for ${leadName} by ${requestData.requesterName}`, html });
};

export const sendEnrollmentConfirmationEmail = async (enrollmentData) => {
  const whatsappLink = process.env.WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/GeetStudioOfficialGroup';
  const instagramLink = process.env.INSTAGRAM_URL || 'https://www.instagram.com/the_geetstudio/';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #d4af37; margin-bottom: 8px;">🎉 Enrollment Confirmation — Geet Studio</h2>
      <p style="font-size: 16px; font-weight: bold;">Congratulations, ${enrollmentData.studentDetails?.name || 'Student'}!</p>
      <p>Your seat has been reserved and your enrollment is confirmed for <strong>${enrollmentData.itemName || 'Studio Class'}</strong>.</p>
      
      <div style="background: #18181b; color: #f4f4f5; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Enrollment ID:</strong> <span style="color: #d4af37;">${enrollmentData.enrollmentId}</span></p>
        <p style="margin: 4px 0;"><strong>Class / Workshop:</strong> ${enrollmentData.itemName}</p>
        <p style="margin: 4px 0;"><strong>Batch:</strong> ${enrollmentData.batch || 'Scheduled Batch'}</p>
        <p style="margin: 4px 0;"><strong>Timing:</strong> ${enrollmentData.time || 'Studio Hours'}</p>
        <p style="margin: 4px 0;"><strong>Location:</strong> ${enrollmentData.location || 'Geet Studio, Indore'}</p>
        <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${enrollmentData.amountPaid}</p>
      </div>

      <p style="margin-top: 16px;">
        📲 <strong>Join Official WhatsApp Group:</strong><br/>
        <a href="${whatsappLink}" style="color: #22c55e; font-weight: bold;">Click here to join student group</a>
      </p>

      <p>
        📸 <strong>Follow Geet Studio on Instagram:</strong><br/>
        <a href="${instagramLink}" style="color: #e1306c;">@the_geetstudio</a>
      </p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 12px; color: #6b7280; text-center: true;">
        Geet Studio • Indore, Madhya Pradesh, India • Phone: +91 87704 09447
      </p>
    </div>
  `;

  return sendEmail({
    to: enrollmentData.studentDetails?.email,
    subject: `Enrollment Confirmed: ${enrollmentData.itemName} (ID: ${enrollmentData.enrollmentId})`,
    html,
  });
};

export const sendRegistrationInterestEmail = async (regData) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'geetdancestudio@gmail.com';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb;">
      <h2 style="color: #d4af37;">📋 New Registration Interest — Geet Studio</h2>
      <p><strong>Name:</strong> ${regData.name}</p>
      <p><strong>Email:</strong> ${regData.email}</p>
      <p><strong>Phone:</strong> ${regData.phone}</p>
      <p><strong>Age:</strong> ${regData.age || 'Not provided'}</p>
      <p><strong>Class/Workshop ID:</strong> ${regData.classId || 'N/A'}</p>
      <p><strong>Preferred Batch:</strong> ${regData.batch || 'Not specified'}</p>
      <p style="font-size: 12px; color: #6b7280;">This person expressed interest in registering. Please contact them with details and fees.</p>
      <p style="font-size: 12px; color: #6b7280;">Received via Geet Studio Platform • Indore, MP</p>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject: `New Registration Interest from ${regData.name}`, html });
};
