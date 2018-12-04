import { ReceiptType } from "./model.receiptType";
import { User } from "./model.user";

export class Receipt {
    id?: number;
    name?: string = '';
    type?: ReceiptType;
    value?: number;
    expireDate?: Date;
    ativo?: boolean;
    receiptDate?: Date;
    user?: User; 
  }
