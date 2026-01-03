import { sendEmail } from "./lib/email";

async function testEmail() {
  const success = await sendEmail(
    "youssefdarwish20009@gmail.com",
    "رسالة تجريبية - نظام QIROX",
    "هذه رسالة تجريبية للتأكد من أن نظام الإشعارات عبر TurboSMTP يعمل بشكل صحيح بعد تحديث عنوان المرسل.",
    "<h1>رسالة تجريبية</h1><p>هذه رسالة تجريبية للتأكد من أن نظام الإشعارات عبر <strong>TurboSMTP</strong> يعمل بشكل صحيح بعد تحديث عنوان المرسل إلى qirox@qirox.online.</p>"
  );
  
  if (success) {
    console.log("Test email sent successfully to youssefdarwish20009@gmail.com");
    process.exit(0);
  } else {
    console.error("Failed to send test email");
    process.exit(1);
  }
}

testEmail();
