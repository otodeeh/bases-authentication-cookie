import { env } from "@/main/config";
import bcrypt from "bcrypt";

export class BcryptAdapter {
  constructor () {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, env.bcrypt.salt);
    return hash;
  }
  
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
