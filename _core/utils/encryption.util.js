const crypto = require("crypto");
const { getAwsSecrets } = require("../service/secrets/aws.secrets");

const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const encrypt = async (text) => {
  const { CRYPTO_SECRET } = await getAwsSecrets();
  const key = crypto.scryptSync(CRYPTO_SECRET, 'salt', 32); // 256-bit key
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = async (hash) => {
  const { CRYPTO_SECRET } = await getAwsSecrets();
  const key = crypto.scryptSync(CRYPTO_SECRET, 'salt', 32); // 256-bit key
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(hash.iv, "hex"),
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};


module.exports = { encrypt, decrypt };
