import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function esureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    // console.log(authToken)

    if(!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid",
        });
    }

    const [,token ] = authToken.split(" ")
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET)

        request.cookies.token = sub;

        console.log('ola')

        return next()
    } catch (error) {
        return response.status(401).json({errorCode: "token.expired"})
    }

}