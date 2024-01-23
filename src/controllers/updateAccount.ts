import { Request, Response } from "express" 
import prisma from "../prisma" 
import jwt, { JwtPayload } from "jsonwebtoken" 

class updateAccount {
  async handle(request: Request, response: Response) {
    try {
      const token = request.headers.authorization 
      const userUpdate = request.body 

      const userVerify = jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN
      ) as JwtPayload 

      if (userVerify) {
        await prisma.users.update({
          where: {
            id: userVerify.id,
          },
          data: {
            email: userUpdate.email,
            phone: userUpdate.phone,
          },
        }) 

        const newToken = jwt.sign(
          {
            id: userVerify.id,
            name: userVerify.name,
            profession: userVerify.profession,
            email: userUpdate.email || userVerify.email,
            phone: userUpdate.phone || userVerify.phone,
            photo: userVerify.photo,
          },
          process.env.SECRET_ACCESS_TOKEN,
          { subject: userVerify.id, expiresIn: "1h" }
        ) 

        return response.status(200).json({
          message: "Data updated successfully!",
          token: newToken,
        }) 
      }
    } catch (error) {
      return response
        .status(401)
        .json({ error: "Invalid token!", infoError: error }) 
    }
  }
}

export { updateAccount } 
