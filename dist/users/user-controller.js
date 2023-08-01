"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.postUser = void 0;
const constants_1 = require("../constants/constants");
const generateToken_1 = require("../utils/generateToken");
const user_schema_1 = __importDefault(require("./user-schema"));
const bcrypt_1 = require("bcrypt");
const postUser = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_schema_1.default(reqBody);
    const { password } = user;
    if (user.isModified("password")) {
        user.password = yield (0, bcrypt_1.hash)(password, 8);
    }
    yield user_schema_1.default.create(user);
    return user;
});
exports.postUser = postUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ email });
    if (!user) {
        throw new Error(constants_1.errorMsgs.emailLoginError);
    }
    const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (!isMatch) {
        throw new Error(constants_1.errorMsgs.passError);
    }
    const token = yield (0, generateToken_1.generate)(user);
    return { user, token };
});
exports.loginUser = loginUser;
//# sourceMappingURL=user-controller.js.map