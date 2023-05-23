import { MySQLPromisePool } from "@fastify/mysql";
import Fastify from "fastify";
import * as dotenv from "dotenv";
import mysql from "@fastify/mysql";

dotenv.config();

// if you passed promise = true
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

export const mysqlPool = async () => {
  const fastify = Fastify();

  const { DB_USER, DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME } = process.env;

  fastify.register(mysql, {
    promise: true,
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  await fastify.ready();

  await fastify.mysql.getConnection();

  return fastify.mysql;
};
