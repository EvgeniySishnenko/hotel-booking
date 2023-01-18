import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ISupport } from '../interfaces/support.interface';
import { User } from 'src/users/schemas/user.schemas';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { Message } from './message.schema';

@Schema()
export class SupportRequest extends Document implements ISupport {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: TID;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true, ref: Message.name })
  messages: Message[];

  @Prop({ required: true })
  isActive: boolean;
}
export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
