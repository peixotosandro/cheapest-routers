import fs from 'fs';
import CheapestRoute from '../../src/app/utils/CheapestRoute';
/* global describe, it, expect */

fs.writeFileSync(
  './__tests__/input-file.txt',
  fs.readFileSync('./__tests__/input-file.bkp')
);
CheapestRoute.loadPathsFromFile('./__tests__/input-file.txt');

describe('Add New Routes.', () => {
  it('should add a new route.', () => {
    expect(CheapestRoute.addNewRoute('GRU', 'ATL', 50)).toStrictEqual({
      start: 'GRU',
      end: 'ATL',
      price: 50,
    });
    expect(CheapestRoute.addNewRoute('ATL', 'DFW', 10)).toStrictEqual({
      start: 'ATL',
      end: 'DFW',
      price: 10,
    });
  });
  it('should NOT add a new route.', () => {
    expect(CheapestRoute.addNewRoute('GRU', 'ATL', 50)).toStrictEqual({
      error: "Route already added 'GRU,ATL,50'",
    });
  });
});

describe('Find the Cheapest Route Price.', () => {
  it('should find the Cheapest Route Price.', () => {
    expect(CheapestRoute.getCheapestRoute('GRU', 'CDG')).toStrictEqual({
      route: ['GRU', 'BRC', 'SCL', 'ORL', 'CDG'],
      price: 40,
    });
    expect(CheapestRoute.getCheapestRoute('GRU', 'DFW')).toStrictEqual({
      route: ['GRU', 'ATL', 'DFW'],
      price: 60,
    });
  });
  it('should NOT find the Cheapest Route Price.', () => {
    expect(CheapestRoute.getCheapestRoute('GRU', 'AAA')).toStrictEqual({
      error: 'There is no suggestion for the route GRU-AAA',
    });
  });
});
