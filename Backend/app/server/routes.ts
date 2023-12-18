import { Request, Response, Application } from "express";
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import verifyToken from './middleware';
import { UserController } from "../controller/userController";
import { User } from "../models/user";

const userController: UserController = new UserController();

export class Routes {
    private readonly JWT_SECRET: string = 'secret';

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send("Hello World!")
            })

        app.route('/login')
            .post(userController.login)

        app.route('/logout')
            .get((req: Request, res: Response) => {
                res.setHeader('Set-Cookie', serialize('token', '', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    expires: new Date(0),
                    path: '/'
                }))
                res.status(200).send("Logged out!")
            })

        app.route('/register')
            .post(userController.register)
    }
}
