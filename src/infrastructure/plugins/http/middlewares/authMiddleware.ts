import { JwtAdapter } from "@/infrastructure/adapters";
import { prismaClient, UserRepository } from "@/infrastructure/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export const authMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(400).send('Token is missing!');
    } 

    const userRepository = new UserRepository(prismaClient);
    
    const data: any = new JwtAdapter().decrypt(token);
    
    const { id } = data;
    
    const user = await userRepository.loadUserById(id);
    
    if (!user) {
        return res.status(400).send('User not found, token invalid!');
    }
    
    if (user?.loginAttempts === 0) {
        return res.status(401).send('User locked!');
    }
}