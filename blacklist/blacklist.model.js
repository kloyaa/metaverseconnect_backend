const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlacklistedSchema = new Schema({
    type: {
        type: String,
        enum: ['IPA', 'DEVICE', 'USER'],
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = Blacklist = mongoose.model("Blacklist", BlacklistedSchema);
