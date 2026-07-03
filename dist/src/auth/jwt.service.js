"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let JwtService = class JwtService {
    sign(user) {
        const expiresIn = this.getExpiresInSeconds();
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            ...user,
            iat: now,
            exp: now + expiresIn,
        };
        return {
            accessToken: this.encode(payload),
            expiresIn,
        };
    }
    verify(token) {
        const [encodedHeader, encodedPayload, signature] = token.split(".");
        if (!encodedHeader || !encodedPayload || !signature) {
            throw new common_1.UnauthorizedException("Invalid bearer token");
        }
        const expectedSignature = this.signContent(`${encodedHeader}.${encodedPayload}`);
        if (!this.matches(signature, expectedSignature)) {
            throw new common_1.UnauthorizedException("Invalid bearer token");
        }
        let payload;
        try {
            payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid bearer token");
        }
        if (!payload.sub || !payload.email || !payload.exp) {
            throw new common_1.UnauthorizedException("Invalid bearer token");
        }
        if (payload.exp <= Math.floor(Date.now() / 1000)) {
            throw new common_1.UnauthorizedException("Expired bearer token");
        }
        return payload;
    }
    encode(payload) {
        const header = { alg: "HS256", typ: "JWT" };
        const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
        const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
        const signature = this.signContent(`${encodedHeader}.${encodedPayload}`);
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
    signContent(content) {
        return (0, crypto_1.createHmac)("sha256", this.getSecret())
            .update(content)
            .digest("base64url");
    }
    getSecret() {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }
        return secret;
    }
    getExpiresInSeconds() {
        return this.parseDuration(process.env.JWT_EXPIRES_IN ?? "8h");
    }
    parseDuration(value) {
        const match = value.match(/^(\d+)([smhd])?$/);
        if (!match) {
            return 8 * 60 * 60;
        }
        const amount = Number(match[1]);
        const unit = match[2] ?? "s";
        const multipliers = {
            s: 1,
            m: 60,
            h: 60 * 60,
            d: 24 * 60 * 60,
        };
        return amount * multipliers[unit];
    }
    matches(received, expected) {
        const receivedBuffer = Buffer.from(received);
        const expectedBuffer = Buffer.from(expected);
        return (receivedBuffer.length === expectedBuffer.length &&
            (0, crypto_1.timingSafeEqual)(receivedBuffer, expectedBuffer));
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map