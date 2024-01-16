import { Request, Response } from "express"
import prisma from '../prisma'

class createAccount {
    async handle(request: Request, response: Response) {
        const { name, profession, email, pw } = request.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        const user = await prisma.users.findUnique({
            where: {
              email: email,
            },
        }) 

        if(user) {
            return response.status(400).json({ error: "Email already registered!" })
        }

        if(!emailRegex.test(email)) {
            return response.status(400).json({ error: "Invalid email!" })
        }

        const dataAccount = await prisma.users.create({
            data: {
                name,
                profession,
                email,
                pw, 
                phone: null,
                photo: null
            }
        })

        return response.status(200).json(dataAccount)
    }
}

export { createAccount }