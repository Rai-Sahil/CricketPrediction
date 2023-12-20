import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

type verification = (req: Request, res: Response, next: NextFunction) => void;

const verifyToken: verification = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No token provided");
    }

    try {
        const decoded = jwt.verify(token, 'asdjfhlasdkjhfasdlf');
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

const exportObject = {
    verifyToken
}

export default exportObject;