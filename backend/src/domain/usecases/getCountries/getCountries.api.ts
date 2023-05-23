import { Country } from "../../@types";
import { getCountriesUseCasePort } from "./getCountries.spi";

type getCountriesUseCaseProps = {};

export type GetCountriesUseCase = (
  adapter: getCountriesUseCasePort
) => (props?: getCountriesUseCaseProps) => Promise<Country[]>;
