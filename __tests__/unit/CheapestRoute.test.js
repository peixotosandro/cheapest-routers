import CheapestRoute from '../../src/app/utils/CheapestRoute';

/* global describe, it, expect */

CheapestRoute.loadPathsFromFile('./__tests__/input-file.txt');

describe('Find the Cheapest Route Price.', () => {
  it('should find the  Cheapest Route Price.', () => {
    expect(CheapestRoute.getCheapestRoute('GRU', 'CDG')).toStrictEqual({
      success: true,
      route: ['GRU', 'BRC', 'SCL', 'ORL', 'CDG'],
      price: 40,
    });
  });
});
