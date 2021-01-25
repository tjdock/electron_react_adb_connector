import { IpcMainEvent } from 'electron';
import { IIpcRequest, } from './shared/IIpcRequest';
import { IIpcResponse, } from './shared/IIpcResponse';
import { IIpcChannel } from './shared/IIpcChannel';
import { execSync } from "child_process";



export class LoginChannel implements IIpcChannel {
  getName(): string {
    return 'login';
  }

  handle(event: IpcMainEvent, request: IIpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    //event.sender.send(request.responseChannel, { kernel: execSync('node -v').toString() });
    let result: IIpcResponse = {
      success: true,
      data: execSync('node -v').toString()
    }
    console.log(result);
    event.sender.send(request.responseChannel, result);
  }
}