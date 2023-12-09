import { Request, Response } from "express";

export class Routes {

    public routes(app: any): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send("Hello World!")
            })

        app.route('/post')
            .post((req: Request, res: Response) => {
                const { name, age, status } = req.body;
                res.status(200).send({ name, age, status })
            })
    }
}
