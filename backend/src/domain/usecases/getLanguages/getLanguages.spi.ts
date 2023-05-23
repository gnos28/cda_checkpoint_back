import {
  Adapter,
  createCrudAdapter,
} from "../../../infra/repository/mysql/genericCrudAdapter";
import { languagesRepository } from "../../../infra/repository/mysql/languages";
import { Language } from "../../@types";

export type getLanguagesUseCasePort = {
  languagesRepository: Adapter<Language>;
};

export const getLanguagesUseCaseAdapter: getLanguagesUseCasePort = {
  languagesRepository: createCrudAdapter(languagesRepository),
};
