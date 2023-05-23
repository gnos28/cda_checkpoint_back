import {
    Adapter,
    createCrudAdapter,
  } from "../../../infra/repository/mysql/genericCrudAdapter";
  import { countriesRepository } from "../../../infra/repository/mysql/countries";
  import { Country } from "../../@types";
  
  export type getCountriesUseCasePort = {
    countriesRepository: Adapter<Country>;
  };
  
  export const getCountriesUseCaseAdapter: getCountriesUseCasePort = {
    countriesRepository: createCrudAdapter(countriesRepository),
  };
  