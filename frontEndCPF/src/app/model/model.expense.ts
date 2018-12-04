import { ExpenseType } from "./model.expenseType";
import { User } from "./model.user";

export class Expense {
    id?: number;
    name?: string = '';
    value?: number;
    pay?: boolean;
    ativo?:boolean;
    expenseDate?: Date;
    type?: ExpenseType;
    expireDate?: Date;
    user?: User;
    parcela?: number;
  }
