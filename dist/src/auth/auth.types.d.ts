export type AuthenticatedUser = {
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "OPERADOR";
};
export type JwtPayload = {
    sub: number;
    nome: string;
    email: string;
    role: "ADMIN" | "OPERADOR";
    iat: number;
    exp: number;
};
