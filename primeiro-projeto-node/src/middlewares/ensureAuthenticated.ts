import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

interface RequestInterface{
    id:string;
}

export default function ensureAuthenticated(request: any, response: Response, next: NextFunction): void{

    //Validação do token JWT

    const authHeader = request.headers.authorization;

    if (!authHeader){
        throw new Error('JWT token is missing');
    }

    // Bearer sfdkksf

    //primeira posição n quero, so a segunda da destrutiração
    const [, token] = authHeader.split(' ');

    try {

        const decoded = verify(token, authConfig.jwt.secret)

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub
        }

        return next();

    } catch {
        throw new Error('Invalid JWT token');

    }


}
