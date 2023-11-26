import { Request, Response } from "express";
import prisma from "../prisma";

class login {
  async handle(request: Request, response: Response) {
    const { email, pw } = request.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user && user.pw === pw) {
      response.status(200).json({ error: "Login successful" });
      console.log("Login successful");
    } else {
      response.status(400).json({ error: "Invalid email or password" });
      console.log("Invalid email or password");
    }
  }
}

export { login };
