import { GetContinentUseCase } from "./getContinent.api";

export const getContinentUseCase: GetContinentUseCase =
  (adapter) => async (_props) => {
    const continent = await adapter.continentRepository.findAll();

    return continent;
  };
