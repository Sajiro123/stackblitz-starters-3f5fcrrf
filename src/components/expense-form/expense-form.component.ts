import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  ExpenseForm,
  ValidatedExpenseForm,
} from "../../interfaces/expense.interface";
import {
  ExpenseCategory,
  CategoryConfig,
  TabNavigationComponent,
} from "../tab-navigation/tab-navigation.component";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "app-expense-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./expense-form.component.html",
  styleUrls: ["./expense-form.component.css"],
})
export class ExpenseFormComponent {
  @ViewChild(TabNavigationComponent) tabNavigation?: TabNavigationComponent;
  // @Output() expenseAdded = new EventEmitter<ValidatedExpenseForm>();

  @Input() tipoGasto: ExpenseCategory = "pescados";
  @Output() expenseAdded = new EventEmitter<ValidatedExpenseForm>();
  static categoria: any;

  constructor(private service: ExpenseService) {
    this.form.tipo = this.tipoGasto;
    this.form.fecha = this.getFechaPeru();
  }

  form: ExpenseForm = {
    precio: null,
    descripcion: "",
    notas: "",
    tipo: "pescados",
    fecha: new Date(),
  };

  // Store the date as a string for the date input
  get dateString(): string {
    return this.form.fecha
      ? this.form.fecha.toISOString().substring(0, 10)
      : "";
  }

  set dateString(value: string) {
    this.form.fecha = value ? this.getFechaPeru() : this.getFechaPeru();
  }

  categories: CategoryConfig[] = [
    { id: "pescados", label: "Pescados", icon: "", color: "#4facfe" },
    { id: "mariscos", label: "Mariscos", icon: "", color: "#fa709a" },
    { id: "abarrotes", label: "Abarrotes", icon: "", color: "#ff9a56" },
    { id: "verduras", label: "Verduras", icon: "", color: "#4ecdc4" },
    { id: "carnes", label: "Carnes", icon: "", color: "#ff6b6b" },
    { id: "lacteos", label: "Lácteos", icon: "", color: "#74b9ff" },
    { id: "bebidas", label: "Bebidas", icon: "", color: "#a29bfe" },
    { id: "panaderia", label: "Panadería", icon: "", color: "#fdcb6e" },
    { id: "limpieza", label: "Limpieza", icon: "", color: "#6c5ce7" },
    { id: "otros", label: "Otros", icon: "", color: "#636e72" },
    { id: "verduras", label: "Verduras", icon: "🥬", color: "#4ecdc4" },
    { id: "carnes", label: "Carnes", icon: "🥩", color: "#ff6b6b" },
    { id: "lacteos", label: "Lácteos", icon: "🥛", color: "#74b9ff" },
    { id: "bebidas", label: "Bebidas", icon: "🥤", color: "#a29bfe" },
    { id: "panaderia", label: "Panadería", icon: "🍞", color: "#fdcb6e" },
    { id: "limpieza", label: "Limpieza", icon: "🧽", color: "#6c5ce7" },
    { id: "otros", label: "Otros", icon: "📦", color: "#636e72" },
  ];

  ngOnInit() {
    debugger;
    this.form.tipo = this.tipoGasto;
    this.form.fecha = this.getFechaPeru();
  }

  getFechaPeru(): Date {
    const ahora = new Date();
    const offsetPeru = -5; // Perú está en UTC-5
    const horaPeru = ahora.getTime() + offsetPeru * 60 * 60 * 1000;
    return new Date(horaPeru);
  }

  onSubmit() {
    debugger;
    if (this.isFormValid()) {
      this.service
        .insertGasto({
          ...this.form,
          precio: this.form.precio!,
          fecha: this.form.fecha,
          tipo: ExpenseFormComponent.categoria,
        })
        .subscribe({
          next: (response) => {
            console.log("Gasto insertado correctamente", response);
            alert("✅ Gasto registrado exitosamente");
            this.resetForm();
          },
          error: (error) => {
            console.error("Error al insertar gasto:", error);
            alert(
              "❌ Error al registrar el gasto. Por favor, intente nuevamente."
            );
          },
        });
      this.resetForm();
    } else {
      alert("⚠️ Por favor complete todos los campos requeridos correctamente");
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.form.precio &&
      this.form.precio > 0 &&
      this.form.descripcion.trim()
    );
  }

  private resetForm() {
    this.form = {
      precio: null,
      descripcion: "",
      notas: "",
      tipo: this.tipoGasto,
      fecha: this.getFechaPeru(),
    };
  }

  getCategoryConfig(): CategoryConfig {
    return (
      this.categories.find((cat) => cat.id === this.tipoGasto) ||
      this.categories[0]
    );
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
