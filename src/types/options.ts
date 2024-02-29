export interface Options {
  countryCCA3s?: string[];
  keys?: SearchKeys[];
  limit?: number;
}

type SearchKeys =
  | 'name.common'
  | 'name.official'
  | 'altSpellings'
  | 'cities'
  | 'translations.official'
  | 'translations.common'
  | 'capital';
