import { Request, Response } from "express"
import prisma from "../prisma" 
import jwt, { JwtPayload } from "jsonwebtoken" 

class uploadPhoto {
  async handle(request: Request, response: Response) {
    try {
      const token = request.headers.authorization 

      const userVerify = jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN
      ) as JwtPayload 

      if(userVerify) {
          const file = request.file
          const validImg = file.mimetype.match(/^image\//)
    
          if(!file) {
             console.log('Nenhum arquivo selecionado!')
             return response.status(400).json({error: 'Nenhum arquivo selecionado!'})
          }
    
          if (!validImg) {
            console.log('Formato invalido!')
            return response.status(400).json({error: 'Formato invalido!'})
          } 
    
          await prisma.users.update({
            where: {
              id: userVerify.id,
            },
            data: {
              photo: file.filename,
            },
          })

          const newToken = jwt.sign(
            {
              id: userVerify.id,
              name: userVerify.name,
              profession: userVerify.profession,
              email: userVerify.email,
              phone: userVerify.phone,
              photo: file.filename,
            },
            process.env.SECRET_ACCESS_TOKEN,
            { subject: userVerify.id, expiresIn: "1h" },
          ) 

          console.log('Arquivo carregado com sucesso!')
          return response.status(200).json({
            message: 'Dados atualizados com sucesso!',
            token: newToken,
          }) 
      }

    } catch (error) {
      console.log('deu ruim')
      response.status(400).json({ error: error.message })
    }
  }
}

export { uploadPhoto }