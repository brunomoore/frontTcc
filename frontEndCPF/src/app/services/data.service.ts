import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() {}
  public criaVetorData(date: any): any {
    const dateArray = [];
    if (date instanceof Array) {
      return date;
    } else if (Object.prototype.toString.call(date) === '[object Date]') {
      dateArray.push(Number(date.getFullYear()));
      dateArray.push(Number(date.getMonth()) + 1);
      dateArray.push(Number(date.getDate()));
      dateArray.push(Number(date.getHours()));
      dateArray.push(Number(date.getMinutes()));
      dateArray.push(Number(date.getSeconds()));
      return dateArray;
    } else if (typeof date._i === 'string') {
        dateArray.push(Number(date._i.substring(6)));
        dateArray.push(Number(date._i.substring(3, 5)));
        dateArray.push(Number(date._i.substring(0, 2)));
        dateArray.push(Number('00'));
        dateArray.push(Number('00'));
        dateArray.push(Number('00'));
      } else {
        dateArray.push(Number(date._i.year));
        dateArray.push(Number(date._i.month) + 1);
        dateArray.push(Number(date._i.date));
        dateArray.push(Number('00'));
        dateArray.push(Number('00'));
        dateArray.push(Number('00'));
      }
      return dateArray;
    }

  public criaDataVetor(date: any): any {
    if (date) {
      return new Date(
        date[0], date[1] - 1, date[2]);
    }
    return null;
  }

  public StringfyDate(date: Date): string {
    const month = date.getMonth();
    switch (month) {
      case 0: {
        return date.getDay() + ' de janeiro de ' + date.getFullYear();
      }
      case 1: {
        return date.getDay() + ' de fevereiro de ' + date.getFullYear();
      }
      case 2: {
        return date.getDay() + ' de março de ' + date.getFullYear();
      }
      case 3: {
        return date.getDay() + ' de abril de ' + date.getFullYear();
      }
      case 4: {
        return date.getDay() + ' de maio de ' + date.getFullYear();
      }
      case 5: {
        return date.getDay() + ' de junho de ' + date.getFullYear();
      }
      case 6: {
        return date.getDay() + ' de julho de ' + date.getFullYear();
      }
      case 7: {
        return date.getDay() + ' de agosto de ' + date.getFullYear();
      }
      case 8: {
        return date.getDay() + ' de setembro de ' + date.getFullYear();
      }
      case 9: {
        return date.getDay() + ' de outubro de ' + date.getFullYear();
      }
      case 10: {
        return date.getDay() + ' de novembro de ' + date.getFullYear();
      }
      case 11: {
        return date.getDay() + ' de dezembro de ' + date.getFullYear();
      }
    }
    return 'Data de assinatura não encontrada.';
  }
}
