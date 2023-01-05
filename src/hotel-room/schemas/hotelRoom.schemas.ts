import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Hotel } from 'src/hotel/schemas/hotel.schemas';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ required: true })
  public description: string;
  // @Prop({ ref: 'Hotel', require: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Hotel })
  public hotel: ObjectId;
  @Prop()
  public images: string[];
  @Prop()
  public isEnabled: boolean;
}
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
