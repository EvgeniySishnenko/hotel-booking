import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { User } from 'src/users/schemas/user.schemas';
import { CreateSupportRequestDto } from './dto/create.support.request.dto';
import { Message } from './schemas/message.schema';
import { SupportRequest } from './schemas/support.request .schema';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}
  async createSupportRequest(
    data: CreateSupportRequestDto,
    user: User & { _id: TID },
  ) {
    const newMessage = new this.messageModel({
      author: user._id,
      text: data.text,
    });

    const newSupportRequest = new this.supportRequestModel({
      user: user._id,
      message: newMessage,
    });
    try {
      await newMessage.save();
      await newSupportRequest.save();
      return [
        {
          id: newSupportRequest._id,
          createdAt: newSupportRequest.createdAt,
          isActive: newSupportRequest.isActive,
          hasNewMessages: true, // Todo вычисляемый параметр
        },
      ];
    } catch (error) {
      return error;
    }
  }
}
