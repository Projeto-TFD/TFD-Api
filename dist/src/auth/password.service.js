"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let PasswordService = class PasswordService {
    hash(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString("hex");
        const hash = (0, crypto_1.scryptSync)(password, salt, 64).toString("hex");
        return `scrypt:${salt}:${hash}`;
    }
    verify(password, storedHash) {
        const [algorithm, salt, hash] = storedHash.split(":");
        if (algorithm !== "scrypt" || !salt || !hash) {
            return false;
        }
        const receivedHash = (0, crypto_1.scryptSync)(password, salt, 64);
        const expectedHash = Buffer.from(hash, "hex");
        return (receivedHash.length === expectedHash.length &&
            (0, crypto_1.timingSafeEqual)(receivedHash, expectedHash));
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)()
], PasswordService);
//# sourceMappingURL=password.service.js.map