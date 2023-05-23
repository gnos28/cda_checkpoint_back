import { MySQLPromisePool } from "@fastify/mysql";
import { fastify } from "../../../app";

// if you passed promise = true
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

export const mysql = fastify.mysql;
