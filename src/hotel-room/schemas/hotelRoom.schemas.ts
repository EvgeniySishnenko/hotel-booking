import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Hotel, HotelSchema } from 'src/hotel/schemas/hotel.schemas';
import { Type } from 'class-transformer';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ required: true })
  public description: string;
  // @Prop({ ref: 'Hotel', require: true })
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Hotel })
  // @Prop({ type: AddressSchema })
  // @Type(() => Address)
  // address: Address;
  // @Prop({ type: HotelSchema, require: true })
  // @Type(() => Hotel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Hotel.name })
  public hotel: mongoose.Schema.Types.ObjectId;
  @Prop()
  public images: string[];
  @Prop()
  public isEnabled: boolean;
}
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
