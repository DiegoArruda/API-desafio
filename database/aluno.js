const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("Aluno", {
	nome: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	idade: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	notaPrimeiroSemestre: {
		type: DataTypes.FLOAT,
	},
	notaSegundoSemestre: {
		type: DataTypes.FLOAT,
	},
	nomeProfessor: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	numeroSala: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Aluno;
