import Fuse from 'fuse.js';
import { mergeCountries } from '../utils/mergeCountries';
import { ConvertedCountry, CountryData } from './types';
import { Options } from './types/options';

const getAll = (): ConvertedCountry[] => {
  const mergedCountries = mergeCountries();
  return mergedCountries;
};

const search = (q: string, options?: Options): CountryData[] => {
  try {
    if (!q) throw new Error('No query provided');
    else {
      const mergedCountries = mergeCountries(options);
      const fuse = new Fuse(mergedCountries, {
        keys: options?.keys || [
          // 'name.common',
          // 'name.official',
          // 'altSpellings',
          // 'cities',
          'translations.official',
          'translations.common',
          // 'capital',
        ],
        threshold: options?.threshold || 0.2,
        shouldSort: true,
        useExtendedSearch: true,
        minMatchCharLength: options?.minMatchCharLength || 3,
        isCaseSensitive: false,
      });

      const result = fuse
        .search(q.replace(' ', ''), { limit: options?.limit || 5 })
        .map(({ item }) => {
          return item && { name: item.name.common, cca3: item.cca3 };
        });
      return result;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getAll, search };
