const jwt = require("jsonwebtoken");
const { getAwsSecrets } = require("../service/secrets/aws.secrets");

const generateJwt = async (data) => {
    const { JWT_SECRET, JWT_EXPIRY } = await getAwsSecrets();
    const options =  { expiresIn: JWT_EXPIRY }
    return jwt.sign(data, JWT_SECRET, options);
}

module.exports = { generateJwt }
