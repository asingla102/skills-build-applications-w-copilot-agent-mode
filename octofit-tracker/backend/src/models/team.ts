import { model, Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
)

export const Team = model('Team', teamSchema)