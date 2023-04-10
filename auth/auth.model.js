const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    hashValue: {
        type: String,
        required: true,
    },
    device: {
        deviceType: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        modelVersion: {
            type: String,
            required: true,
        },
        os: {
            type: String,
            required: true,
        },
        osVersion: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
    },
    isAccountLocked: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    isAccountDeactivated: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const SessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    value: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });


module.exports = {
    User: mongoose.model("User", UserSchema),
    Session: mongoose.model("Session", SessionSchema),
}
