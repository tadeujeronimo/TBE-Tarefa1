import { Request, Response } from "express";
import { StatusEdital } from "@prisma/client";
import { prisma } from "../prisma";

// GET /editais -> lista todos os editais
export async function listarEditais(_req: Request, res: Response) {
  const editais = await prisma.edital.findMany({
    orderBy: { dataAbertura: "desc" },
  });
  return res.json(editais);
}

// GET /editais/:id -> retorna um edital por id (404 se não existir)
export async function buscarEditalPorId(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "O id informado é inválido." });
  }

  const edital = await prisma.edital.findUnique({ where: { id } });

  if (!edital) {
    return res
      .status(404)
      .json({ error: `Edital com id ${id} não foi encontrado.` });
  }

  return res.json(edital);
}

// POST /editais -> cria um novo edital (opcional)
export async function criarEdital(req: Request, res: Response) {
  const {
    disciplina,
    descricao,
    professor,
    curso,
    vagas,
    dataAbertura,
    dataEncerramento,
    status,
    destaque,
  } = req.body;

  if (!disciplina || !descricao || !professor || !curso || !vagas || !dataAbertura || !dataEncerramento) {
    return res.status(400).json({
      error:
        "Campos obrigatórios: disciplina, descricao, professor, curso, vagas, dataAbertura, dataEncerramento.",
    });
  }

  const novoEdital = await prisma.edital.create({
    data: {
      disciplina,
      descricao,
      professor,
      curso,
      vagas: Number(vagas),
      dataAbertura: new Date(dataAbertura),
      dataEncerramento: new Date(dataEncerramento),
      status: status && status in StatusEdital ? status : StatusEdital.ABERTO,
      destaque: Boolean(destaque) || false,
    },
  });

  return res.status(201).json(novoEdital);
}

// PUT /editais/:id -> atualiza um edital existente (opcional)
export async function atualizarEdital(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "O id informado é inválido." });
  }

  const editalExistente = await prisma.edital.findUnique({ where: { id } });

  if (!editalExistente) {
    return res
      .status(404)
      .json({ error: `Edital com id ${id} não foi encontrado.` });
  }

  const {
    disciplina,
    descricao,
    professor,
    curso,
    vagas,
    dataAbertura,
    dataEncerramento,
    status,
    destaque,
  } = req.body;

  const editalAtualizado = await prisma.edital.update({
    where: { id },
    data: {
      disciplina,
      descricao,
      professor,
      curso,
      vagas: vagas !== undefined ? Number(vagas) : undefined,
      dataAbertura: dataAbertura ? new Date(dataAbertura) : undefined,
      dataEncerramento: dataEncerramento ? new Date(dataEncerramento) : undefined,
      status,
      destaque,
    },
  });

  return res.json(editalAtualizado);
}

// DELETE /editais/:id -> remove um edital (opcional)
export async function removerEdital(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "O id informado é inválido." });
  }

  const editalExistente = await prisma.edital.findUnique({ where: { id } });

  if (!editalExistente) {
    return res
      .status(404)
      .json({ error: `Edital com id ${id} não foi encontrado.` });
  }

  await prisma.edital.delete({ where: { id } });

  return res.status(204).send();
}
