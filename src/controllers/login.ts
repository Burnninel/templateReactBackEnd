import { Request, Response } from "express" 
import prisma from "../prisma" 
import jwt from "jsonwebtoken" 

class login {
  async handle(request: Request, response: Response) {
    const { email, pw } = request.body 

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    }) 

    if (!user || user.pw !== pw) {
      return response.status(400).json({ error: "Invalid email or password" }) 
    }

    const { id, name, profession, phone, photo } = user 
    const token = jwt.sign(
      {
        id,
        name,
        profession,
        email,
        phone,
        photo,
      },
      process.env.SECRET_ACCESS_TOKEN,
      { subject: id, expiresIn: "1d" }
    ) 

    return response.status(200).json(token) 
  }
}

export { login } 
