import Joi from "joi";
import { RequiredId, SqlDataReturn } from "./@types";
import { mysqlPool } from ".";
import { CountryLanguage } from "../../../domain/@types";

type Presence = "required" | "optional";
type ReqCountryLanguage = RequiredId<CountryLanguage>;

const table = "countries_languages";

const validate = (data: Partial<CountryLanguage>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    countries_id: Joi.number().presence(presence),
    languages_id: Joi.number().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqCountryLanguage> =>
  (await mysqlPool()).query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqCountryLanguage>;

const findAll = async (): SqlDataReturn<ReqCountryLanguage> =>
  (await mysqlPool()).query(
    `select * from  ${table}`
  ) as SqlDataReturn<ReqCountryLanguage>;

const delete_ = async (id: number) =>
  (await mysqlPool()).query(`delete from ${table} where id = ?`, [id]);

const insert = async (data: CountryLanguage) =>
  (await mysqlPool()).query(
    `insert into ${table} (countries_id, languages_id) values (?, ?)`,
    [data.countries_id, data.languages_id]
  );

const update = async (data: Partial<CountryLanguage>, id: number) =>
  (await mysqlPool()).query(`update ${table} set ? where id = ?`, [data, id]);

const countries_languagesRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { countries_languagesRepository };
