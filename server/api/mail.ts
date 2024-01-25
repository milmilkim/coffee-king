import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Nodemailer 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cottapanna75@gmail.com',
      pass: process.env.GOOGLE_MAIL_AUTH,
    },
  });

  // 메일 옵션
  const mailOptions = {
    from: 'cottapanna75@gmail.com',
    to: body.to,
    subject: '자격 증명을 위한 비밀번호',
    text: body.text,
  };

  // 메일 전송
  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      status: 'success',
      message: 'Email sent',
      info: info,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Email failed to send',
    });
  }
});
