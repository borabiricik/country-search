import { IFuseOptions } from 'fuse.js';

export interface Options {
  countryCCA3s?: string[];
  keys?: SearchKeys[];
  limit?: number;
  threshold?: IFuseOptions<unknown>['threshold'];
  minMatchCharLength?: IFuseOptions<unknown>['minMatchCharLength'];
  languageCodes?: string[];
  customTranslations?: CustomTranslation[];
}

interface CustomTranslation {
  lang: string;
  country: string;
  common: string;
  official: string;
}

type SearchKeys =
  | 'name.common'
  | 'name.official'
  | 'altSpellings'
  | 'cities'
  | 'translations.official'
  | 'translations.common'
  | 'capital';
