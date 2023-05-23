import { GetStatesUseCase } from "./getStates.api";

export const getStatesUseCase: GetStatesUseCase =
  (adapter) => async (_props) => {
    const states = await adapter.statesRepository.findAll();

    return states;
  };
