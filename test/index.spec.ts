import { getAll, search } from '../src';

describe('index', () => {
  describe('search', () => {
    it('should find spain', () => {
      const result = search('spain', {
        countryCCA3s: ['ESP', 'CHN', 'FRA'],
      });

      expect(result?.[0]).toEqual({ name: 'Spain', cca3: 'ESP' });
    });

    it('should find turkey', () => {
      const result = search('turkey', {
        countryCCA3s: ['ESP', 'CHN', 'FRA', 'TUR'],
      });

      expect(result?.[0]).toEqual({ name: 'Turkey', cca3: 'TUR' });
    });
  });
});
