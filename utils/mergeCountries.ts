import countriesWithCities from '../data/countriesWithCities.json';
import nativeCountries from '../data/nativeCountries.json';
import { ConvertedCountry, Country } from '../src/types';
import { Options } from '../src/types/options';
// const countriesWithCities = require('../data/countriesWithCities.json');
// const nativeCountries = require('../data/nativeCountries.json');

const convertTranslationsArray = (
  translations?: Country['translations'],
  languageCodes?: Options['languageCodes'],
  currentLocale?: Options['currentLocale']
) => {
  if (!translations) return null;
  const convertedTranslations = Object.entries(translations).map(
    ([key, value]) => ({
      lang: key,
      common: currentLocale
        ? value?.common?.toLocaleLowerCase(languageCodes)
        : value?.common,
      official: currentLocale
        ? value?.official?.toLocaleLowerCase(languageCodes)
        : value?.official,
      // official: value?.official?.toLocaleLowerCase('tr'),
      // ...value,
    })
  );
  if (!languageCodes) return convertedTranslations;
  return convertedTranslations.filter(code =>
    languageCodes?.includes(code.lang)
  );
};

export const mergeCountries = (
  options?: Options,
  languageCodes?: Options['languageCodes']
): ConvertedCountry[] => {
  const internalCountries = options?.countryCCA3s
    ? countriesWithCities.data.filter(country =>
        options.countryCCA3s?.includes(country.iso3)
      )
    : countriesWithCities.data;
  const mergedCountries = internalCountries.map(country => {
    const nativeCountry = nativeCountries.find(nc => nc.cca3 === country.iso3);
    if (!nativeCountry) return null;
    const convertedTranslations = convertTranslationsArray(
      nativeCountry.translations,
      languageCodes,
      options?.currentLocale
    );
    return {
      ...country,
      ...nativeCountry,
      translations: convertedTranslations,
    };
  });

  return mergedCountries.filter(Boolean) as ConvertedCountry[];
};
