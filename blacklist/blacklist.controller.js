const express = require("express");
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const router = express.Router();
const Blacklist = require("./blacklist.model");

router.post("/blacklist/create", jwtAuth, async (req, res) => {
    return new Blacklist(req.body)
            .save()
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).json(err));
});

router.get("/blacklist/all", jwtAuth, async (req, res) => {
    return await Blacklist.find({})
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).json(err));
});

router.delete("/blacklist/:id", jwtAuth, async (req, res) => {
    return await Blacklist.deleteOne({
        address: req.params.id
    })
    .then((value) => res.status(200).json(value))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
