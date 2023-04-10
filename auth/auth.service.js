const { Session } = require("./auth.model");
const { User } = require("./auth.model");

const saveSession = async ({ user, value }) => {
    const options = { upsert: true, new: true };
    return await Session.findOneAndUpdate({ user }, { value }, options);
}

const findSessionByUser = async (user) => {
    return await Session.findOne({ user });
}

const isAccountLocked = async (user) => {
    const result = await User.findOne({ _id: user, isAccountLocked: true });
    return result !== null;
}

const isAccountDeactivated = async (user) => {
    const result = await User.findOne({ _id: user, isAccountDeactivated: true });
    return result !== null;
}

module.exports = {
    saveSession,
    findSessionByUser,
    isAccountLocked,
    isAccountDeactivated
}
