import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Aquí irán tus rutas

app.listen(PORT, async () => {
  try {
    await createConnection();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
});