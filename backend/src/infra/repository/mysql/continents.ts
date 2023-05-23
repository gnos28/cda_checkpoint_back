import Joi from "joi";
import { ReqUser, SqlDataReturn, User } from "./@types";
import { mysql } from ".";

type Presence = "required" | "optional";

const table = "user";

const validate = (data: Partial<User>, forCreation = true) => {
  const presence: Presence = forCreation ? "required" : "optional";

  return Joi.object({
    email: Joi.string().presence(presence),
    password_hash: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const find = async (id: number): SqlDataReturn<ReqUser> =>
  mysql.query(`select * from  ${table} where id = ?`, [
    id,
  ]) as SqlDataReturn<ReqUser>;

const findAll = async (): SqlDataReturn<ReqUser> =>
  mysql.query(`select * from  ${table}`) as SqlDataReturn<ReqUser>;

const delete_ = async (id: number) =>
  mysql.query(`delete from ${table} where id = ?`, [id]);

const insert = async (user: User) =>
  mysql.query(`insert into ${table} (email, password_hash) values (?, ?)`, [
    user.email,
    user.password_hash,
  ]);

const update = async (user: Partial<User>, id: number) =>
  mysql.query(`update ${table} set ? where id = ?`, [user, id]);

const userRepository = {
  validate,
  find,
  findAll,
  delete_,
  insert,
  update,
};

export { userRepository };
