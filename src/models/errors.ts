export type GenericError = {
  code: string;
  fields?: { [field: string]: string };
  message: string;
  type: string;
};
