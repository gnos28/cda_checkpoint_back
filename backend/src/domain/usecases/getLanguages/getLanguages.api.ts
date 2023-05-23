import { Language } from "../../@types";
import { getLanguagesUseCasePort } from "./getLanguages.spi";

type getLanguagesUseCaseProps = {};

export type GetLanguagesUseCase = (
  adapter: getLanguagesUseCasePort
) => (props?: getLanguagesUseCaseProps) => Promise<Language[]>;
