//Vai disponibilizar o uso de variáveis de ambiente
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const swaggerui = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

//Configuração do App
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON
app.use(morgan("tiny"));

//Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection);

//Definição de rotas
const rotaAlunos = require("./routes/alunos");

//Juntar ao app as rotas
app.use(rotaAlunos);

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs));

app.listen(3000, () => {
	// Gerar as tabelas a partir do model
	//Force = apaga tudo e recria as tabelas
	connection.sync();
	console.log("http://localhost:3000/api-docs");
});
