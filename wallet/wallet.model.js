const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternalWalletSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
    },
    availableBalance: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    seedPhrase: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ExternalWalletSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    balance: {
        type: Number,
    },
    availableBalance: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    seedPhrase: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = {
    ExternalWallet: mongoose.model("ExternalWallet", ExternalWalletSchema),
    InternalWallet: mongoose.model("InternalWallet", InternalWalletSchema)
}
