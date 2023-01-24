import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupportRequestDto } from './dto/create.support.request.dto';
import { Message } from './schemas/message.schema';
export class ChartService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}
  async createMessage(chat: CreateSupportRequestDto) {
    const newMessage = new this.messageModel(chat);
    return await newMessage.save();
  }

  async getMessages() {
    return await this.messageModel.find();
  }
}
