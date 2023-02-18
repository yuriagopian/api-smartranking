import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  PlayerSchema,
  PlayerDocument,
  Player,
} from '../../players/schema/players.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class CategoryEvent {
  @Prop()
  name: string;
  @Prop()
  operation: string;

  @Prop()
  value: number;
}

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ unique: true })
  category: string;

  @Prop()
  description: string;

  @Prop()
  events: CategoryEvent[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Player.name }],
  })
  players: mongoose.Types.ObjectId[];
}

export const categorySchema = SchemaFactory.createForClass(Category);

// export const categorySchema = new mongoose.Schema(
//   {
//     category: {
//       type: String,
//       unique: true,
//     },
//     description: {
//       type: String,
//     },
//     events: [
//       {
//         name: { type: String },
//         operation: { type: String },
//         value: { type: Number },
//       },
//     ],
//     players: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Players',
//       },
//     ],
//   },
//   { Timestamps: true, collection: 'categories' },
// );
