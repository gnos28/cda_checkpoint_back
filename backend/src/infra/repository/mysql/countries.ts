import Joi from "joi";
import { RequiredId, SqlDataReturn } from "./@types";
import { mysqlPool } from ".";
import { Country } from "../../../domain/@types";

type Presence = "required" | "optional";
type ReqCountry = RequiredId<Country>;

const table = "countries";

const validate = (data: Partial<Country>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    continents_id: Joi.number().presence(presence),
    name: Joi.string().presence(presence),
    code: Joi.string().presence(presence),
    native: Joi.string().presence(presence),
    phone: Joi.string().presence(presence),
    capital: Joi.string().presence(presence),
    currency: Joi.string().presence(presence),
    emoji: Joi.string().presence(presence),
    emojiU: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqCountry> =>
  (await mysqlPool()).query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqCountry>;

const findAll = async (): SqlDataReturn<ReqCountry> =>
  (await mysqlPool()).query(`select * from  ${table}`) as SqlDataReturn<ReqCountry>;

const delete_ = async (id: number) =>
  (await mysqlPool()).query(`delete from ${table} where id = ?`, [id]);

const insert = async (data: Country) =>
  (await mysqlPool()).query(
    `insert into ${table} (continents_id, name, code, native, phone, capital, currency, emoji, emojiU ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.continents_id,
      data.name,
      data.code,
      data.native,
      data.phone,
      data.capital,
      data.currency,
      data.emoji,
      data.emojiU,
    ]
  );

const update = async (data: Partial<Country>, id: number) =>
  (await mysqlPool()).query(`update ${table} set ? where id = ?`, [data, id]);

const countriesRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { countriesRepository };
