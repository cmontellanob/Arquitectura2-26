var VerifyToken= require('./VerifyToken');
var dbConnection = require('../../config/dbConnection').pool;
var logger = require('../../config/log');
var dateFormat = require('dateformat');


module.exports = app => {
    app.use(function (item, req, res, next) {
        console.log(item);
        res.status(200).send(item);
    });
    //cloudinary.config(secrets.cloudinary);
    /* GET items listing. */
    app.get('/api/v1/items',VerifyToken,  (req, res) => {
        logger.info("GET: /api/v1/items");
        console.log("GET: /api/v1/items");
        var sql = "";
        sql = "SELECT id,categoryid,userid,name,description,price,photo,	publicationdate,	state	 FROM item ";
        dbConnection.getConnection(function (err, connection) {
            if (err) 
                {
                     res.json({ error: err }) 
                }
                
            connection.query(sql, (err, result) => {
                res.json(result);
                console.log("Query items by " + req.userId);
                logger.info("Query items by " + req.userId);
            });
            connection.release();
        });
    });
    /* GET a item. */
    app.get('/api/v1/items/:id', VerifyToken, (req, res) => {
        logger.info("GET: /api/v1/items/:id");
        var fields = "*";
        if (typeof req.query.fields != 'undefined') {
            fields = req.query.fields;
        }
        var sql = "SELECT " + fields + " FROM item WHERE id=" + req.params.id + ";";
        console.log(sql);
        dbConnection.getConnection(function (err, connection) {
            connection.query(sql,(err , result) => {
                res.json(result);
                console.log("Query items by " + req.userId);
                logger.info("Query items by " + req.userId);
            });
            connection.release();
        }); 
    });
    /* POST item creating. */
    app.post('/api/v1/items', VerifyToken, (req, res) => {
        var publicationDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const body = req.body;
        console.log(req.body);
        var sql = "";
        sql = "INSERT INTO item (categoryid, userid, name, description, price, publicationdate) VALUES (" +
            body.categoryid + ", '" + req.userId + "', '" + body.name + "', '" + body.description +
            "', " + body.price + ", '" + publicationDate + "');";
        console.log(sql);
        dbConnection.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    res.json({ error: err })
                };
                console.log("Item created without photo by " + req.userId);
                logger.info("Item created without photo by " + req.userId);
                
            });
            res.end();           
            connection.release();
        });
    });
    /* PUT item updating. */
    app.put('/api/v1/items/:id',VerifyToken ,  (req, res) => {
        logger.info("PUT: /api/v1/items/:id");
        const body = req.body;
        var sql = "UPDATE item SET categoryid=" + body.categoryid + ", name='" + body.name +
            "', description='" + body.description + "', price=" + body.price + ", photo='" + body.photo +
            "' WHERE id=" + req.params.id + ";";
        console.log(sql);
        dbConnection.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    res.json({ error: err })
                };
                console.log("Item updated by " + req.userId);
                logger.info("Item updated by " + req.userId);
            });
            res.end();
            connection.release();
        });
    });
    /* DELETE item. */
    app.delete('/api/v1/items/:id',VerifyToken,  (req, res) => {
        logger.info("DELETE: /api/v1/items/:id");
        const body = req.body;
        var sql = "DELETE FROM  item WHERE id=" + req.params.id + ";";
        console.log(sql);
        dbConnection.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    res.json({ error: err })
                };
                logger.info("Item deleted by " + req.userId);
                console.log("Item deleted by " + req.userId);
            });
            res.end();
            connection.release();
        });
    });
    /* PATCH item. */
    app.patch('/api/v1/items/',VerifyToken , (req, res) => {
        logger.info("PATCH: /api/v1/items/");
        const body = req.body;
        var sqlCheckItem = "SELECT userid, state FROM dbtantakatu.item WHERE id = " + body.itemId + ";"
        var itemUserId = "";
        var itemState = -1;
        dbConnection.getConnection(function (err, connection) {
            connection.query(sqlCheckItem, function (err, result) {
                if (err) {
                    res.json({ error: err })
                };
                console.log(result);
                itemUserId = result[0].userid;
                itemState = result[0].state;
                console.log("Item user id " + itemUserId);
                console.log("Buyer user id " + req.userId);
                if (itemUserId == req.userId) {
                    console.log("Buyer and Seller are the same");
                    res.end();
                    connection.release();
                }
                else if (itemState == 0) {
                    console.log("Item is already sold !");
                    res.end();
                    connection.release();
                }
                else {
                    var sqlPurchase = "INSERT INTO purchase (ItemId, UserId, purchaseDate) VALUES (" + body.itemId + ", '" + req.userId + "', NOW());";
                    console.log(sqlPurchase);
                    var sqlUpdateItem = "UPDATE item SET state = 0 WHERE id = " + body.itemId + ";";
                    console.log(sqlUpdateItem);
                    dbConnection.getConnection(function (err, connection) {
                        connection.query(sqlPurchase, function (err, result) {
                            if (err) {
                                res.json({ error: err })
                            };
                            console.log("purchase performed");
                            logger.info("purchase performed");
                        });
                        connection.query(sqlUpdateItem, function (err, result) {
                            if (err) {
                                res.json({ error: err })
                            };
                            console.log("purchase performed");
                            logger.info("purchase performed");
                        });
                        res.end();
                        connection.release();
                    });
                };
            });
        });
        logger.info("End purchase perform");
    });
};