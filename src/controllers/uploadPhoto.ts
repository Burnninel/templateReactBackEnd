import { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";

class uploadPhoto {
  async handle(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;

      const userVerify = jwt.verify(
        token,
        process.env.SECRET_ACCESS_TOKEN
      ) as JwtPayload;

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
    
          console.log('Arquivo carregado com sucesso!')
          return response.status(200).json({ message: 'Arquivo carregado com sucesso!', file: request.file })
      }

    } catch (error) {
      console.log('deu ruim')
      response.status(400).json({ error: error.message })
    }
  }
}

export { uploadPhoto }