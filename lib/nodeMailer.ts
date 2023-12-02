import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.EMAIL , process.env.PASS_APPS)
// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Ganti dengan email pengirim
    pass: process.env.PASS_APPS, // Ganti dengan password email pengirim
  }
});

// Fungsi untuk mengirim email
export const sendEmail = async (data : any): Promise<void> => {
  try {
    // Pengaturan email yang akan dikirim
    const mailOptions = {
      from: "'Test Send Email' <no-reply@gmail.com>", // Alamat email pengirim
      to: data.EMAIL, // Alamat email penerima
      subject: 'Test Send Email',
      text: 'Halo! Ini adalah contoh email yang dikirim menggunakan Node Mailer dan TypeScript.'
    };

    // Mengirim email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email terkirim: ', info.messageId);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengirim email:', error);
  }
};

// Panggil fungsi sendEmail untuk mengirim email
// sendEmail();
