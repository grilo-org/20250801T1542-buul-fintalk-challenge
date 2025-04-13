import { GenericError } from "./errors";

export enum RequestStatus {
  idle = "IDLE",
  fetching = "FETCHING",
  success = "SUCCESS",
  error = "ERROR",
}

export interface IRequest<Interface> {
  data: Interface | null;
  error?: GenericError | null;
  message?: string | null;
  status: RequestStatus;
}
