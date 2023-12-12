import { Request, Response, Application } from "express";
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import verifyToken from './middleware';

export class Routes {
    private readonly JWT_SECRET: string = 'secret';

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send("Hello World!")
            })

        app.route('/login')
            .post((req: Request, res: Response) => {
                const { email, password } = req.body;
                
                if (email === 'a@a.a' && password === '123') {
                    const token = jwt.sign({ email }, this.JWT_SECRET, { expiresIn: '1h' });

                    res.setHeader('Set-Cookie', serialize('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }))
                    res.status(200).send("Logged in!")
                } else {
                    res.status(401).send("Wrong credentials!")
                }
            })

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

        app.route('/send-data')
            .post(verifyToken, (req: Request, res: Response) => {
                const { question } = req.body;
                res.status(200).send(`Question: ${question}`)
            })
    }
}
