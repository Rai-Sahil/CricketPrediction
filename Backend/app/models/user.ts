import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    number_of_requests: number;
    premiumUser: boolean;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number_of_requests: { type: Number, default: 20, required: true },
    premiumUser: { type: Boolean, default: false, required: true }
});

export default mongoose.model<User>('User', UserSchema);
