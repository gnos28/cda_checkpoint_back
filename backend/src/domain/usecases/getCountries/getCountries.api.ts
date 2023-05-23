import { Country, Language, State } from "../../@types";
import { getCountriesUseCasePort } from "./getCountries.spi";

type getCountriesUseCaseProps = {
  query: string | undefined;
};
type CountryDeep = Country & {
  languages: Language[];
  states: State[];
};

export type GetCountriesUseCase = (
  adapter: getCountriesUseCasePort
) => (props?: getCountriesUseCaseProps) => Promise<CountryDeep[]>;
