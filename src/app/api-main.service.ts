import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { transaction } from './models/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiMainService {
  private transactionUrl = 'http://localhost:8080/api/transactions'

  constructor(private http: HttpClient) { }

  getTransaction(): Observable<transaction[]> {
    return this.http.get<transaction[]>(this.transactionUrl)
  }

}
