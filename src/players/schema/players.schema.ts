import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    ranking: {
      type: String,
    },
    position: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true, collection: 'players' },
);
