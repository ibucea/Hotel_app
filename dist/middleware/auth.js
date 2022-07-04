"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = exports.extractJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../server/config"));
const NAMESPACE = 'Auth';
const extractJWT = (req, res, next) => {
    var _a;
    console.log(NAMESPACE, 'Validating token');
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.extractJWT = extractJWT;
const signJWT = (user, callback) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    console.log(NAMESPACE, `Attempting to sign token for ${user.userId}`);
    try {
        jsonwebtoken_1.default.sign({
            username: user.username
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.signJWT = signJWT;
