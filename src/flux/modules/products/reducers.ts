import { Action, createReducer } from "typesafe-actions";

import { clearProducts } from "./actions";
import { IProducts } from "./types";
import { RequestStatus } from "../../../models/iRequest";

const initialState: IProducts = {
  productsData: { data: null, message: null, status: RequestStatus.idle },
};

const sigInReducer = createReducer<IProducts, Action>(
  initialState
).handleAction(clearProducts, (state) => ({
  ...state,
  productsData: {
    data: null,
    message: null,
    status: RequestStatus.idle,
  },
}));

export default sigInReducer;
