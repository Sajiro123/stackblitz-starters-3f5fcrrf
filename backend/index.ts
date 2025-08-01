import express, { Request, Response } from "express";
const { Pool } = require("pg"); // Usamos el cliente PostgreSQL
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración CORRECTA para Supabase
const pool = new Pool({
  user: "postgres", // Usuario correcto para Supabase
  password: "5834067Alex@",
  host: "db.pywmysglgyvrweysiwzp.supabase.co", // Host correcto
  port: 5432, // Puerto estándar de PostgreSQL
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000,
});

// Función mejorada para probar la conexión
async function testConnection() {
  let client;
  try {
    console.log("Intentando conectar a Supabase...");
    client = await pool.connect();
    const result = await client.query(
      "SELECT NOW() as current_time, current_database() as db"
    );
    console.log("✅ Conexión exitosa a PostgreSQL");
    console.log(`📅 Hora actual: ${result.rows[0].current_time}`);
    console.log(`🗄️ Base de datos: ${result.rows[0].db}`);
    return true;
  } catch (err: any) {
    console.error("❌ Error conectando a PostgreSQL:", err.message);
    console.error("Detalles del error:", err);
    return false;
  } finally {
    if (client) client.release();
  }
}

// Endpoint mejorado para consultas
app.post("/query", async (req: Request, res: Response) => {
  let client;
  try {
    const { sql, params = [] } = req.body;

    if (!sql) {
      return res.status(400).json({
        success: false,
        message: "Se requiere una consulta SQL en el cuerpo de la solicitud",
      });
    }

    client = await pool.connect();
    const result = await client.query(sql, params);

    return res.json({
      success: true,
      message: "Consulta ejecutada correctamente",
      data: result.rows,
      rowCount: result.rowCount,
    });
  } catch (err: any) {
    console.error("Error en la consulta:", err);
    return res.status(500).json({
      success: false,
      message: "Error en la consulta SQL",
      error: err.message,
      code: err.code,
    });
  } finally {
    if (client) client.release();
  }
});

// Endpoint de salud mejorado
app.get("/health", async (req, res) => {
  const dbStatus = await testConnection();
  res.json({
    status: "ok",
    db: dbStatus ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Iniciar el servidor con verificación de conexión
app.listen(port, async () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
  await testConnection();
});

// Manejo de errores mejorado
process.on("unhandledRejection", (err: Error) => {
  console.error("⚠️ Error no manejado:", err.message);
  console.error("Stack trace:", err.stack);
  process.exit(1);
});
