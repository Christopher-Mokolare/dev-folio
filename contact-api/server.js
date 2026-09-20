const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 10000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://christopher-mokolare.github.io';
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE;
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;

app.disable('x-powered-by');
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '12kb' }));

const submissions = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}

function getClientKey(req) {
  return req.ip || req.headers['x-forwarded-for'] || 'unknown';
}

function rateLimited(key) {
  const now = Date.now();
  const recent = (submissions.get(key) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissions.set(key, recent);
    return true;
  }
  recent.push(now);
  submissions.set(key, recent);
  return false;
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contact', async (req, res) => {
  if (rateLimited(getClientKey(req))) {
    return res.status(429).json({ message: 'Too many submissions. Please try again later.' });
  }

  const name = clean(req.body?.name, 100);
  const email = clean(req.body?.email, 254);
  const subject = clean(req.body?.subject, 160);
  const message = clean(req.body?.message, 3000);

  if (!name || name.length < 2 || !isValidEmail(email) || !subject || subject.length < 3 || message.length < 10) {
    return res.status(400).json({ message: 'Please provide a valid name, email, subject and message.' });
  }

  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
    console.error('CallMeBot environment variables are not configured.');
    return res.status(503).json({ message: 'Contact service is not configured.' });
  }

  const whatsappText = [
    '🔔 NEW PORTFOLIO ENQUIRY',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message
  ].join('\\n');

  try {
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone', CALLMEBOT_PHONE);
    url.searchParams.set('text', whatsappText);
    url.searchParams.set('apikey', CALLMEBOT_APIKEY);

    const response = await fetch(url);
    const body = await response.text();

    if (!response.ok) {
      console.error('CallMeBot HTTP error:', response.status, body);
      return res.status(502).json({ message: 'WhatsApp notification failed.' });
    }

    console.log(`Portfolio enquiry received from ${email}. CallMeBot response: ${body}`);
    return res.status(200).json({ message: 'Enquiry sent successfully.' });
  } catch (error) {
    console.error('CallMeBot request failed:', error);
    return res.status(502).json({ message: 'WhatsApp notification failed.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CM-Portal contact API listening on port ${PORT}`);
});
