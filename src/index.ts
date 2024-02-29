import Fuse from 'fuse.js';
import { mergeCountries } from '../utils/mergeCountries';
import { ConvertedCountry, CountryData } from './types';

const getAll = (): ConvertedCountry[] => {
  const mergedCountries = mergeCountries();
  return mergedCountries;
};

const search = (q: string): CountryData[] | undefined => {
  try {
    if (!q) throw new Error('No query provided');
    else {
      const mergedCountries = mergeCountries();
      const fuse = new Fuse(mergedCountries, {
        keys: [
          'name.common',
          'name.official',
          'altSpellings',
          'cities',
          'translations.official',
          'translations.common',
          'capital',
        ],
        threshold: 0.2,
        shouldSort: true,
        useExtendedSearch: true,
        minMatchCharLength: 3,
      });

      const result = fuse.search(q, { limit: 5 }).map(({ item }) => {
        return item && { name: item.name.common, cca3: item.cca3 };
      });
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getAll, search };
