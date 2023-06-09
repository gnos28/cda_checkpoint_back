import Joi from "joi";
import { RequiredId, SqlDataReturn } from "./@types";
import { mysqlPool } from ".";
import { Continent } from "../../../domain/@types";

type Presence = "required" | "optional";
type ReqContinent = RequiredId<Continent>;

const table = "continents";

const validate = (data: Partial<Continent>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    code: Joi.string().presence(presence),
    name: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqContinent> =>
  (await mysqlPool()).query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqContinent>;

const findAll = async (): SqlDataReturn<ReqContinent> =>
  (await mysqlPool()).query(
    `select * from  ${table}`
  ) as SqlDataReturn<ReqContinent>;

const delete_ = async (id: number) =>
  (await mysqlPool()).query(`delete from ${table} where id = ?`, [id]);

const insert = async (data: Continent) =>
  (await mysqlPool()).query(`insert into ${table} (code, name) values (?, ?)`, [
    data.code,
    data.name,
  ]);

const update = async (data: Partial<Continent>, id: number) =>
  (await mysqlPool()).query(`update ${table} set ? where id = ?`, [data, id]);

const continentRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { continentRepository };
