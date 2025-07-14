import request from 'supertest';
import app from '../server.js'; // Make sure your server exports the `app`

describe('Grades API Integration Tests', () => {
  it('should create a new grade', async () => {
    const res = await request(app)
      .post('/api/grades')
      .send({ name: 'Grade 6B' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Grade 6B');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app)
      .post('/api/grades')
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toBe('Invalid value');
  });
});
