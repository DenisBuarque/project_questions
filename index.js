const express = require("express");
const bodyParser = require("body-parser");
//Database
const connection = require("./database/connection");
// Test connection database
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao bando Mysql");
  })
  .catch((error) => {
    console.log(error);
  });
// Models
const Question = require("./models/Question");
const Response = require("./models/Response");

const app = express();

// files statics
app.use(express.static("public"));
// encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("Questions and response guide.");
});

app.get("/questions", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    console.log(questions);
  });
  res.send("Lista de perguntas e respostas:");
});

app.get("/question/:id", (req, res) => {
  const id = req.params.id;
  Question.findOne({ raw: true, where: { id: id } }).then((question) => {
    if (question !== undefined) {
      res.send("Questão encontrada!");
      Response.findAll({ raw: true, where: { questionId: question.id } }).then(
        (response) => console.log(question + " " + response)
      );

      console.log(question);
    } else {
      res.send("Questão não encontrada!");
    }
  });
});

app.post("/question/store", (req, res) => {
  const { title, description } = req.body;

  const data = {
    title,
    description,
  };

  Question.create(data).then(() => {
    res.send("Dados inseridos com sucesso!");
  });
});

app.post("/response/store", (req, res) => {
  const { body, questionId } = req.body;

  const data = {
    body,
    questionId,
  };

  Response.create(data).then(() => {
    res.send("Resposta inserida com sucesso!");
  });
});

// run server
app.listen(5000, () => {
  console.log("Server running at port 5000.");
});
