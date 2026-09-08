import { PrismaClient, StatusEdital } from "@prisma/client";

const prisma = new PrismaClient();

// Dados baseados no mock de editais de monitoria usado na disciplina
// de Front-End (TFE-Tarefa4), adaptados para o catálogo de back-end.
const editais = [
  {
    disciplina: "Engenharia de Software",
    descricao:
      "Edital de monitoria da disciplina de Engenharia de Software, curso de Sistemas de Informação.",
    professor: "Frederico de Miranda Coelho",
    curso: "Sistemas de Informação",
    vagas: 2,
    dataAbertura: new Date("2026-06-01"),
    dataEncerramento: new Date("2026-06-15"),
    status: StatusEdital.ENCERRADO,
    destaque: false,
  },
  {
    disciplina: "Programação Web",
    descricao:
      "Edital de monitoria da disciplina de Programação Web, curso de Sistemas de Informação.",
    professor: "Silder Lamas Vecchi",
    curso: "Sistemas de Informação",
    vagas: 1,
    dataAbertura: new Date("2026-06-05"),
    dataEncerramento: new Date("2026-07-20"),
    status: StatusEdital.ABERTO,
    destaque: false,
  },
  {
    disciplina: "Banco de Dados",
    descricao:
      "Edital de monitoria da disciplina de Banco de Dados, curso de Análise e Desenvolvimento de Sistemas.",
    professor: "João Paulo Campolina Lamas",
    curso: "Análise e Desenvolvimento de Sistemas",
    vagas: 2,
    dataAbertura: new Date("2026-05-01"),
    dataEncerramento: new Date("2026-05-15"),
    status: StatusEdital.ENCERRADO,
    destaque: false,
  },
  {
    disciplina: "Inteligência Artificial",
    descricao:
      "Edital de monitoria da disciplina de Inteligência Artificial, curso de Sistemas de Informação.",
    professor: "Maurício Archanjo Nunes Coelho",
    curso: "Sistemas de Informação",
    vagas: 2,
    dataAbertura: new Date("2026-06-10"),
    dataEncerramento: new Date("2026-07-25"),
    status: StatusEdital.ABERTO,
    destaque: false,
  },
  {
    disciplina: "Machine Learning",
    descricao:
      "Edital de monitoria da disciplina de Machine Learning, curso de Ciência da Computação.",
    professor: "Lucas Grassano Lattari",
    curso: "Ciência da Computação",
    vagas: 1,
    dataAbertura: new Date("2026-06-08"),
    dataEncerramento: new Date("2026-07-22"),
    status: StatusEdital.ABERTO,
    destaque: true,
  },
  {
    disciplina: "Redes de Computadores",
    descricao:
      "Edital de monitoria da disciplina de Redes de Computadores, curso de Sistemas de Informação.",
    professor: "Bianca Portes de Castro",
    curso: "Sistemas de Informação",
    vagas: 2,
    dataAbertura: new Date("2026-04-01"),
    dataEncerramento: new Date("2026-04-15"),
    status: StatusEdital.ENCERRADO,
    destaque: false,
  },
];

async function main() {
  console.log("Iniciando seed do banco de dados...");

  await prisma.edital.deleteMany();

  for (const edital of editais) {
    await prisma.edital.create({ data: edital });
  }

  console.log(`Seed concluído: ${editais.length} editais inseridos.`);
}

main()
  .catch((err) => {
    console.error("Erro ao executar o seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
