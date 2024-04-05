const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Guia de perguntas e respostas.');
})

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000.");
});