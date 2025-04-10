import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
})

export const enviarEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Seu App" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html
  })
}
