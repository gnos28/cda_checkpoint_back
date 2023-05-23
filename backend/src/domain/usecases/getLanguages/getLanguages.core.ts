import { GetLanguagesUseCase } from "./getLanguages.api";

export const getLanguagesUseCase: GetLanguagesUseCase =
  (adapter) => async (_props) => {
    const languages = await adapter.languagesRepository.findAll();

    return languages;
  };
