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

/* GET categorias listing. */
router.get(
    '/categoriasGetAll',
    (req, res) => {
        connection.query(
            'SELECT CategoryID, CategoryName, Description FROM categories',
            (error, results, fields) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

module.exports = router;

router.get(
    '/categoriasGetById/:id',
    (req, res) => {
        var id = parseInt(req.params.id)
        connection.query(
            'SELECT CategoryID, CategoryName, Description FROM categories WHERE CategoryID = ?',
            [id],
            (error, results) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

    router.post(
        '/categoriasInsert',
        (req, res) => {
            var categoryName = req.body.CategoryName
            var description = req.body.Description
            connection.query(
                'INSERT INTO categories(CategoryName, Description) values(?,?)',
                [categoryName,description],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.patch(
        '/categoriasUpdate/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            var categoryName = req.body.CategoryName
            var description = req.body.Description
            connection.query(
                'UPDATE categories set CategoryName = ?, Description = ? WHERE CategoryID = ?',
                [categoryName,description,id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.delete(
        '/categoriasDelete/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            connection.query(
                'DELETE FROM categories WHERE CategoryID = ?',
                [id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });


module.exports = router;