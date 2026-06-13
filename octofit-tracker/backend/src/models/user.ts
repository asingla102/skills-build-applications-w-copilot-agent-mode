import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)