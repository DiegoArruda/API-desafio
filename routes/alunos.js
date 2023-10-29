const { Router } = require("express");
const { Op, where } = require("sequelize");
const Aluno = require("../database/aluno");

const router = Router();

//Adicionar um novo aluno
router.post("/alunos", async (req, res) => {
	const {
		nome,
		idade,
		notaPrimeiroSemestre,
		notaSegundoSemestre,
		nomeProfessor,
		numeroSala,
	} = req.body;
	try {
		const aluno = await Aluno.create({
			nome,
			idade,
			notaPrimeiroSemestre,
			notaSegundoSemestre,
			nomeProfessor,
			numeroSala,
		});
		res.status(201).json(aluno);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Lista de alunos
router.get("/alunos", async (req, res) => {
	try {
		const listaAlunos = await Aluno.findAll();
		res.json(listaAlunos);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Procura de alunos
router.get("/alunos/:id", async (req, res) => {
	const aluno = await Aluno.findOne({
		where: { id: req.params.id },
	});

	try {
		if (aluno) {
			res.json(aluno);
		} else res.status(404).json({ message: "Aluno não encontrado" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Atualizar aluno
router.put("/alunos/:id", async (req, res) => {
	const {
		nome,
		idade,
		notaPrimeiroSemestre,
		notaSegundoSemestre,
		nomeProfessor,
		numeroSala,
	} = req.body;

	const aluno = await Aluno.findByPk(req.params.id);

	try {
		if (aluno) {
			await Aluno.update(
				{
					nome,
					idade,
					notaPrimeiroSemestre,
					notaSegundoSemestre,
					nomeProfessor,
					numeroSala,
				},
				{ where: { id: req.params.id } }
			);
			res.json({ message: "Informações do aluno atualizadas com sucesso." });
		} else res.status(404).json({ message: "Aluno não encontrado" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Excluir aluno
router.delete("/alunos/:id", async (req, res) => {
	const aluno = await Aluno.findByPk(req.params.id);

	try {
		if (aluno) {
			await aluno.destroy();
			res.json({ message: "O aluno foi excluído do banco de dados" });
		} else res.status(404).json({ message: "Aluno não encontrado" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
