import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

class account {
  async handle(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const user = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
      response.json(user);
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      response.status(401).json({ error: "Token inválido" });
    }
  }
}

export { account };
