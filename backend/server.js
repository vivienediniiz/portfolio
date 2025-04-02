const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'viviennydiniz@gmail.com',
        pass: 'tudoposso'
    }
});

app.post('/enviar-email', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;
    
    const mailOptions = {
        from: 'viviennydiniz@gmail.com',
        to: 'viviennydiniz@gmail.com',
        subject: `Nova mensagem de ${nome}`,
        text: `
            Nome: ${nome}
            Email: ${email}
            Telefone: ${telefone}
            Mensagem: ${mensagem}
        `
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Erro ao enviar email' });
        }
        res.json({ success: true, message: 'Email enviado com sucesso' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});