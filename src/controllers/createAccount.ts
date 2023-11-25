import { Request, Response } from "express";

class createAccount {
    async handle(request: Request, response: Response) {
        const { name, profession, email, pw } = request.body;
   
        response.json({ name, profession, email, pw });

        console.log(name, profession, email, pw)
    }
}

export { createAccount };