import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: Date, required: true },
  tier: { type: String },
  participants: { type: String, required: true },
  image: { type: String },
  prizePool: { type: String },
  entryFee: { type: String },
  status: { type: String },
  description: { type: String },
  rules: { type: mongoose.Schema.Types.Mixed },
  isFull: { type: Boolean }
}, { timestamps: true });

const Tournament = mongoose.model('Tournament', TournamentSchema);

export default Tournament;
