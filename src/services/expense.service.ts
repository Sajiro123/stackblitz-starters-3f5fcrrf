import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  
  expenses$ = this.expensesSubject.asObservable();

  constructor() {
    this.loadExpenses();
  }

  addExpense(expense: Omit<Expense, 'id' | 'fecha'>): void {
    debugger;
    const newExpense: Expense = {
      ...expense,
      id: this.generateId(),
      fecha: new Date()
    };
    
    this.expenses.push(newExpense);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  getExpensesByType(tipo: 'pescados' | 'mariscos'): Expense[] {
    return this.expenses.filter(expense => expense.tipoGasto === tipo);
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveExpenses(): void {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  private loadExpenses(): void {
    const stored = localStorage.getItem('expenses');
    if (stored) {
      this.expenses = JSON.parse(stored);
      this.expensesSubject.next([...this.expenses]);
    }
  }
}