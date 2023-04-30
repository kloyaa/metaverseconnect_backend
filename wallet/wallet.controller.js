const express = require("express");
const router = express.Router();
const { httpMessage } = require("../_core/const/http-messages.const");
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const { getWalletType } = require("../_core/utils/wallet.util");
const { ExternalWallet, InternalWallet } = require("./wallet.model");

const { stringToObjectId, isValidObjectId } = require("../_core/utils/mongodb.util");
const { isEmpty } = require("../_core/utils/default.util");
const { User } = require("../auth/auth.model");

router.get("/wallet/all", async (req, res) => {
    const query = req?.user 
        ? { user: req.user._id } 
        : {};
    return await ExternalWallet.find(query)
        .sort({ createdAt: -1 })
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err));
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

router.put("/wallet/update/validity", async (req, res) => {
    const { _id, isValid } = req.body;

    if(!stringToObjectId(_id) || isEmpty(isValid)) {
        return res.status(403).json(httpMessage[10204]);
    }

    return await ExternalWallet.findByIdAndUpdate(_id, { valid: isValid })
        .then((value) => {
            if(isEmpty(value)) {
                return res.status(403).json(httpMessage[10106])
            }
            return res.status(200).json(httpMessage[10104]);
        });
});

module.exports = router;
