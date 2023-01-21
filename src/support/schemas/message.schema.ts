import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IMessage } from '../interfaces/support.interface';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { User } from 'src/users/schemas/user.schemas';

@Schema()
export class Message extends Document implements IMessage {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: TID;

  @Prop({ default: new Date() })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ default: new Date() })
  readAt: Date | null;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
