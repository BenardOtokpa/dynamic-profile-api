/* server.js
   Simple Express app providing GET /me that returns profile + dynamic cat fact
*/

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Config from env or defaults
const PORT = process.env.PORT || 8000;
const USER_EMAIL = process.env.USER_EMAIL || 'email@example.com';
const USER_NAME = process.env.USER_NAME || 'Full Name';
const USER_STACK = process.env.USER_STACK || 'Node.js/Express';
const CAT_FACT_URL = process.env.CAT_FACT_URL;
const CAT_FACT_TIMEOUT_MS = parseInt(process.env.CAT_FACT_TIMEOUT_MS, 10); // ms
const FACT_FALLBACK = process.env.FACT_FALLBACK;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic rate limiter (recommended for public deployment)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // limit each IP to 120 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Helper to fetch cat fact with timeout and graceful fallback
async function fetchCatFact() {
  try {
    const res = await axios.get(CAT_FACT_URL, { timeout: CAT_FACT_TIMEOUT_MS });
    // expect { fact: "...", ... }
    if (res && res.status === 200 && res.data && typeof res.data.fact === 'string') {
      return res.data.fact;
    }
    // non-standard response - fallback
    return FACT_FALLBACK;
  } catch (err) {
    // Log the error and return fallback
    console.error('Cat fact fetch failed:', err.message || err.toString());
    return FACT_FALLBACK;
  }
}

// GET /me endpoint
app.get('/me', async (req, res) => {
  // Ensure we always respond with JSON
  res.setHeader('Content-Type', 'application/json');

  // Dynamic timestamp in UTC ISO 8601
  const timestamp = new Date().toISOString();

  // Fetch cat fact (not cached)
  const fact = await fetchCatFact();

  const payload = {
    status: 'success',
    user: {
      email: USER_EMAIL,
      name: USER_NAME,
      stack: USER_STACK
    },
    timestamp,
    fact
  };

  // 200 OK (Even if fact fallback, still 200 because user data served)
  return res.status(200).json(payload);
});

// Basic health route (for Hosting platforms like Railway, Heroku, etc.)
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
