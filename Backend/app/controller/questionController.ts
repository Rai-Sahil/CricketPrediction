import { Request, Response } from "express";

export class QuestionController {
    public async getResponse(req: Request, res: Response): Promise<void> {
        try {
            const question = req.body.question;

            //TODO - Send question to API and get response from API.
        } catch (error: any) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}