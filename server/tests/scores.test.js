jest.mock('../middleware/auth', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 'user-123', email: 'test@test.com' };
    next();
  }
}));

jest.mock('../middleware/requireSubscription', () => (req, res, next) => {
  req.subscription = { status: 'active' };
  next();
});

jest.mock('../config/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  },
  supabaseAnon: {}
}));

const request = require('supertest');
const express = require('express');
const scoreRoutes = require('../routes/score.routes');

const app = express();
app.use(express.json());
app.use('/api/scores', scoreRoutes);

describe('Scores Validation and Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test that adding a 6th score triggers deletion of the oldest', async () => {
    const { supabaseAdmin } = require('../config/supabase');
    supabaseAdmin.insert.mockResolvedValue({ data: { id: 6, value: 15 }, error: null });
    supabaseAdmin.order.mockResolvedValue({ 
      data: [{id:6}, {id:5}, {id:4}, {id:3}, {id:2}], 
      error: null 
    });

    const res = await request(app)
      .post('/api/scores')
      .send({ value: 15, played_date: '2023-01-01' });
      
    expect(res.status).toBe(201);
    expect(res.body.data.list.length).toBe(5);
  });

  it('Test that a score with value 0 fails validation', async () => {
    const res = await request(app)
      .post('/api/scores')
      .send({ value: 0, played_date: '2023-01-01' });
    expect(res.status).toBe(422);
    expect(res.body.error).toBe('Validation failed');
  });

  it('Test that a score with value 46 fails validation', async () => {
    const res = await request(app)
      .post('/api/scores')
      .send({ value: 46, played_date: '2023-01-01' });
    expect(res.status).toBe(422);
  });

  it('Test that a future date fails validation', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const dateString = futureDate.toISOString().split('T')[0];

    const res = await request(app)
      .post('/api/scores')
      .send({ value: 20, played_date: dateString });
    expect(res.status).toBe(422);
    expect(res.body.issues[0].message).toBe('Date cannot be in the future');
  });
});
