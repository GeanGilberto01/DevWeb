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

/* GET login listing. */
router.get(
    '/loginGetAll',
    (req, res) => {
        connection.query(
            'SELECT idlogin, nome, sobrenome FROM login',
            (error, results, fields) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

module.exports = router;

router.get(
    '/loginGetById/:id',
    (req, res) => {
        var id = parseInt(req.params.id)
        connection.query(
            'SELECT idlogin, nome, sobrenome FROM login WHERE idlogin = ?',
            [id],
            (error, results) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

    router.post(
        '/loginInsert',
        (req, res) => {
            var login = req.body.Login
            var senha = req.body.Senha
            var nome = req.body.Nome
            var sobrenome = req.body.Sobrenome
            connection.query(
                'INSERT INTO login(login, senha, nome, sobrenome) values(?,?,?,?)',
                [login,senha,nome,sobrenome],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.patch(
        '/loginUpdate/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            var login = req.body.Login
            var senha = req.body.Senha
            var nome = req.body.Nome
            var sobrenome = req.body.Sobrenome
            connection.query(
                'UPDATE login set login = ?, senha = ?, nome = ?, sobrenome = ? WHERE idlogin = ?',
                [login,senha,nome,sobrenome,id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.delete(
        '/loginDelete/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            connection.query(
                'DELETE FROM login WHERE idlogin = ?',
                [id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send("DELETADO");
                })
        });

        router.post(
            '/realizarLogin',
            (req, res) => {
                var login = req.body.Login
                var senha = req.body.Senha
                connection.query(
                    'SELECT idlogin, nome, sobrenome FROM login WHERE login = ? AND senha = ?',
                    [login,senha],
                    (error, results) => {
                        if (error) res.send(error);
                        else {
                            if(results.length > 0) res.send("Ok");
                            else res.send("Login Invalido")
                        }
                    })
            });

module.exports = router;