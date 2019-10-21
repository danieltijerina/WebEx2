const express = require('express');
const met = require("./met");

const app = express();
const port = process.env.PORT || 3000;

app.get('/students/:id', function (req, res) {
    const mat = req.params.id;
    if (mat == 1281870) {
        res.send({
            id: mat,
            fullname: "Daniel Tijerina",
            nickname: "Tije",
            age: 22
        });
    } else {
        res.send({
            error: "Unknown id"
        });
    }
});

app.get('/met', function (req, res) {
    q = req.query.search;
    console.log(q);
    met.getQ(q, function (error, response) {
        console.log(response);
        if (error) {
            return res.send(error);
        } else {
            met.getObject(response.objectIDs[0], function (err, output) {
                if (err) {
                    return res.send(err);
                } else {
                    output["searchTerm"] = req.query.search;
                    return res.send(output);
                }
            });
        }
    });

});

app.get('*', function (req, res) {
    res.send({
        error: 'Ruta no valida'
    });
});

app.listen(port, function () {
    console.log('Up and running!');
});