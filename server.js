const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'sripundrik-planet-c', timestamp: new Date().toISOString() });
});

// API: Contact Us form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message, type } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields (Name, Email, Message).' });
  }

  console.log(`[Contact Message Received] From: ${name} <${email}> | Phone: ${phone || 'N/A'} | Subject: ${subject || 'N/A'} | Type: ${type || 'General'}`);
  return res.status(200).json({
    success: true,
    message: 'Radhe Radhe! Your message has been received. Our ashram seva team will contact you shortly.',
    referenceId: 'REQ-' + Math.floor(100000 + Math.random() * 900000)
  });
});

// API: Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  console.log(`[Newsletter Subscription] Email: ${email}`);
  return res.status(200).json({
    success: true,
    message: 'Thank you for subscribing! You will receive daily satsang & upcoming katha updates.'
  });
});

// API: Katha RSVP / Event booking
app.post('/api/rsvp', (req, res) => {
  const { name, email, phone, eventTitle, seats } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and WhatsApp/Phone number are required.' });
  }

  const passId = 'SPG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log(`[Event RSVP] ${name} booked ${seats || 1} seat(s) for ${eventTitle || 'Katha'} | Pass: ${passId}`);
  return res.status(200).json({
    success: true,
    message: `Your booking for "${eventTitle || 'Katha'}" is confirmed!`,
    passId: passId
  });
});

// API: Seva / Donation pledge
app.post('/api/donation', (req, res) => {
  const { name, email, phone, sevaCategory, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ success: false, message: 'Name and donation amount are required.' });
  }

  const receiptNo = 'DON-' + Date.now().toString().slice(-6);
  return res.status(200).json({
    success: true,
    message: 'Pranam! Your seva contribution pledge has been recorded.',
    receiptNo: receiptNo,
    upiId: 'sripundrik@sbi'
  });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  Shri Pundrik Goswami Ji Portal (Planet C)    `);
  console.log(`  Server running on port: ${PORT}              `);
  console.log(`  Visit: http://localhost:${PORT}             `);
  console.log(`===============================================`);
});
