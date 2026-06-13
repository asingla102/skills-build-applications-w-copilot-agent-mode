import { model, Schema } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    entityType: { type: String, required: true, enum: ['user', 'team'] },
    entityId: { type: Schema.Types.ObjectId, required: true },
    period: { type: String, required: true, default: 'monthly' },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
leaderboardEntrySchema.index({ entityType: 1, entityId: 1, period: 1 }, { unique: true });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
