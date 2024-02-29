export interface Options {
  countryCCA3s?: string[];
  keys?: SearchKeys[];
}

type SearchKeys =
  | 'name.common'
  | 'name.official'
  | 'altSpellings'
  | 'cities'
  | 'translations.official'
  | 'translations.common'
  | 'capital';
