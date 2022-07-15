import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { IUserRequest } from '../models/users';
import asyncHandler from 'express-async-handler';

const NAMESPACE = 'Auth';

export const generateToken = (id: string) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string);
    return token;
};

export const protect = asyncHandler (async(req: IUserRequest, res: Response, next: NextFunction) =>  {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {            
            token = req.headers.authorization.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            req.userId = parseInt(decoded.id, 2 );

            next();
        } catch (error: any) {
            console.log(error.message);
            res.status(401);
            throw new Error("no token, no auth");
        }

    }

    if(!token) {
        res.status(401);
        throw new Error("no token, no auth");
    }

});
