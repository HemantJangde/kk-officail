import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const testEmail = async () => {
  try {
    await transporter.sendMail({
      from: `"Construction Site" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email from Construction Backend",
      text: "This is a test email to confirm SMTP setup works.",
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Test email error:", error);
  }
};

testEmail();
