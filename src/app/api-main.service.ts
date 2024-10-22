import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { transaction } from './models/transaction.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiMainService {
  private transactionUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) { }

  getTransaction(): Observable<transaction[]> {
    return this.http.get<transaction[]>(this.transactionUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionById(id: number): Observable<transaction> {
    const transactionByIdUrl = `${this.transactionUrl}/${id}`;
    return this.http.get<transaction>(transactionByIdUrl).pipe(
      catchError(this.handleError)
    );
  }

  createTransaction(transaction: transaction): Observable<transaction> {
    return this.http.post<transaction>(this.transactionUrl, transaction).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    // You can log the error to the console or show it in a user-friendly way
    console.error(errorMessage);
    console.error(error);
    return throwError(errorMessage);
  }

}
