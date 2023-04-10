const express = require("express");
const router = express.Router();

const { ExternalWallet, InternalWallet } = require("../wallet/wallet.model");
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const { Profile } = require("./user.model");

router.get("/me/wallet/all", jwtAuth, async (req, res) => {
    const [internal, external] = await Promise.all([
        InternalWallet.find({ user: req.user._id }),
        ExternalWallet.find({ user: req.user._id }),
    ]);
    return res.status(200).json({ internal, external });
});

router.get("/me", jwtAuth, async (req, res) => {
    return  Profile.findOne({ user: req.user._id })
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err));
});


module.exports = router;
