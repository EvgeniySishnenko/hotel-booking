import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  public email: string;
  @Prop()
  public passwordHash: string;
  @Prop()
  public contactPhone: string;
  @Prop()
  public lastName: string;
  @Prop()
  public role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
