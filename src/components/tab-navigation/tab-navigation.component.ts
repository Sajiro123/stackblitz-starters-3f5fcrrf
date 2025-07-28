import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ExpenseCategory = 'pescados' | 'mariscos' | 'abarrotes' | 'verduras' | 'carnes' | 'lacteos' | 'bebidas' | 'panaderia' | 'limpieza' | 'otros';

export interface CategoryConfig {
  id: ExpenseCategory;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.css']
})
export class TabNavigationComponent {
  @Input() activeTab: ExpenseCategory = 'pescados';
  @Output() tabChange = new EventEmitter<ExpenseCategory>();

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

  onTabClick(tab: ExpenseCategory) {
    this.tabChange.emit(tab);
  }

  getCategoryConfig(categoryId: ExpenseCategory): CategoryConfig {
    return this.categories.find(cat => cat.id === categoryId) || this.categories[0];
  }

  getCategoryColor(categoryId: ExpenseCategory): string {
    const config = this.getCategoryConfig(categoryId);
    return config.color;
  }
}