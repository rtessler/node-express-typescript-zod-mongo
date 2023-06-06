import request from 'supertest';
import app from '../../app';
import { Todos } from './todos.model';
import { client } from '../../db';

beforeAll(async () => {
  //await client.connect()
  try {
    await Todos.drop()
  }
  catch (error) {}
})

describe('GET /api/v1/todos', () => {
  it('responds with an array of todos', async () => {
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length')
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty('content')
        expect(response.body[0]).toHaveProperty('done')
      })
  });
});


describe('POST /api/v1/todos', () => {
  it('responds respond with an error if the todo is invalid', async () => {
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: ''
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('message')
      })
  });
});

