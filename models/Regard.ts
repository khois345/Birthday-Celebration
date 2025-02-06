import mongoose, { Document, Schema } from 'mongoose';

interface IRegard extends Document {
    userId: string;
    message: string;
}

const RegardSchema = new Schema<IRegard>({
    userId: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  });

export default mongoose.models.Regard || mongoose.model<IRegard>('Regard', RegardSchema);