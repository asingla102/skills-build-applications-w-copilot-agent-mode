import { model, Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    description: { type: String, default: '', trim: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
