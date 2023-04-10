const mongoose = require('mongoose');

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const stringToObjectId = (id) => {
    if(!isValidObjectId(id))
        throw new Error('Invalid ObjectId');
    return mongoose.Types.ObjectId(id);
};

module.exports = { isValidObjectId, stringToObjectId };
