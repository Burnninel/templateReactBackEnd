import { Request, Response } from "express";
import prisma from '../prisma'

class createAccount {
    async handle(request: Request, response: Response) {
        const { name, profession, email, pw } = request.body;
        
        const dataAccount = await prisma.users.create({
            data: {
                name,
                profession,
                email,
                pw
            }
        })

        return response.json(dataAccount)
    }
}

export { createAccount };