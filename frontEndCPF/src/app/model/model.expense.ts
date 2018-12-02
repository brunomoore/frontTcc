import { ExpenseType } from "./model.expenseType";

export class Expense {
    id: string;
    name: string = '';
    value: number;
    pay: Boolean;
    expenseDate: Date;
    type: ExpenseType;
    expireDate: Date;
    userId: number;
    parcela: number;
  }
