export interface Country {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  flag: string;
  maps: Maps;
  population: number;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
  iso2: string;
  iso3: string;
  country?: string;
  cities: string[];
}

export interface ConvertedCountry
  extends Omit<
    Country,
    'translations' | 'cities' | 'iso2' | 'iso3' | 'postalCode'
  > {
  translations: {
    lang: string;
    official: string;
    common: string;
  }[];
}

export interface CountryData {
  name: string;
  cca3: string;
}

export interface Name {
  common: string;
  official: string;
}

export interface Translations {
  [key: string]: Translation | undefined;
}

export interface Translation {
  official: string;
  common: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface PostalCode {
  format: string;
  regex: string;
}
