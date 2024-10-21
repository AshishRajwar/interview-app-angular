import { Component } from '@angular/core';
import { transaction } from '../models/transaction.interface';
import { ApiMainService } from '../api-main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  transactions: transaction[] = [];
  transaction2: transaction = { id: 0, amount: 0, timestamp: '', transactionType: '', status: '', currency: ''};
  transaction: transaction = { id: 0, amount: 0, timestamp: '', transactionType: '', status: '', currency: ''};
  userId: number | undefined;
  newTransaction: transaction = { id: 0, amount: 0, timestamp: '', transactionType: '', status: '', currency: ''};

  constructor(private apiMainService: ApiMainService) {}
  
  getTransaction(): void {
    this.transactions = [];
    this.apiMainService.getTransaction().subscribe(transactions => {
      this.transactions=transactions;
    });
  }

  getTransactionByID(): void {
    this.transaction=this.transaction2;
    if (this.userId !== undefined) { 
      this.apiMainService.getTransactionById(this.userId).subscribe(transaction => {
        this.transaction=transaction;
      });
    }
  }

  createTransaction(transaction: transaction): void {
    this.apiMainService.createTransaction(transaction).subscribe(transaction => {
      console.log(transaction);
    });
  }

  onSubmit(): void {
    this.apiMainService.createTransaction(this.newTransaction).subscribe(
      response => {
        console.log('Transaction created:', response);  // Handle success
        // Optionally reset the form or show a success message
      },
      error => {
        console.error('Error creating transaction:', error);  // Handle error
      }
    );
  }

}
