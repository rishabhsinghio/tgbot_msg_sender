const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path'); // Import the 'path' module

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Serve static files, including your index.html
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/send', (req, res) => {
    const message = req.body.message;

    // Send the message to your Telegram bot using axios
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = new URLSearchParams({
        chat_id: CHAT_ID,
        text: message,
    }).toString();

    axios
        .post(telegramApiUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            console.log(response.data);
            res.send('Message sent to Telegram bot!');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error sending message to Telegram bot');
        });
});

const port = process.env.PORT || 3000; // Use the PORT environment variable for Heroku deployment
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
