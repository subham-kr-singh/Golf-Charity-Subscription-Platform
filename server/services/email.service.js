const transporter = require('../config/email');

const sendEmail = async (options) => {
  try {
    options.from = process.env.EMAIL_FROM;
    await transporter.sendMail(options);
    return { data: true, error: null };
  } catch (error) {
    console.error('Email send error:', error);
    return { data: null, error };
  }
};

const sendWelcomeEmail = async (to, full_name) => {
  return sendEmail({
    to,
    subject: "Welcome to Golf Platform — you're in!",
    html: `
      <h2>Welcome ${full_name}!</h2>
      <p>Thank you for joining. Our platform supports great charities while giving you a chance to win cash prizes.</p>
      <p><a href="${process.env.CLIENT_URL}/dashboard">Go to your Dashboard</a> to enter your scores!</p>
    `
  });
};

const sendSubscriptionConfirmedEmail = async (to, full_name, plan, period_end) => {
  return sendEmail({
    to,
    subject: "Subscription confirmed — you're ready to play",
    html: `
      <h2>Hi ${full_name},</h2>
      <p>Your ${plan} subscription is confirmed. You are ready to play and your next renewal date is ${new Date(period_end).toDateString()}.</p>
      <p><a href="${process.env.CLIENT_URL}/scores">Enter your golf scores now</a></p>
    `
  });
};

const sendPaymentFailedEmail = async (to, full_name, retry_url) => {
  return sendEmail({
    to,
    subject: "Payment failed — action required",
    html: `
      <h2>Hi ${full_name},</h2>
      <p>We couldn't process your last payment. Don't worry, you can easily update your payment method.</p>
      <p><a href="${retry_url}">Update your payment method via Stripe Portal</a></p>
    `
  });
};

const sendDrawResultsEmail = async (to, full_name, draw_date, winning_numbers, is_winner, match_type) => {
  const winnerMessage = is_winner 
    ? `<h3>Congratulations! You matched ${match_type} numbers!</h3>` 
    : `<p>Unfortunately, you didn't win this time, but better luck next month!</p>`;

  return sendEmail({
    to,
    subject: `Draw results are in — ${new Date(draw_date).toLocaleString('default', { month: 'long', year: 'numeric' })}`,
    html: `
      <h2>The results are here!</h2>
      <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">
        Winning Numbers: ${winning_numbers.join(', ')}
      </div>
      ${winnerMessage}
      <p><a href="${process.env.CLIENT_URL}/draws">View full results</a></p>
    `
  });
};

const sendWinnerNotificationEmail = async (to, full_name, prize_amount, match_type, verify_instructions_url) => {
  return sendEmail({
    to,
    subject: `You won £${prize_amount}! — verify your win`,
    html: `
      <h2>Incredible news, ${full_name}!</h2>
      <p>You matched ${match_type} numbers and won £${prize_amount}!</p>
      <p>Please follow the verification instructions by uploading your proof of score before the deadline.</p>
      <p><a href="${verify_instructions_url}">Verify your win here</a></p>
    `
  });
};

const sendVerificationOutcomeEmail = async (to, full_name, status, prize_amount, admin_notes) => {
  const isApproved = status === 'approved';
  return sendEmail({
    to,
    subject: isApproved ? "Win verified — payment incoming!" : "Verification update",
    html: `
      <h2>Verification Update</h2>
      <p>Hi ${full_name},</p>
      <p>Your win verification status is now: <strong>${status}</strong>.</p>
      ${isApproved 
        ? `<p>Congratulations! Your prize of £${prize_amount} will be processed shortly. We'll email you once it's paid.</p>` 
        : `<p>Notes: ${admin_notes}</p><p>Please contact support if you have any questions.</p>`
      }
    `
  });
};

const sendPaymentConfirmationEmail = async (to, full_name, prize_amount, draw_date) => {
  return sendEmail({
    to,
    subject: `Your prize payment has been sent — £${prize_amount}`,
    html: `
      <h2>Payment Sent!</h2>
      <p>Hi ${full_name},</p>
      <p>We've successfully processed your prize of £${prize_amount} for the draw on ${new Date(draw_date).toDateString()}.</p>
      <p>Thank you for playing and supporting our charities!</p>
    `
  });
};

module.exports = {
  sendWelcomeEmail,
  sendSubscriptionConfirmedEmail,
  sendPaymentFailedEmail,
  sendDrawResultsEmail,
  sendWinnerNotificationEmail,
  sendVerificationOutcomeEmail,
  sendPaymentConfirmationEmail
};
