export type ServiceResult = {
  status:
    | "PENDING"
    | "OK"
    | "VALIDATION_ERROR"
    | "UNKNOWN_ERROR"
    | "INCOMPLETE_REQUEST";
  result?: { insertId?: number; affectedRows?: number; id_placement?: number };
  error?:
    | {
        message: string;
        details: {
          type: string;
          message: string;
        }[];
      }
    | unknown;
};

export type Service<T, U> = {
  findAll: () => Promise<U[]>;
  find: (id: number) => Promise<U>;
  add: (data: T) => Promise<ServiceResult>;
  update: (data: Partial<T>, id: number) => Promise<ServiceResult>;
  delete: (id: number) => Promise<ServiceResult>;
};
