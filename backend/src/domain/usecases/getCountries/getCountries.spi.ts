import {
  Adapter,
  createCrudAdapter,
} from "../../../infra/repository/mysql/genericCrudAdapter";
import { countriesRepository } from "../../../infra/repository/mysql/countries";
import { Country, CountryLanguage, Language, State } from "../../@types";
import { countries_languagesRepository } from "../../../infra/repository/mysql/countries_languages";
import { languagesRepository } from "../../../infra/repository/mysql/languages";
import { statesRepository } from "../../../infra/repository/mysql/states";

export type getCountriesUseCasePort = {
  countriesRepository: Adapter<Country>;
  countries_languagesRepository: Adapter<CountryLanguage>;
  languagesRepository: Adapter<Language>;
  statesRepository: Adapter<State>;
};

export const getCountriesUseCaseAdapter: getCountriesUseCasePort = {
  countriesRepository: createCrudAdapter(countriesRepository),
  countries_languagesRepository: createCrudAdapter(
    countries_languagesRepository
  ),
  languagesRepository: createCrudAdapter(languagesRepository),
  statesRepository: createCrudAdapter(statesRepository),
};
