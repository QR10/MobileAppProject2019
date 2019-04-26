import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'

/*
  Generated class for the CurrencyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurrencyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CurrencyProvider Provider');
    this.getCurrencyData();
  }

  getCurrencyData():Observable<any>{
    return this.http.get('http://data.fixer.io/api/latest?access_key=a92c85a39edd29e893f9d85101250c89')
    .do(res => console.log(res));
  }

}
