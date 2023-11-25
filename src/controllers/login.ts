import { Request, Response } from "express";

class login {
    async handle(request: Request, response: Response) {
        const { email, pw } = request.body;
   
        response.json({ email, pw });
     
        console.log(email, pw)
    }
}

export { login };
