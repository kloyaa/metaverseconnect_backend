const { getAwsSecrets } = require("../service/secrets/aws.secrets");

const getWalletType = async (walletAddress) => {
    const { REGEXP_ADDRESSES } = await getAwsSecrets();
    const parsedSecret = JSON.parse(REGEXP_ADDRESSES);
    const walletTypes = JSON.parse(parsedSecret);
    for (let i = 0; i < walletTypes.length; i++) {
        const { name, regexp } = walletTypes[i];
        if (new RegExp(regexp).test(walletAddress)) {
            return name;
        }
    }
    return "Others";
}

module.exports = { getWalletType }
