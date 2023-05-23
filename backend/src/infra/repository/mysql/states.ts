import Joi from "joi";
import { RequiredId, SqlDataReturn } from "./@types";
import { mysqlPool } from ".";
import { State } from "../../../domain/@types";

type Presence = "required" | "optional";
type ReqState = RequiredId<State>;

const table = "states";

const validate = (data: Partial<State>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    countries_id: Joi.number().presence(presence),
    code: Joi.string().presence(presence),
    name: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqState> =>
  (await mysqlPool()).query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqState>;

const findAll = async (): SqlDataReturn<ReqState> =>
  (await mysqlPool()).query(`select * from  ${table}`) as SqlDataReturn<ReqState>;

const delete_ = async (id: number) =>
  (await mysqlPool()).query(`delete from ${table} where id = ?`, [id]);

const insert = async (data: State) =>
  (await mysqlPool()).query(
    `insert into ${table} (countries_id, code, name) values (?, ?, ?)`,
    [data.countries_id, data.code, data.name]
  );

const update = async (data: Partial<State>, id: number) =>
  (await mysqlPool()).query(`update ${table} set ? where id = ?`, [data, id]);

const statesRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { statesRepository };
