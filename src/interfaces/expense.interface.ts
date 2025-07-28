export interface Expense {
  id?: string;
  precio: number;
  descripcion: string;
  notas?: string;
  tipoGasto: 'pescados' | 'mariscos' | 'abarrotes' | 'verduras' | 'carnes' | 'lacteos' | 'bebidas' | 'panaderia' | 'limpieza' | 'otros';
  fecha: Date;
}

export interface ExpenseForm {
  precio: number | null;
  descripcion: string;
  notas: string;
  tipoGasto: 'pescados' | 'mariscos' | 'abarrotes' | 'verduras' | 'carnes' | 'lacteos' | 'bebidas' | 'panaderia' | 'limpieza' | 'otros';
  fecha: Date;
}

export interface ValidatedExpenseForm {
  precio: number;
  descripcion: string;
  notas: string;
  tipoGasto: 'pescados' | 'mariscos' | 'abarrotes' | 'verduras' | 'carnes' | 'lacteos' | 'bebidas' | 'panaderia' | 'limpieza' | 'otros';
  fecha: Date;
}