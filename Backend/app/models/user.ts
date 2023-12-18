import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    // Add more fields as needed
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Define other fields if needed
});

export default mongoose.model<User>('User', UserSchema);
