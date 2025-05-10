"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${formData.email}>`,
    to: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
    subject: formData.subject,
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}
    `,
    html: `
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
