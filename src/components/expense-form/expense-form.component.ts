import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseForm, ValidatedExpenseForm } from '../../interfaces/expense.interface';
import { ExpenseCategory, CategoryConfig } from '../tab-navigation/tab-navigation.component';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  @Input() tipoGasto: ExpenseCategory = 'pescados';
  @Output() expenseAdded = new EventEmitter<ValidatedExpenseForm>();

  form: ExpenseForm = {
    precio: null,
    descripcion: '',
    notas: '',
    tipoGasto: 'pescados',
    fecha: new Date()
  };

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

  ngOnInit() {
    this.form.tipoGasto = this.tipoGasto;
    this.form.fecha = new Date();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.expenseAdded.emit({ 
        ...this.form,
        precio: this.form.precio!,
        fecha: this.form.fecha
      });
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.form.precio && this.form.precio > 0 && this.form.descripcion.trim());
  }

  private resetForm() {
    this.form = {
      precio: null,
      descripcion: '',
      notas: '',
      tipoGasto: this.tipoGasto,
      fecha: new Date()
    };
  }

  getCategoryConfig(): CategoryConfig {
    return this.categories.find(cat => cat.id === this.tipoGasto) || this.categories[0];
  }

  get titleText(): string {
    const config = this.getCategoryConfig();
    return `Registrar Gasto - ${config.label}`;
  }

  get categoryIcon(): string {
    const config = this.getCategoryConfig();
    return config.icon;
  }

  get categoryColor(): string {
    const config = this.getCategoryConfig();
    return config.color;
  }
}