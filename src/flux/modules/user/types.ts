import { IRequest } from "../../../models/iRequest";

export type User = {
  id: number;
  name: string;
  image?: string;
};

export interface IUser {
  list: IRequest<User[]>;
  selected: IRequest<User>;
}
