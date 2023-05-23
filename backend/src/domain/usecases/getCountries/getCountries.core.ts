import { GetCountriesUseCase } from "./getCountries.api";

export const getCountriesUseCase: GetCountriesUseCase =
  (adapter) => async (_props) => {
    const countries = await adapter.countriesRepository.findAll();

    return countries;
  };
