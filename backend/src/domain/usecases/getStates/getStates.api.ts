import { State } from "../../@types";
import { getStatesUseCasePort } from "./getStates.spi";

type getStatesUseCaseProps = {};

export type GetStatesUseCase = (
  adapter: getStatesUseCasePort
) => (props?: getStatesUseCaseProps) => Promise<State[]>;
