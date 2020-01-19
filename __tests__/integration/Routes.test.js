import request from 'supertest';
import fs from 'fs';
import app from '../../src/app';

/* global describe, it, expect */

fs.writeFileSync(
  './__tests__/input-file.txt',
  fs.readFileSync('./__tests__/input-file.bkp')
);
app.loadPathsFile('./__tests__/input-file.txt');

describe('Add New Routes', () => {
  it('should add a new route - GRU-ATL.', async () => {
    const response = await request(app.server)
      .post('/v1/routes')
      .send({
        start: 'GRU',
        end: 'ATL',
        price: 50,
      });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(50);
  });

  it('should add a new route - ATL-DFW.', async () => {
    const response = await request(app.server)
      .post('/v1/routes')
      .send({
        start: 'ATL',
        end: 'DFW',
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(10);
  });

  it('should NOT allow to add a existing route.', async () => {
    const response = await request(app.server)
      .post('/v1/routes')
      .send({
        start: 'GRU',
        end: 'ATL',
        price: 10,
      });

    expect(response.status).toBe(400);
  });
});

describe('Find the Cheapest Route', () => {
  it('should find the Cheapest Route.', async () => {
    const response = await request(app.server).get(
      '/v1/routes/cheapest/GRU-CDG'
    );
    const { price } = response.body;

    expect(response.status).toBe(200);
    expect(price).toBe(40);
  });

  it('should find the Cheapest Route.', async () => {
    const response = await request(app.server).get(
      '/v1/routes/cheapest/GRU-DFW'
    );
    const { price } = response.body;

    expect(response.status).toBe(200);
    expect(price).toBe(60);
  });

  it('should NOT find the Cheapest Route - wrong input - GRU', async () => {
    const response = await request(app.server).get('/v1/routes/cheapest/GRU');

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toBe(
      "Error for the asked route 'GRU'. The correct format is DEPARTURE-ARRIVAL e.g.: GRU-ORL"
    );
  });

  it('should NOT find the Cheapest Route - wrong input - GRU-AAA', async () => {
    const response = await request(app.server).get(
      '/v1/routes/cheapest/GRU-AAA'
    );

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error).toBe('There is no suggestion for the route GRU-AAA');
  });
});
