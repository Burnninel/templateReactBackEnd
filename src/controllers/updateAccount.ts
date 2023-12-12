import { Request, Response } from "express";
import prisma from "../prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

class updateAccount {
  async handle(request: Request, response: Response) {
    try {
      const user = request.body;

      const userVerify = jwt.verify(
        user.token,
        process.env.SECRET_ACCESS_TOKEN
      ) as JwtPayload;

      if (user) {
        await prisma.users.update({
              where: {
                id: userVerify.id,
              },
              data: {
                email: user.email,
                phone: user.phone,
                photo: user.photo,
              },
            });

        response.status(200).json('Dados atualizados com sucesso!', )
      } 
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      response.status(401).json({ error: "Token inválido" });
    }
  }
}

export { updateAccount };