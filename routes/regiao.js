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

/* GET regioes listing. */
router.get(
    '/regioesGetAll',
    (req, res) => {
        connection.query(
            'SELECT RegionID,RegionDescription FROM region',
            (error, results, fields) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

module.exports = router;

router.get(
    '/regioesGetById/:id',
    (req, res) => {
        var id = parseInt(req.params.id)
        connection.query(
            'SELECT RegionID,RegionDescription FROM region WHERE RegionID = ?',[id],
            (error, results) => {
                if (error) res.send(error);
                else res.send(results);
            })
    });

    router.post(
        '/regioesInsert',
        (req, res) => {
            var regionDescription = req.body.RegionDescription
            connection.query(
                'INSERT INTO region(RegionDescription) values(?)',
                [regionDescription],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.patch(
        '/regioesUpdate/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            var regionDescription = req.body.RegionDescription
            connection.query(
                'UPDATE region set RegionDescription = ? WHERE RegionID = ?',
                [regionDescription,id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });
        
    router.delete(
        '/regioesDelete/:id',
        (req, res) => {
            var id = parseInt(req.params.id)
            connection.query(
                'DELETE FROM region WHERE RegionID = ?',
                [id],
                (error, results) => {
                    if (error) res.send(error);
                    else res.send(results);
                })
        });


module.exports = router;