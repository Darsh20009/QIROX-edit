import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.TURBOSMTP_HOST,
  port: parseInt(process.env.TURBOSMTP_PORT || "465"),
  secure: process.env.TURBOSMTP_PORT === "465",
  auth: {
    user: process.env.TURBOSMTP_USER,
    pass: process.env.TURBOSMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NOTIFICATION_EMAIL_FROM || "qirox@qirox.online",
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
