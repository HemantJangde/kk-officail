import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendAdminNotification = async (contactData) => {
  const { name, email, phone, message } = contactData;

  const mailOptions = {
    from: `"Construction Site" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "📩 New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong><br>${message}</p>
      <hr>
      <p style="color:gray;">Sent automatically from your Construction Site backend</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to admin: ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw new Error("Email not sent");
  }
};

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Construction Site" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw new Error("Email not sent");
  }
};