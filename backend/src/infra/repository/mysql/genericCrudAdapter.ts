import { Repository } from "./@types";

export type Adapter<T, U> = {
  validate: (
    data: Partial<T>,
    forCreation?: boolean
  ) =>
    | {
        message: string;
        details: {
          type: string;
          message: string;
        }[];
      }
    | undefined;

  find: (id: number) => Promise<U>;

  findAll: () => Promise<U[]>;

  delete_: (id: number) => Promise<{
    affectedRows: number;
  }>;

  insert: (data: T) => Promise<{
    insertId: number;
  }>;

  update: (
    data: Partial<T>,
    id: number
  ) => Promise<{
    affectedRows: number;
  }>;
};

/**
 * adapter to mysql db + JOI
 */
const createCrudAdapter = <T, U>(repository: Repository<T, U>) => ({
  validate: (data: Partial<T>, forCreation?: boolean) => {
    const validationErrors = repository.validate(data, forCreation);
    if (!validationErrors) return undefined;
    else
      return {
        message: validationErrors.message,
        details: validationErrors.details.map((item) => ({
          type: item.type,
          message: item.message,
        })),
      };
  },
  find: async (id: number) => {
    const [data] = await repository.find(id);

    if (!data.length) throw new Error(`id ${id} not found or not allowed`);

    return data[0];
  },
  findAll: async () => {
    const [data] = await repository.findAll();
    return data;
  },
  delete_: async (id: number) => {
    const [deleteResult] = await repository.delete_(id);

    if (!Array.isArray(deleteResult)) {
      return { affectedRows: deleteResult.affectedRows };
    } else throw new Error("unexpected type");
  },
  insert: async (data: T) => {
    const [insertResult] = await repository.insert(data);

    if (!Array.isArray(insertResult)) {
      return { insertId: insertResult.insertId };
    } else throw new Error("unexpected type");
  },
  update: async (data: Partial<T>, id: number) => {
    const [updateResult] = await repository.update(data, id);

    if (!Array.isArray(updateResult)) {
      return { affectedRows: updateResult.affectedRows };
    } else throw new Error("unexpected type");
  },
});

export { createCrudAdapter };
