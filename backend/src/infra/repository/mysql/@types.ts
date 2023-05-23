import {
  FieldPacket,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import Joi from "joi";

export type SqlDataReturn<T> = Promise<[T[], FieldPacket[]]>;

export type User = { id?: number; email: string; password_hash: string };

export type ReqUser = Omit<User, "id"> & {
  id: number;
};

export type Repository<T, U> = {
  validate: (
    data: Partial<T>,
    forCreation?: boolean
  ) => Joi.ValidationError | undefined;
  find: (id: number) => SqlDataReturn<U>;
  findAll: () => SqlDataReturn<U>;
  delete_: (
    id: number
  ) => Promise<
    [
      (
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader
      ),
      FieldPacket[]
    ]
  >;
  insert: (
    data: T
  ) => Promise<
    [
      (
        | OkPacket
        | ResultSetHeader
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket[]
      ),
      FieldPacket[]
    ]
  >;
  update: (
    data: Partial<T>,
    id: number
  ) => Promise<
    [
      (
        | OkPacket
        | ResultSetHeader
        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket[]
      ),
      FieldPacket[]
    ]
  >;
};
