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
  Question.findAll({ raw: true }).then((questions) => {
    console.log(questions);
  });
  res.send("Lista de perguntas e respostas:");
});

app.post("/question/store", (req, res) => {
  const { title, description } = req.body;

  const data = {
    title,
    description,
  };

  Question.create(data).then(() => {
    res.send("Dados inseridos com sucesso!"); // or res.redirect('/');
  });
});

// run server
app.listen(5000, () => {
  console.log("Server running at port 5000.");
});
