import countriesWithCities from '../data/countriesWithCities.json';
import nativeCountries from '../data/nativeCountries.json';
import { ConvertedCountry, Country } from '../src/types';
// const countriesWithCities = require('../data/countriesWithCities.json');
// const nativeCountries = require('../data/nativeCountries.json');

const convertTranslationsArray = (
  translations: Country['translations'] | undefined
) => {
  if (!translations) return null;
  return Object.entries(translations).map(([key, value]) => ({
    lang: key,
    ...value,
  }));
};

export const mergeCountries = (): ConvertedCountry[] => {
  const mergedCountries = countriesWithCities.data.map(country => {
    const nativeCountry = nativeCountries.find(nc => nc.cca3 === country.iso3);
    if (!nativeCountry) return null;

    const convertedTranslations = convertTranslationsArray(
      nativeCountry.translations
    );
    return {
      ...country,
      ...nativeCountry,
      translations: convertedTranslations,
    };
  });

  return mergedCountries.filter(Boolean) as ConvertedCountry[];
};
