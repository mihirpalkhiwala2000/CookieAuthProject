"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const constants_1 = require("../constants/constants");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error(constants_1.errorMsgs.emailError);
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user-schema.js.map