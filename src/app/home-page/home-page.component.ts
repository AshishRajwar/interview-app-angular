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
  transaction!: transaction;
  userId: number | undefined;

  constructor(private apiMainService: ApiMainService) {}
  
  getTransaction(): void {
    this.apiMainService.getTransaction().subscribe(transactions => {
      this.transactions=transactions;
    });
  }

  getTransactionByID(): void {
    if (this.userId !== undefined) { 
      this.apiMainService.getTransactionById(this.userId).subscribe(transaction => {
        this.transaction=transaction;
      });
    }
  }

}
