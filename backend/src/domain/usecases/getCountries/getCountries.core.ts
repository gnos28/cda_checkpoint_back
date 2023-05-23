import { GetCountriesUseCase } from "./getCountries.api";

const LANGUAGES_QUERY = "languages {";

const STATES_QUERY = "states";

export const getCountriesUseCase: GetCountriesUseCase =
  (adapter) => async (props) => {
    const splittedQuery =
      props?.query?.split("\n").map((line) => line.trim()) || [];

    const getLanguages = splittedQuery.includes(LANGUAGES_QUERY);

    const getStates = splittedQuery.includes(STATES_QUERY);

    const countries = await adapter.countriesRepository.findAll();

    let countriesLanguages: Awaited<
      ReturnType<typeof adapter.countries_languagesRepository.findAll>
    > = [];

    let languages: Awaited<
      ReturnType<typeof adapter.languagesRepository.findAll>
    > = [];

    let states: Awaited<ReturnType<typeof adapter.statesRepository.findAll>> =
      [];

    if (getLanguages) {
      countriesLanguages =
        await adapter.countries_languagesRepository.findAll();
      languages = await adapter.languagesRepository.findAll();
    }

    if (getStates) states = await adapter.statesRepository.findAll();

    return countries.map((country) => ({
      ...country,
      languages: countriesLanguages
        .filter(
          (countriesLanguage) => countriesLanguage.countries_id === country.id
        )
        .map((countriesLanguage) => countriesLanguage.languages_id)
        .map((languages_id) =>
          languages.filter((language) => language.id === languages_id)
        )
        .flat(),
      states: states.filter((state) => state.countries_id === country.id),
    }));
  };
