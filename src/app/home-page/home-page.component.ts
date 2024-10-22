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
  errorMessage: string | null = null;
  constructor(private apiMainService: ApiMainService) {}
  
  getTransaction(): void {
    this.transactions = [];
    this.apiMainService.getTransaction().subscribe(
      transactions => {
        this.transactions=transactions;
      },
      (error) => {
        console.error('Error fetching the transaction:', error); 
        this.errorMessage = error; // Capture error from service
      }
    );
  }

  getTransactionByID(): void {
    this.errorMessage=null;
    this.transaction=this.transaction2;
    if (this.userId !== undefined) { 
      this.apiMainService.getTransactionById(this.userId).subscribe(
        (transaction) => {
          this.transaction=transaction;
        },
        (error) => {
          console.error('Error fetching the transaction:', error); 
          this.errorMessage = error; // Capture error from service
        }
      );
    }
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

  // Custom method to validate manually entered date-time
  isDateTimeValid(): boolean {
    const minDateTime = new Date('2023-01-01T00:00');
    const maxDateTime = new Date('2024-12-31T23:59');
    if (!this.newTransaction.timestamp) {
      return false;
    }
    // const enteredDateTime = new Date(this.transaction.timestamp);
    const parsedDateTime = this.parseDateTime(this.newTransaction.timestamp);
    if (parsedDateTime) {
      return parsedDateTime >= minDateTime && parsedDateTime <= maxDateTime;
    } else {
      return false;
    }
  }

  parseDateTime(dateTimeString: String): Date | null {
    try {
      console.log(dateTimeString);
      // Split the date and time components from the datetime-local string
      const [datePart, timePart] = dateTimeString.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
  
      // Create a new Date object from the parsed components
      return new Date(year, month - 1, day, hours, minutes);
    } catch (error) {
      // Return null if parsing fails
      console.error('Invalid date-time format', error);
      return null;
    }
  }
}
