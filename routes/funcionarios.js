var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'northwind'
});

connection.connect();

/* GET funcionarios listing. */
router.get(
    '/funcionariosGetAll',
    (req, res, next) => {
        connection.query(
            'select lastname, firstname from employees limit 10',
            (error, results, fields) => {
                if (error) throw error;
                var resultado = {};
                resultado.titulo = 'OS 10 PRIMEIROS REGISTROS DA TABELA EMPLOYEES:';
                resultado.nome = results;
                res.send(resultado);
            })
    });

module.exports = router;
