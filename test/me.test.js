const request = require('supertest');
const axios = require('axios');
const app = require('../server');

jest.mock('axios');

describe('GET /me', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns 200 and proper JSON structure with a cat fact', async () => {
    // mock axios response
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: { fact: 'Cats purr at a frequency of 25-150 Hertz.' }
    });

    const res = await request(app).get('/me');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);

    const body = res.body;
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('email');
    expect(body.user).toHaveProperty('name');
    expect(body.user).toHaveProperty('stack', 'Node.js/Express'); // default in env.example
    expect(body).toHaveProperty('timestamp');
    // timestamp is ISO like
    expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
    expect(body).toHaveProperty('fact');
    expect(typeof body.fact).toBe('string');
    expect(body.fact).toContain('Cats purr'); // from mock
  });

  test('returns fallback fact when external API fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('network error'));

    const res = await request(app).get('/me');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(typeof res.body.fact).toBe('string');
    // by default fallback is the value in server.js constant; ensure it's returned
    expect(res.body.fact).toBe('Could not fetch a cat fact at this time.');
  });
});
