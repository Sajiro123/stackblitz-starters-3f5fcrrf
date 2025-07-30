import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Expense } from "../../interfaces/expense.interface";
import {
  ExpenseCategory,
  CategoryConfig,
} from "../tab-navigation/tab-navigation.component";

interface CategorySummary {
  category: ExpenseCategory;
  config: CategoryConfig;
  total: number;
  count: number;
  expenses: Expense[];
}

interface DateSummary {
  date: string;
  total: number;
  count: number;
  expenses: Expense[];
}

interface DateSummary {
  date: string;
  total: number;
  count: number;
  expenses: Expense[];
}
@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent {
  @Input() expenses: Expense[] = [];

  categories: CategoryConfig[] = [
    { id: "pescados", label: "Pescados", icon: "🐟", color: "#4facfe" },
    { id: "mariscos", label: "Mariscos", icon: "🦐", color: "#fa709a" },
    { id: "abarrotes", label: "Abarrotes", icon: "🛒", color: "#ff9a56" },
    { id: "verduras", label: "Verduras", icon: "🥬", color: "#4ecdc4" },
    { id: "carnes", label: "Carnes", icon: "🥩", color: "#ff6b6b" },
    { id: "lacteos", label: "Lácteos", icon: "🥛", color: "#74b9ff" },
    { id: "bebidas", label: "Bebidas", icon: "🥤", color: "#a29bfe" },
    { id: "panaderia", label: "Panadería", icon: "🍞", color: "#fdcb6e" },
    { id: "limpieza", label: "Limpieza", icon: "🧽", color: "#6c5ce7" },
    { id: "otros", label: "Otros", icon: "📦", color: "#636e72" },
  ];

  get totalAmount(): number {
    return this.expenses.reduce((total, expense) => total + expense.precio, 0);
  }

  get totalExpenses(): number {
    return this.expenses.length;
  }

  // Add this method to your ReportsComponent class
  getCategoryIcon(tipoGasto: string): string {
    // Replace this mapping with your actual category-icon mapping logic
    const categoryMap: { [key: string]: string } = {
      alimentacion: "🍔",
      transporte: "🚌",
      salud: "💊",
      entretenimiento: "🎬",
      otros: "💡",
    };
    return categoryMap[tipoGasto] || "❓";
  }

  get categorySummaries(): CategorySummary[] {
    const summaries: CategorySummary[] = [];

    this.categories.forEach((category) => {
      const categoryExpenses = this.expenses.filter(
        (expense) => expense.tipoGasto === category.id
      );
      if (categoryExpenses.length > 0) {
        summaries.push({
          category: category.id,
          config: category,
          total: categoryExpenses.reduce(
            (sum, expense) => sum + expense.precio,
            0
          ),
          count: categoryExpenses.length,
          expenses: categoryExpenses,
        });
      }
    });

    return summaries.sort((a, b) => b.total - a.total);
  }

  get dateSummaries(): DateSummary[] {
    
    const dateMap = new Map<string, Expense[]>();

    this.expenses.forEach((expense) => {
      const dateKey = new Date(expense.fecha).toLocaleDateString("es-PE");
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }
      dateMap.get(dateKey)!.push(expense);
    });

    const summaries: DateSummary[] = [];
    dateMap.forEach((expenses, date) => {
      summaries.push({
        date,
        total: expenses.reduce((sum, expense) => sum + expense.precio, 0),
        count: expenses.length,
        expenses,
      });
    });

    return summaries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  getPercentage(amount: number): number {
    return this.totalAmount > 0 ? (amount / this.totalAmount) * 100 : 0;
  }
}
