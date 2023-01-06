import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { HotelRoom, HotelRoomDocument } from './schemas/hotelRoom.schemas';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelRoomDTo } from './dto/create.hotel.room.dto';
import { off } from 'process';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
    private hotelService: HotelService,

    @InjectConnection() private connection: Connection,
  ) {}

  async create(data: CreateHotelRoomDTo, file: File[]) {
    if (!data.hotelId) return { error: 'заполните id гостинницы' };

    const filesPath = file.map((file) => file['filename']);
    try {
      /** todo уточнить как правильно делать ono to one.
       * У меня не сработало */
      const hotel = await this.hotelService.findById(data.hotelId);

      const newHotelRoomModel = new this.hotelRoomModel({
        ...data,
        hotel: hotel, // todo заменить на id или как правильно зависимости делать
        images: filesPath,
      });
      await newHotelRoomModel.save();

      return newHotelRoomModel;
    } catch (error) {
      return { error };
    }
  }

  async getHotelRooms(params) {
    const skip = Number(params.offset) || 0;
    const limit = Number(params.limit) || 6;
    try {
      return await this.hotelRoomModel
        .find({ hotel: { _id: params.hotel } })
        .skip(skip)
        .limit(limit)
        .select('-updatedAt')
        .select('-__v')
        .select('-createdAt')
        .select('-isEnabled')
        .exec();
    } catch (error) {
      return error;
    }
  }
}
