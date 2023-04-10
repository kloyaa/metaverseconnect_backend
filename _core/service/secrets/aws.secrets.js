require("dotenv").config();
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const getAwsSecrets = async () => {
    const client = new SecretsManagerClient({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY,
        }
    });
    const params = {
        SecretId: process.env.AWS_SECRET_ID,
        VersionStage: "AWSCURRENT",
    };
    try {
        const data = await client.send(new GetSecretValueCommand(params));
        if ("SecretString" in data) {
            const parsedData = JSON.parse(data.SecretString);
            return parsedData;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getAwsSecrets }

