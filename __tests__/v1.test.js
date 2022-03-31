'use strict';

const { db, items, categories } = require('../src/models');
const { server } = require('../src/server');
const supertest = require('supertest');
// const { it } = require('eslint/lib/rule-tester/rule-tester');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
  await items.create({
    name: 'lardfruit',
    calories: 1000000,
    type: 'fruit',
  });
  await categories.create({
    name: 'The Mediumest Shirt',
    color: 'Medium Gray',
    size: 'XX-M',
  });
});

afterAll(async () => {
  await db.drop();
});


describe('V1 Route Tests', () => {
  it('should reject a bad model path', async () => {
    let response = await request.get('/api/v1/bicycles');

    expect(response.statusCode).toEqual(500);
    expect(response.body.message).toEqual('Invalid Model');
  });

  it('should send a 404 error for a bad path', async () => {
    let response = await request.get('/bicycles');

    console.log(response.body);
    expect(response.statusCode).toEqual(404);
  });

  describe('GET all', () => {
    it('should get all records of the items model', async () => {
      let response = await request.get('/api/v1/items');

      expect(response.status).toEqual(200);
      expect(response.body[0].name).toEqual('lardfruit');
    });

    it('should get all records of the categories model', async () => {
      let response = await request.get('/api/v1/categories');

      expect(response.status).toEqual(200);
      expect(response.body[0].name).toEqual('The Mediumest Shirt');
    });
  });

  describe('GET one', () => {
    it('should get one record from the items model', async () => {
      let response = await request.get('/api/v1/items/1');

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('lardfruit');
    });

    it('should get one record from the categories model', async () => {
      let response = await request.get('/api/v1/categories/1');

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('The Mediumest Shirt');
    });
  });

  describe('POST one', () => {
    it('should post one record to the items model', async () => {
      let response = await request.post('/api/v1/items').send({
        name: 'tofudabeast',
        calories: 100,
        type: 'protein',
      });

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual('tofudabeast');
    });

    it('should post one record to the categories model', async () => {
      let response = await request.post('/api/v1/categories').send({
        name: 'one left shoe',
        color: 'plaid',
        size: '5',
      });

      expect(response.status).toEqual(201);
      expect(response.body.name).toEqual('one left shoe');
    });
  });

  describe('PUT one', () => {
    it('should update one record of the items model', async () => {
      let response = await request.put('/api/v1/items/1').send({
        name: 'tofuda-beast',
        calories: 1000,
        type: 'protein',
      });

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('tofuda-beast');
    });

    it('should update one record of the categories model', async () => {
      let response = await request.put('/api/v1/categories/1').send({
        name: 'one right shoe',
        color: 'plaid',
        size: '5.5',
      });

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('one right shoe');
    });
  });

  describe('DELETE one', () => {
    it('should delete one record from the items model', async () => {
      let response = await request.delete('/api/v1/items/1');
      console.log(response.body);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(1);
    });

    it('should delete one record from the categories model', async () => {
      let response = await request.delete('/api/v1/categories/1');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(1);
    });
  });
});
