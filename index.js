const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'projectexpo218@gmail.com',
            pass: 'pyqbsvucecrwbajp'
        }
    });

    let mailOptions = {
        from: '"MyStore" <projectexpo218@gmail.com>',
        to: to,
        subject: "Reset Privacy Key",
        text: `Your new privacy key is ${text}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
