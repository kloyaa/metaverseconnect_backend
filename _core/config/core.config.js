const express = require("express");
const { adminAuthentication } = require("../middleware/jsonwebtoken.middleware");
const { getAwsSecrets } = require("../service/secrets/aws.secrets");
const router = express.Router();

router.get("/config", adminAuthentication, async (req, res) => {
    const result = await getAwsSecrets();
    return res.status(200).json(result)
});

module.exports = router;
