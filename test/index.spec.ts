import { getAll, search } from '../src';

describe('index', () => {
  describe('search', () => {
    it('should return a string containing the message', () => {
      const result = search('Turkey', { countryCCA3s: ['TUR'] });

      expect(result).toBeDefined();
    });
  });
});
