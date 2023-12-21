import { Request, Response, Application } from "express";
import { serialize } from 'cookie';
import verifyToken from './middleware';
import { UserController } from "../controller/userController";
import { PaymentController } from "../controller/paymentController";

const userController: UserController = new UserController();
const userPaymentController: PaymentController = new PaymentController();

export class Routes {

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send("Hello World!")
            })

        app.route('/login')
            .post(userController.login)

        app.route('/logout')
            .get((req: Request, res: Response) => {
                res.setHeader('Set-Cookie', serialize('authToken', '', {
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

        app.route('/payment')
            .post(verifyToken, (req: Request, res: Response) => {
                userPaymentController.createPayment(req, res);
                userPaymentController.updateRequests(req, res);
            })

        app.route('/question')
            .post(verifyToken, (req: Request, res: Response) => {
                res.status(200).send("Question submitted!")
            })
    }
}
