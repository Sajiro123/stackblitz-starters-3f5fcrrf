import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ExpenseService } from './services/expense.service';
import { Expense, ValidatedExpenseForm } from './interfaces/expense.interface';
import { ExpenseCategory } from './components/tab-navigation/tab-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ExpenseFormComponent,
    ExpenseListComponent,
    TabNavigationComponent,
    ReportsComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>💰 Control de Gastos</h1>
        <p>Pescados y Mariscos</p>
      </header>

      <app-tab-navigation
        [activeTab]="currentView === 'reports' ? 'pescados' : activeTab"
        (tabChange)="onTabChange($event)"
      ></app-tab-navigation>

      <div class="view-toggle">
        <button 
          class="toggle-btn" 
          [class.active]="currentView === 'expenses'"
          (click)="currentView = 'expenses'">
          📝 Gastos
        </button>
        <button 
          class="toggle-btn" 
          [class.active]="currentView === 'reports'"
          (click)="currentView = 'reports'">
          📊 Reportes
        </button>
      </div>

      <main class="main-content">
        <div *ngIf="currentView === 'expenses'">
          <app-expense-form
          [tipoGasto]="activeTab"
          (expenseAdded)="onExpenseAdded($event)"
          ></app-expense-form>
          
          <app-expense-list
          [expenses]="getExpensesByType()"
          [tipoGasto]="activeTab"
          (deleteExpense)="onDeleteExpense($event)"
          ></app-expense-list>
        </div>
        
        <app-reports 
          *ngIf="currentView === 'reports'"
          [expenses]="expenses">
        </app-reports>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .app-header {
      text-align: center;
      padding: 30px 20px 20px;
      color: white;
    }

    .app-header h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .app-header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
      font-weight: 500;
    }

    .main-content {
      padding: 0 10px 30px;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .app-header {
        padding: 25px 15px 15px;
      }

      .app-header h1 {
        font-size: 24px;
      }

      .app-header p {
        font-size: 14px;
      }

      .view-toggle {
        margin: 10px 10px;
      }

      .toggle-btn {
        font-size: 13px;
      }

      .main-content {
        padding: 0 5px 20px;
      }
    }

    .view-toggle {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 15px auto;
      max-width: 300px;
      background: white;
      padding: 6px;
      border-radius: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .toggle-btn {
      flex: 1;
      padding: 12px 20px;
      border: none;
      border-radius: 20px;
      background: transparent;
      color: #666;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .toggle-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: scale(1.02);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .toggle-btn:hover:not(.active) {
      background: rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 480px) {
      .app-header {
        padding: 20px 10px 10px;
      }

      .app-header h1 {
        font-size: 22px;
      }

      .view-toggle {
        margin: 8px 5px;
      }

      .main-content {
        padding: 0 2px 15px;
      }
    }
  `]
})
export class App {
  activeTab: ExpenseCategory = 'pescados';
  currentView: 'expenses' | 'reports' = 'expenses';
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {
    this.expenseService.expenses$.subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  onTabChange(tab: ExpenseCategory) {
    this.activeTab = tab;
    this.currentView = 'expenses'; // Cambiar a vista de gastos al seleccionar categoría
  }

  onExpenseAdded(expenseForm: ValidatedExpenseForm) {
    debugger;
    this.expenseService.addExpense(expenseForm);
  }

  onDeleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }

  getExpensesByType(): Expense[] {
    return this.expenses.filter(expense => expense.tipoGasto === this.activeTab);
  }
}

bootstrapApplication(App);