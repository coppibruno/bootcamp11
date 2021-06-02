import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';


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
        throw new AppError('JWT token is missing', 401);
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
        throw new AppError('Invalid JWT token', 401);

    }


}
