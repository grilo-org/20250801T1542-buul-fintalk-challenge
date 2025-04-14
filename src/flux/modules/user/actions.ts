import { createAction } from "typesafe-actions";
import { User } from "./types";

export const setUser = createAction("SET_USER")<User>();
