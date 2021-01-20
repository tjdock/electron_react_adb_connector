import { IpcMainEvent } from 'electron';
import { IIpcRequest } from "./IIpcRequest";

export interface IIpcChannel {
  getName(): string;
  handle(event: IpcMainEvent, request: IIpcRequest): void;
}
