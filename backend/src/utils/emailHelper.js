import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Puedes usar otro servicio como SMTP, Mailgun, SendGrid, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Función para enviar correos
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
    }
};
