import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createHmac, timingSafeEqual } from "crypto";
import { JwtPayload } from "./auth.types";

@Injectable()
export class JwtService {
  sign(user: Omit<JwtPayload, "iat" | "exp">) {
    const expiresIn = this.getExpiresInSeconds();
    const now = Math.floor(Date.now() / 1000);
    const payload: JwtPayload = {
      ...user,
      iat: now,
      exp: now + expiresIn,
    };

    return {
      accessToken: this.encode(payload),
      expiresIn,
    };
  }

  verify(token: string): JwtPayload {
    const [encodedHeader, encodedPayload, signature] = token.split(".");

    if (!encodedHeader || !encodedPayload || !signature) {
      throw new UnauthorizedException("Invalid bearer token");
    }

    const expectedSignature = this.signContent(
      `${encodedHeader}.${encodedPayload}`,
    );

    if (!this.matches(signature, expectedSignature)) {
      throw new UnauthorizedException("Invalid bearer token");
    }

    let payload: JwtPayload;

    try {
      payload = JSON.parse(
        Buffer.from(encodedPayload, "base64url").toString("utf8"),
      ) as JwtPayload;
    } catch {
      throw new UnauthorizedException("Invalid bearer token");
    }

    if (!payload.sub || !payload.email || !payload.exp) {
      throw new UnauthorizedException("Invalid bearer token");
    }

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException("Expired bearer token");
    }

    return payload;
  }

  private encode(payload: JwtPayload) {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
      "base64url",
    );
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      "base64url",
    );
    const signature = this.signContent(`${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private signContent(content: string) {
    return createHmac("sha256", this.getSecret())
      .update(content)
      .digest("base64url");
  }

  private getSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    return secret;
  }

  private getExpiresInSeconds() {
    return this.parseDuration(process.env.JWT_EXPIRES_IN ?? "8h");
  }

  private parseDuration(value: string) {
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

    return amount * multipliers[unit as keyof typeof multipliers];
  }

  private matches(received: string, expected: string) {
    const receivedBuffer = Buffer.from(received);
    const expectedBuffer = Buffer.from(expected);

    return (
      receivedBuffer.length === expectedBuffer.length &&
      timingSafeEqual(receivedBuffer, expectedBuffer)
    );
  }
}
