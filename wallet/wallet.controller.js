const express = require("express");
const { httpMessage } = require("../_core/const/http-messages.const");
const router = express.Router();
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const { getWalletType } = require("../_core/utils/wallet.util");
const { ExternalWallet, InternalWallet } = require("./wallet.model");

router.get("/wallet/all", jwtAuth, async (req, res) => {
    const [internal, external] = await Promise.all([
        InternalWallet.find({ user: req.user._id }),
        ExternalWallet.find({ user: req.user._id }),
    ]);
    return res.status(200).json({ internal, external });
});

router.get("/wallet/validate/address", jwtAuth, async (req, res) => {
    try {
        const value = req.query.value.trim();
        const type = await getWalletType(value);
        return res.status(200).json({ type });
    } catch (error) {
        return res
            .status(403)
            .json(httpMessage[10204]);
    }
});

router.get("/wallet/validate/seedphrase", jwtAuth, async (req, res) => {
    return res.status(200).json({ message: "OK" });
});

router.post("/wallet/internal", jwtAuth, async (req, res) => {
    new InternalWallet(req.body)
        .save()
        .then((value) => {
            return res.status(200).json(value);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

router.post("/wallet/external", jwtAuth, async (req, res) => {
    req.body.type = await getWalletType(req.body.address);
    req.body.user = req.user._id;
    new ExternalWallet(req.body)
        .save()
        .then((value) => {
            return res.status(200).json(value);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

module.exports = router;
