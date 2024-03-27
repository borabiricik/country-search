import countriesWithCities from '../data/countriesWithCities.json';
import nativeCountries from '../data/nativeCountries.json';
import { ConvertedCountry, Country } from '../src/types';
import { Options } from '../src/types/options';

const convertTranslationsArray = (
  translations?: Country['translations'],
  languageCodes?: Options['languageCodes']
) => {
  if (!translations) return null;
  const convertedTranslations = Object.entries(translations).map(
    ([key, value]) => ({
      lang: key,
      common: value?.common?.toLocaleLowerCase(languageCodes),
      official: value?.official?.toLocaleLowerCase(languageCodes),
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
  if (options?.keys?.includes('cities')) {
    const internalCountries = options?.countryCCA3s
      ? countriesWithCities.data.filter(country =>
          options.countryCCA3s?.includes(country.iso3)
        )
      : countriesWithCities.data;
    const mergedCountries = internalCountries.map(country => {
      const nativeCountry = nativeCountries.find(
        nc => nc.cca3 === country.iso3
      );
      if (!nativeCountry) return null;
      const convertedTranslations = convertTranslationsArray(
        nativeCountry.translations,
        languageCodes
      );
      return {
        ...country,
        ...nativeCountry,
        translations: convertedTranslations,
      };
    });
    return mergedCountries.filter(Boolean) as ConvertedCountry[];
  }

  const internalCountries = options?.countryCCA3s
    ? nativeCountries.filter(country =>
        options.countryCCA3s?.includes(country.cca3)
      )
    : nativeCountries;
  const convertedCountires = internalCountries.map(country => {
    const convertedTranslations = convertTranslationsArray(
      country.translations,
      languageCodes
    );
    return {
      ...country,

      translations: convertedTranslations,
    };
  });

  const customizedTranslations = convertedCountires.map(country => {
    const customTranslation = options?.customTranslations?.find(
      ct => ct.country === country.cca3
    );
    if (!customTranslation) return country;
    const convertedCustomTranslation =
      convertTranslationsArray(
        {
          [customTranslation.lang]: {
            common: customTranslation.common,
            official: customTranslation.official,
          },
        },
        languageCodes
      ) || [];
    const translations = country.translations
      ? [...country.translations, ...convertedCustomTranslation]
      : [...convertedCustomTranslation];
    return {
      ...country,
      translations,
    };
  });

  return customizedTranslations as ConvertedCountry[];
};
