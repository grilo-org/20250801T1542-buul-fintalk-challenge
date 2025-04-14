import { User } from "../../flux/modules/user/types";
import { useSelector } from "../../flux/selector";
import { RootState } from "../../flux/store";
import { IRequest } from "../../models/iRequest";

export const useUserList = (): IRequest<User[]> =>
  useSelector((state: RootState) => state.user.list);

export const useUser = (): IRequest<User> =>
  useSelector((state: RootState) => state.user.selected);
