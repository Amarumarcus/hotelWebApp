import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://reliz-hotel.ru'
}));

const transporter = nodemailer.createTransport({
    host: 'smtp.timeweb.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER || 'info@reliz-hotel.ru', // почта
        pass: process.env.SMTP_PASS || 'kE9>3xn6NdfrNe'           // пароль от почты
    }
});

app.post('/api/send', (req, res) => {
    const { name, phone, email, booking } = req.body;
    
    const mailOptions = {
        from: process.env.SMTP_USER || 'info@reliz-hotel.ru',
        to: process.env.RECEIVER_EMAIL || 'info@reliz-hotel.ru', // Куда придет уведомление
        subject: `Гостиница Релиз: Новая заявка от ${name}`,
        text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nПожелания: ${booking || 'Не указано'}`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Ошибка отправки:', error);
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Письмо отправлено' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend started on port ${PORT}`));
