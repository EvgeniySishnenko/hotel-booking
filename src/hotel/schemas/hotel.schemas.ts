import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop()
  public description: string;
  @Prop({ required: true })
  public title: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
