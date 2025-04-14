import { Action, createReducer } from "typesafe-actions";

import { setUser } from "./actions";
import { IUser, User } from "./types";
import { RequestStatus } from "../../../models/iRequest";

// Mock user list
const mockUsers: User[] = [
  { id: 1, name: "Paulo Firmino" },
  { id: 2, name: "Matheus Fernandez" },
  { id: 3, name: "Flaco Lopez" },
];

const initialState: IUser = {
  selected: { data: mockUsers[0], message: null, status: RequestStatus.idle },
  list: { data: mockUsers, message: null, status: RequestStatus.idle },
};

const sigInReducer = createReducer<IUser, Action>(initialState).handleAction(
  setUser,
  (state, action) => ({
    ...state,
    selected: {
      data: action.payload,
      message: null,
      status: RequestStatus.idle,
    },
  })
);

export default sigInReducer;
