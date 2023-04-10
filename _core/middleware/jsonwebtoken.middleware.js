require("dotenv").config();
const jwt = require("jsonwebtoken");
const { httpMessage } = require("../const/http-messages.const");
const { getAwsSecrets } = require("../service/secrets/aws.secrets");
const { decrypt } = require("../utils/encryption.util");

const jwtAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res
            .status(401)
            .json(httpMessage[10303]);

        const token = authHeader.split(" ")[1];
        if(!token) return res
            .status(401)
            .json(httpMessage[10303]);

        const { JWT_SECRET } = await getAwsSecrets();
        const decryptedToken = await decrypt({
            iv: token.split(".")[0],
            content: token.split(".")[1]
        });

        jwt.verify(decryptedToken, JWT_SECRET, (err, value) => {
            if (err) return res
                .status(401)
                .json(httpMessage[10303]);
            req.user = value;
            next();
        });
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json(httpMessage[10204]);
    }
};

module.exports = { jwtAuth };
