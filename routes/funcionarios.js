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
    (req, res) => {
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

router.get(
    '/funcionariosGetById/:id',
    (req, res) => {
        var id = parseInt(req.params.id)
        connection.query(
            'select lastname, firstname from employees where employeeid = ?',[id],
            (error, results) => {
                if (error) throw error;
                res.send(results);
            })
    });

    router.post(
        '/funcionariosInsert',
        (req, res) => {
            var firstName = req.body.FirstName
            var lastName = req.body.LastName
            var notes = req.body.Notes
            connection.query(
                'insert into employees(LastName,FirstName,Notes) values(?,?,?)',
                [lastName,firstName,notes],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.patch(
        '/funcionariosUpdate/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            var firstName = req.body.FirstName
            var lastName = req.body.LastName
            var notes = req.body.Notes
            connection.query(
                'update employees set LastName = ?, FirstName = ?, Notes = ? where employeeId = ?',
                [lastName,firstName,notes,id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.delete(
        '/funcionariosDelete/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            connection.query(
                'delete from employees where employeeId = ?',
                [id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });


module.exports = router;