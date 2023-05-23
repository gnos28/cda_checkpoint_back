import { Continent } from "../../@types";
import { getContinentUseCasePort } from "./getContinent.spi";

type getContinentUseCaseProps = {};

export type GetContinentUseCase = (
  adapter: getContinentUseCasePort
) => (props?: getContinentUseCaseProps) => Promise<Continent[]>;
