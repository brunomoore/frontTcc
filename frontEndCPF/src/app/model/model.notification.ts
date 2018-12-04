import { User } from "./model.user";

export class Notification {
    id?: number;
    name?: string = '';
    param?: string = '';
    description?: string = '';
    tipo?: number;
    ativo?: Boolean;
    user?: User;
  }
