import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true, collection: 'players' })
export class Player {
  @Prop()
  phoneNumber: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  ranking: string;

  @Prop()
  position: number;

  @Prop()
  imageUrl: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

// export const PlayerSchema = new mongoose.Schema(
//   {
//     phoneNumber: {
//       type: String,
//     },
//     email: {
//       type: String,
//       unique: true,
//     },
//     name: {
//       type: String,
//     },
//     ranking: {
//       type: String,
//     },
//     position: {
//       type: Number,
//     },
//     imageUrl: {
//       type: String,
//     },
//   },
//   { timestamps: true, collection: 'players' },
// );
