import { Request, Response } from "express";
import User from "../models/user";

export class UserController {
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            const newuser = new User({ email, password });
            await newuser.save();
            res.status(201).json({ message: 'User created', user: newuser });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', user: null });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });

            if (!user) {
                res.status(400).json({ message: 'Wrong credentials' });
                return;
            }

            res.status(200).json({ message: 'Logged in', user: user });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', user: null });
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ message: 'Logged out' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}