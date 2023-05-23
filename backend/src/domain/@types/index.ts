export type Continent = {
  id?: number;
  code: string;
  name: string;
};

export type Country = {
  id?: number;
  continents_id: number;
  name: string;
  code: string;
  native: string;
  phone: string;
  capital: string;
  currency: string;
  emoji: string;
  emojiU: string;
};

export type CountryLanguage = {
  id?: number;
  countries_id: number;
  languages_id: number;
};

export type Language = {
  id?: number;
  code: string;
  name: string;
};

export type State = {
  id?: number;
  countries_id: number;
  code: String;
  name: String;
};
