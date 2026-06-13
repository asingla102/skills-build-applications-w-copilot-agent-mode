import { model, Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
        type: String,
        required: true,
        enum: ['run', 'walk', 'strength'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    notes: { type: String, default: '', trim: true },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
