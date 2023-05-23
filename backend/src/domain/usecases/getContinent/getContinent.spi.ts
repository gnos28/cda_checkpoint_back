import {
  Adapter,
  createCrudAdapter,
} from "../../../infra/repository/mysql/genericCrudAdapter";
import { continentRepository } from "../../../infra/repository/mysql/continents";
import { Language } from "../../@types";

export type getContinentUseCasePort = {
  continentRepository: Adapter<Language>;
};

export const getContinentUseCaseAdapter: getContinentUseCasePort = {
  continentRepository: createCrudAdapter(continentRepository),
};
