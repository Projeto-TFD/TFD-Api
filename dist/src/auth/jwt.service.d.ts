import { JwtPayload } from "./auth.types";
export declare class JwtService {
    sign(user: Omit<JwtPayload, "iat" | "exp">): {
        accessToken: string;
        expiresIn: number;
    };
    verify(token: string): JwtPayload;
    private encode;
    private signContent;
    private getSecret;
    private getExpiresInSeconds;
    private parseDuration;
    private matches;
}
