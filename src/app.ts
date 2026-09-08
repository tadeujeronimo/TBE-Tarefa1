import express, { Request, Response, NextFunction } from "express";
import editalRoutes from "./routes/edital.routes";

const app = express();

app.use(express.json());

// GET / -> status simples da API
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use(editalRoutes);

// 404 para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

// Tratamento básico de erros
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor." });
});

export default app;
