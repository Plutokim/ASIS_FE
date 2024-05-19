export type ErrorResponseType = {
  status: "error";
  msg: string;
};

export type SuccessResponseType<T> = {
  status: "ok";
  data: T;
};
