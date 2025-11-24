// testResend.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const response = await resend.emails.send({
      from: 'Your Name <you@yourdomain.com>',  // Must be verified in Resend
      to: 'recipient@example.com',             // Recipient email
      subject: 'Test Email from Resend',
      html: `
        <h1>Hello!</h1>
        <p>This is a test email sent via Resend API.</p>
      `,
    });

    console.log('Email sent successfully!');
    console.log(response); // Logs email ID and status
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Run the test
sendTestEmail();
