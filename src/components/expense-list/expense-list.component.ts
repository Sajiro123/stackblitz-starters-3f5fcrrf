import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../interfaces/expense.interface';
import { ExpenseCategory, CategoryConfig } from '../tab-navigation/tab-navigation.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Input() tipoGasto: ExpenseCategory = 'pescados';
  @Output() deleteExpense = new EventEmitter<string>();

  categories: CategoryConfig[] = [
    { id: 'pescados', label: 'Pescados', icon: '🐟', color: '#4facfe' },
    { id: 'mariscos', label: 'Mariscos', icon: '🦐', color: '#fa709a' },
    { id: 'abarrotes', label: 'Abarrotes', icon: '🛒', color: '#ff9a56' },
    { id: 'verduras', label: 'Verduras', icon: '🥬', color: '#4ecdc4' },
    { id: 'carnes', label: 'Carnes', icon: '🥩', color: '#ff6b6b' },
    { id: 'lacteos', label: 'Lácteos', icon: '🥛', color: '#74b9ff' },
    { id: 'bebidas', label: 'Bebidas', icon: '🥤', color: '#a29bfe' },
    { id: 'panaderia', label: 'Panadería', icon: '🍞', color: '#fdcb6e' },
    { id: 'limpieza', label: 'Limpieza', icon: '🧽', color: '#6c5ce7' },
    { id: 'otros', label: 'Otros', icon: '📦', color: '#636e72' }
  ];

  onDelete(id: string | undefined) {
    if (id) {
      this.deleteExpense.emit(id);
    }
  }

  get totalAmount(): number {
    return this.expenses.reduce((total, expense) => total + expense.precio, 0);
  }

  getCategoryConfig(): CategoryConfig {
    return this.categories.find(cat => cat.id === this.tipoGasto) || this.categories[0];
  }

  get titleText(): string {
    const config = this.getCategoryConfig();
    return `Gastos en ${config.label}`;
  }

  get categoryIcon(): string {
    return this.getCategoryConfig().icon;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  trackByFn(index: number, expense: Expense): string {
    return expense.id || index.toString();
  }
}