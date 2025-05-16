import { env } from "@/main/config";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

export class JwtAdapter {
  constructor () {}
  
  generateAccessToken(payload: any): string {
    const accessToken = jwt.sign(payload, env.jwt.secret, { expiresIn: '15m' });
    return accessToken;
  }

  decrypt(token: string): string {
    const value: any = jwt.verify(token, env.jwt.secret);
    return value;
  }

  generateRefreshToken = (): { token: string, expiresAt: Date } => {
    const token = v4() + v4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    return { token, expiresAt };
  }

  generateHash = (token: string): string => {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    return tokenHash;
  }
}
