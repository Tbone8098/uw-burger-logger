const express = require('express');
const router = express.Router();

var burger = require("../models/burgers")

router.get('/', (req, res) => {
    burger.all(function (data) {
        var obj = {
            burger: data
        }
        res.render("index", obj)
    })
})

router.post("/api/burgers", function (req, res) {
    burger.create(['content', 'devoured'], [req.body.content, JSON.parse(req.body.devoured)], function (resp) {
        res.json(resp);
    })
})

router.put("/api/burgers/:id", function (req, res) {
    console.log(req.body);

    let condition = `id = ${req.params.id}`

    burger.update({
        devoured: req.body.devoured
    }, condition, (resp) => {
        console.log(resp);
        if (resp.changedRows == 0) {
            return res.status(404);
        } else {
            res.status(200)
        }
    })
})

module.exports = router;