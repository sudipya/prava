import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false });
const currencies = ['INR','EUR','GBP','CAD','AUD','JPY','CHF','CNY','HKD','SGD','AED','SAR','KRW','NZD','MYR','THB','IDR','PHP','BRL','MXN'];
let cachedRates = null;

app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*' }));
app.use(express.json({ limit: '32kb' }));
app.get('/health', async (_req, res) => { try { await pool.query('select 1'); res.json({ ok: true }); } catch { res.status(503).json({ ok: false }); } });

app.get('/rates', async (_req, res) => {
  try {
    const response = await fetch(process.env.FX_API_URL || 'https://open.er-api.com/v6/latest/USD');
    if (!response.ok) throw new Error(`fx_${response.status}`);
    const json = await response.json();
    if (!json.rates) throw new Error('invalid_fx_response');
    cachedRates = { base: 'USD', fetchedAt: new Date().toISOString(), rates: Object.fromEntries(currencies.map(code => [code, json.rates[code]])) };
    res.json(cachedRates);
  } catch (error) {
    if (cachedRates) return res.json({ ...cachedRates, stale: true });
    res.status(502).json({ error: 'rates_unavailable' });
  }
});

app.get('/rates/history/:currency', async (req, res) => {
  const currency = req.params.currency.toUpperCase();
  if (!currencies.includes(currency)) return res.status(400).json({ error: 'unsupported_currency' });
  const to = new Date(); const from = new Date(to); from.setDate(to.getDate() - 30);
  const iso = value => value.toISOString().slice(0, 10);
  try {
    const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=${currency}&from=${iso(from)}&to=${iso(to)}`);
    if (!response.ok) throw new Error('history_failed');
    const rows = await response.json();
    res.json({ base: 'USD', quote: currency, points: rows.filter(row => row.rate).map(row => ({ date: row.date, value: row.rate })) });
  } catch { res.status(502).json({ error: 'history_unavailable' }); }
});

app.get('/wallets/:userId', async (req, res) => {
  const result = await pool.query('select currency, balance, created_at from wallets where user_id=$1 order by currency', [req.params.userId]);
  res.json(result.rows);
});

app.post('/payment-requests', async (req, res) => {
  const { senderUserId, recipientUid, recipientPhone, currency, amount } = req.body;
  if (!senderUserId || !currency || !Number.isFinite(Number(amount)) || Number(amount) <= 0 || (!recipientUid && !recipientPhone)) return res.status(400).json({ error: 'invalid_request' });
  const result = await pool.query('insert into payment_requests(sender_user_id,recipient_uid,recipient_phone,currency,amount) values($1,$2,$3,$4,$5) returning *', [senderUserId, recipientUid || null, recipientPhone || null, currency, amount]);
  res.status(201).json(result.rows[0]);
});

app.listen(process.env.PORT || 4000, () => console.log(`PRAVA API listening on ${process.env.PORT || 4000}`));
