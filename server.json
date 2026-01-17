const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ⚠️ Replace with your own VAPID keys
const publicVapidKey = '<YOUR_PUBLIC_KEY>';
const privateVapidKey = '<YOUR_PRIVATE_KEY>';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  publicVapidKey,
  privateVapidKey
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/notify', (req, res) => {
  const { message, delay } = req.body;
  subscriptions.forEach(sub => {
    setTimeout(() => {
      webpush.sendNotification(sub, JSON.stringify({
        title: "Reminder",
        body: message,
        icon: '/icon.png'
      })).catch(err => console.error(err));
    }, delay * 60 * 1000);
  });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
