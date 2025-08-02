import { Injectable } from "@angular/core";
import { Expense } from "../interfaces/expense.interface";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http"; // Importa HttpClient
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private apiUrl = "http://localhost:3000/post";

  // expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadExpenses();
  }

  ListarGastosHoy() {
    const query = `SELECT * FROM "GastosCompras" WHERE fecha=CURRENT_DATE AND deleted IS null;`;
    return this.http.post<any>(this.apiUrl, { query });
  }

  addExpense(expense: Omit<Expense, "id" | "fecha">): void {
    debugger;
    const newExpense: Expense = {
      ...expense,
      id: this.generateId(),
      fecha: new Date(),
    };

    this.expenses.push(newExpense);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  insertGasto(Expense: Expense): Observable<any> {
    debugger;
    const fechaOriginal = new Date(Expense.fecha);
    // Luego formatea a ISO string (PostgreSQL lo entenderá automáticamente)
    const fechaParaPostgres = fechaOriginal.toISOString();

    const insertQuery = `
      INSERT INTO "GastosCompras" (
        created_at,
        descripcion,
        precio,
        tipo,
        notas,
        fecha
      ) VALUES (
        CURRENT_TIMESTAMP,
        '${Expense.descripcion}',
        ${Expense.precio},
        '${Expense.tipo}',
        '${Expense.notas}',
        '${fechaParaPostgres}'
      );
    `;

    return this.http.post(this.apiUrl, { query: insertQuery });
  }

  getExpensesByType(tipo: "pescados" | "mariscos"): Expense[] {
    return this.expenses.filter((expense) => expense.tipo === tipo);
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private saveExpenses(): void {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  private loadExpenses(): void {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      this.expenses = JSON.parse(stored);
      this.expensesSubject.next([...this.expenses]);
    }
  }
}
