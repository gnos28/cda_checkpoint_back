import {
  FieldPacket,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import Joi from "joi";

export type SqlDataReturn<T> = Promise<[T[], FieldPacket[]]>;

export type RequiredId<T> = Omit<T, "id"> & {
  id: number;
};

export type Repository<T> = {
  validate: (
    data: Partial<T>,
    forCreation?: boolean
  ) => Joi.ValidationError | undefined;
  find: (id: number) => SqlDataReturn<RequiredId<T>>;
  findAll: () => SqlDataReturn<RequiredId<T>>;
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
