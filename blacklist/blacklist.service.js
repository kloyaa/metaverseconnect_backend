const BlacklistModel = require("./blacklist.model");

const isIPABlacklisted = async (address) => {
    const result = await BlacklistModel.findOne({ address });
    return result !== null;
}

module.exports = { isIPABlacklisted }
