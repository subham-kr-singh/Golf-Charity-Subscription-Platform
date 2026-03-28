require('dotenv').config();
console.log('ENV CHECK: PORT=', process.env.PORT);
console.log('ENV CHECK: SUPABASE_URL=', process.env.SUPABASE_URL);
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const scoreRoutes = require('./routes/score.routes');
const drawRoutes = require('./routes/draw.routes');
const charityRoutes = require('./routes/charity.routes');
const winnerRoutes = require('./routes/winner.routes');
const webhookRoutes = require('./routes/webhook.routes');

// Admin route imports
const adminUserRoutes = require('./routes/admin/admin.user.routes');
const adminDrawRoutes = require('./routes/admin/admin.draw.routes');
const adminCharityRoutes = require('./routes/admin/admin.charity.routes');
const adminWinnerRoutes = require('./routes/admin/admin.winner.routes');
const adminReportRoutes = require('./routes/admin/admin.report.routes');

const app = express();

const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*';

app.use(cors({
  origin: allowedOrigins
}));

// Webhook route needs raw body for Stripe signature verification
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }), webhookRoutes);

// All other routes get JSON parsing
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/draws', drawRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/winners', winnerRoutes);

// Mount Admin routes
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/draws', adminDrawRoutes);
app.use('/api/admin/charities', adminCharityRoutes);
app.use('/api/admin/winners', adminWinnerRoutes);
app.use('/api/admin/reports', adminReportRoutes);

// Global Error Handler must be the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
