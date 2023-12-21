import jwt from 'jsonwebtoken';
import User from "../models/user";
import { Request, Response } from "express";

export class PaymentController {

    private readonly JWT_SECRET: string = 'asdjfhlasdkjhfasdlf';

    public async createPayment(req: Request, res: Response): Promise<void> {
        try {
            //TODO - Create payment
            res.status(200).json({ message: 'Payment successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    public async updateRequests(req: Request, res: Response): Promise<void> {
        try {
            const token = req.cookies.authToken;
            console.log('Update payment token is ', token);
            const user = jwt.verify(token, this.JWT_SECRET);
            console.log('Update payment user is ', user);

            await User.findOneAndUpdate(
                { email: user.email },
                { $set: { number_of_requests: 100, premiumUser: true } },
                { new: true })
                    .then((user) => {
                        console.log('Update payment user is ', user);
                    })
                    .catch((err) => {
                        console.log(err);
                        throw err;
                    })

        } catch (err: any) {
            console.log(err);
            throw err;
        } 
    }
}
