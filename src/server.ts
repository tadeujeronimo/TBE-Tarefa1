import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(PORT, () => {
  console.log(`API do Catálogo de Editais rodando em http://localhost:${PORT}`);
});
