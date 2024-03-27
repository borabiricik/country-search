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
    it('should search with custom keys', () => {
      const result = search('uni', {
        keys: ['name.common', 'name.official'],
      });
      expect(result?.[0].name).toContain('United');
    });
    it('should find usa', () => {
      const result = search('united st', {
        keys: ['name.common', 'name.official'],
      });
      expect(result?.[0]).toEqual({ name: 'United States', cca3: 'USA' });
    });

    it('should find cyprus', () => {
      const result = search('cyprus', {
        keys: [
          'name.common',
          'name.official',
          'altSpellings',
          'capital',
          'cities',
        ],
      });
      expect(result?.[0]).toEqual({ name: 'Cyprus', cca3: 'CYP' });
    });
    it('should find cyprus', () => {
      const result = search('kıbrıs', {
        keys: [
          'translations.common',
          'translations.official',
          // 'name.common',
          // 'name.official',
          // 'altSpellings',
          // 'capital',
          // 'cities',
        ],
      });
      expect(result?.[0]).toEqual({ name: 'Cyprus', cca3: 'CYP' });
    });
  });

  describe('case insensetive search', () => {
    describe('case insensetive search', () => {
      it('should find italy', () => {
        const result = search('Ita', {
          countryCCA3s: ['ESP', 'CHN', 'ITA', 'USA'],
          minMatchCharLength: 2,
        });

        expect(result?.[0]).toEqual({ name: 'Italy', cca3: 'ITA' });
      });
    });
  });

  describe('translations search', () => {
    it('should include only turkish translations', () => {
      const result = search('İt', {
        languageCodes: ['tur'],
        keys: ['translations.common', 'translations.official'],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).toEqual({ name: 'Italy', cca3: 'ITA' });
    });
    it('should include only german translations', () => {
      const result = search('Italienische', {
        languageCodes: ['deu'],
        keys: [
          'translations.common',
          'translations.official',
          'name.common',
          'name.official',
        ],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).toEqual({ name: 'Italy', cca3: 'ITA' });
    });
    it('should not include non-languageCode given country', () => {
      const result = search('İtalya', {
        languageCodes: ['deu'],
        keys: [
          'translations.common',
          'translations.official',
          'name.common',
          'name.official',
        ],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).not.toEqual({ name: 'Italy', cca3: 'ITA' });
    });
    it('should include only turkish translations', () => {
      const result = search('is', {
        countryCCA3s: [
          'TUR',
          'FRA',
          'DEU',
          'GRC',
          'ITA',
          'ESP',
          'GBR',
          'USA',
          'MEX',
        ],
        languageCodes: ['tur'],
        keys: [
          'translations.common',
          'translations.official',
          'name.common',
          'name.official',
        ],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).not.toEqual({ name: 'Italy', cca3: 'ITA' });
    });

    it('should include localed translations - italy', () => {
      const result = search('İta', {
        countryCCA3s: [
          'TUR',
          'FRA',
          'DEU',
          'GRC',
          'ITA',
          'ESP',
          'GBR',
          'USA',
          'MEX',
        ],
        languageCodes: ['tur'],
        keys: ['translations.common'],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).toEqual({ name: 'Italy', cca3: 'ITA' });
    });

    it('should include localed translations - spain', () => {
      const result = search('İs', {
        countryCCA3s: [
          'TUR',
          'FRA',
          'DEU',
          'GRC',
          'ITA',
          'ESP',
          'GBR',
          'USA',
          'MEX',
        ],
        languageCodes: ['tur'],
        keys: ['translations.common'],
        minMatchCharLength: 2,
      });
      expect(result?.[0]).toEqual({ name: 'Spain', cca3: 'ESP' });
    });

    it('should include localed translations - french guiana', () => {
      const result = search('Fransız', {
        countryCCA3s: [
          'COG',
          'GHA',
          'MOZ',
          'REU',
          'ZAF',
          'TZA',
          'MYT',
          'CYP',
          'HKG',
          'ISR',
          'JPN',
          'QAT',
          'RUS',
          'ARE',
          'IND',
          'MYS',
          'SGP',
          'THA',
          'ARM',
          'KHM',
          'CHN',
          'IDN',
          'KAZ',
          'KOR',
          'MNG',
          'MMR',
          'PHL',
          'SAU',
          'LKA',
          'TWN',
          'TUR',
          'VNM',
          'AUT',
          'BEL',
          'HRV',
          'CZE',
          'FRA',
          'DEU',
          'GRC',
          'HUN',
          'IRL',
          'ITA',
          'NLD',
          'NOR',
          'POL',
          'PRT',
          'ESP',
          'SWE',
          'CHE',
          'GBR',
          'UKR',
          'BGR',
          'DNK',
          'EST',
          'FIN',
          'VAT',
          'ISL',
          'LVA',
          'LIE',
          'LTU',
          'LUX',
          'MLT',
          'MCO',
          'ROU',
          'SMR',
          'SVK',
          'SVN',
          'ALB',
          'FRO',
          'GIB',
          'GGY',
          'IMN',
          'JEY',
          'MKD',
          'MNE',
          'MDA',
          'SRB',
          'USA',
          'BRB',
          'BMU',
          'CAN',
          'CRI',
          'DOM',
          'SLV',
          'GRD',
          'GLP',
          'GTM',
          'HND',
          'JAM',
          'MTQ',
          'MEX',
          'MSR',
          'NIC',
          'PAN',
          'PRI',
          'KNA',
          'LCA',
          'TTO',
          'TCA',
          'AUS',
          'NZL',
          'FJI',
          'WSM',
          'SLB',
          'VUT',
          'ARG',
          'BRA',
          'CHL',
          'COL',
          'ECU',
          'GUF',
          'GUY',
          'PRY',
          'PER',
          'SUR',
          'URY',
        ],
        languageCodes: ['tur'],
        keys: [
          'translations.common',
          // 'translations.official',
          // 'name.common',
          // 'name.official',
        ],
        minMatchCharLength: 2,
      });
      console.log({ result });
      expect(result?.[0].cca3).toEqual('GUF');
    });
  });
});
