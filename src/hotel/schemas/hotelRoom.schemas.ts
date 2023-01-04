import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ required: true })
  public description: string;
  @Prop({ ref: 'Hotel', required: true })
  public hotel: ObjectId;
  @Prop()
  public images: string[];
  @Prop()
  public isEnabled: boolean;
}
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
