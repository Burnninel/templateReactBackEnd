import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

class login {
  async handle(request: Request, response: Response) {
    const { email, pw } = request.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user && user.pw === pw) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          profession: user.profession,
          email: user.email,
          phone: user.phone,
          photo: user.photo,
        },
        process.env.SECRET_ACCESS_TOKEN,
        { subject: user.id, expiresIn: "1d" }
      );

      response.status(200).json(token);
    } else {
      response.status(400).json({ error: "Invalid email or password" });
      console.log("Invalid email or password");
    }
  }
}

export { login };
