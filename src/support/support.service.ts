import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { IFindSearchParams } from 'src/hotel/interfaces/find-search.params.interface';
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
    });

    try {
      await newMessage.save();
      newSupportRequest.messages = [newMessage];
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
  /** todo переписать на aggregate  */
  async getSupportCalls(
    params: Omit<IFindSearchParams & { isActive: boolean }, 'hotel'>,
  ) {
    try {
      const skip = Number(params.offset) || 0;
      const limit = Number(params.limit) || 6;

      const supportMessage = await this.supportRequestModel
        .find({ isActive: params.isActive })
        .skip(skip)
        .limit(limit)
        .exec();

      const hasNewMessages = await this.supportRequestModel.find({
        'messages.readAt': { $ne: null },
      });
      const hasNewMessagesIds = await hasNewMessages.map((item) =>
        item._id.toString(),
      );

      return supportMessage.map((support) => {
        return {
          id: support._id,
          createdAt: support.createdAt,
          isActive: support.isActive,
          hasNewMessages: hasNewMessagesIds.includes(support._id.toString()),
        };
      });
    } catch (error) {
      return error;
    }
  }

  async getSupportCallsManager(
    params: Omit<IFindSearchParams & { isActive: boolean }, 'hotel'>,
  ) {
    try {
      const skip = Number(params.offset) || 0;
      const limit = Number(params.limit) || 6;

      const supportMessage = await this.supportRequestModel.aggregate([
        // { $match: { isActive: Boolean(params.isActive) } },
        { $unwind: '$messages' },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $addFields: {
            hasNewMessages: {
              $or: [
                {
                  $in: ['$messages.readAt', [null]],
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            createdAt: 1,
            isActive: 1,
            hasNewMessages: 1,
            'client._id': 1,
            'client.name': 1,
            'client.email': 1,
            'client.contactPhone': 1,
          },
        },

        { $skip: skip },
        { $limit: limit },
      ]);
      // const hasNewMessages = await this.supportRequestModel.aggregate([]);
      // console.log(hasNewMessages);

      return supportMessage;
    } catch (error) {
      return error;
    }
  }

  async getHistoryMessageSupportCalls(id: string) {
    try {
      return await this.messageModel.find({ author: id });
    } catch (error) {
      return error;
    }
  }
}
