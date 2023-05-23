import {
  Adapter,
  createCrudAdapter,
} from "../../../infra/repository/mysql/genericCrudAdapter";
import { statesRepository } from "../../../infra/repository/mysql/states";
import { State } from "../../@types";

export type getStatesUseCasePort = {
  statesRepository: Adapter<State>;
};

export const getStatesUseCaseAdapter: getStatesUseCasePort = {
  statesRepository: createCrudAdapter(statesRepository),
};
