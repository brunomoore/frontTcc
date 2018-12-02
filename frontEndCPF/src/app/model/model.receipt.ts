import { ReceiptType } from "./model.receiptType";

export class Receipt {
    id: string;
    name: string = '';
    type: ReceiptType
    value: number;
  }
