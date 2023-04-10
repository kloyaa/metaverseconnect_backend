const express = require("express");
const router = express.Router();

const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const { Profile } = require("./user.model");

router.post("/profile/create", jwtAuth, async (req, res) => {
    req.body.user = req.user._id;
    new Profile(req.body)
        .save()
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
