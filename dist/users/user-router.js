"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = __importStar(require("express"));
const user_controller_1 = require("./user-controller");
const constants_1 = require("../constants/constants");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = express.Router();
exports.default = userRouter;
userRouter.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_controller_1.postUser)(req.body);
        res.send({
            data: user,
            message: constants_1.successMsgs.created,
        });
    }
    catch (e) {
        res.send(e.message);
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield (0, user_controller_1.loginUser)(email, password);
        res.cookie("token", token, { secure: true });
        res.send({ user: user, token });
    }
    catch (error) {
        res.send(error.message);
    }
}));
userRouter.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(req.body.user);
    }
    catch (e) {
        res.send(e.message);
    }
}));
userRouter.post("/logout", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        res.clearCookie("token");
        res.send({ message: constants_1.successMsgs.logout, data: user });
    }
    catch (e) {
        res.send(e.message);
    }
}));
//# sourceMappingURL=user-router.js.map