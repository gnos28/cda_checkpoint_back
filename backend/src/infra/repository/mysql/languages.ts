import Joi from "joi";
import { RequiredId, SqlDataReturn } from "./@types";
import { mysqlPool } from ".";
import { Language } from "../../../domain/@types";

type Presence = "required" | "optional";
type ReqLanguage = RequiredId<Language>;

const table = "languages";

const validate = (data: Partial<Language>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    code: Joi.string().presence(presence),
    name: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqLanguage> =>
  (await mysqlPool()).query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqLanguage>;

const findAll = async (): SqlDataReturn<ReqLanguage> =>
  (await mysqlPool()).query(
    `select * from  ${table}`
  ) as SqlDataReturn<ReqLanguage>;

const delete_ = async (id: number) =>
  (await mysqlPool()).query(`delete from ${table} where id = ?`, [id]);

const insert = async (data: Language) =>
  (await mysqlPool()).query(`insert into ${table} (code, name) values (?, ?)`, [
    data.code,
    data.name,
  ]);

const update = async (data: Partial<Language>, id: number) =>
  (await mysqlPool()).query(`update ${table} set ? where id = ?`, [data, id]);

const languagesRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { languagesRepository };
