import { Injectable } from "@nestjs/common";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

@Injectable()
export class PasswordService {
  hash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");

    return `scrypt:${salt}:${hash}`;
  }

  verify(password: string, storedHash: string) {
    const [algorithm, salt, hash] = storedHash.split(":");

    if (algorithm !== "scrypt" || !salt || !hash) {
      return false;
    }

    const receivedHash = scryptSync(password, salt, 64);
    const expectedHash = Buffer.from(hash, "hex");

    return (
      receivedHash.length === expectedHash.length &&
      timingSafeEqual(receivedHash, expectedHash)
    );
  }
}
