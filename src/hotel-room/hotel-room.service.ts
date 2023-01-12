import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { HotelRoom } from './schemas/hotelRoom.schemas';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelRoomDTo } from './dto/create.hotel.room.dto';
import { off } from 'process';
import { UpdateHotelRoomDTO } from './dto/update.hotel.room.dto';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoom>,
    private hotelService: HotelService,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(data: CreateHotelRoomDTo, file: File[]) {
    if (!data.hotelId) return { error: 'заполните id гостинницы' };

    const filesPath = file.map((file) => file['filename']);
    try {
      /** Денис Владимиров
       * Не могу добавить отель как зависимость,
       * сейчас добавляется id  как строка, но не объект hotel.
       * Сделал в в лоб реализацию
       */
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

  async getHotelRoom(id: string) {
    try {
      return await this.hotelRoomModel
        .findById(id)
        .select('-updatedAt')
        .select('-__v')
        .select('-createdAt')
        .select('-isEnabled')
        .exec();
    } catch (error) {
      return error;
    }
  }

  async update(data: UpdateHotelRoomDTO, file: File[], id: string) {
    try {
      const filesPath = file.map((file) => file['filename']);

      return await this.hotelRoomModel.findByIdAndUpdate(
        id,
        {
          ...data,
          $push: { images: { $each: filesPath } },
        },
        { new: true },
      );
    } catch (error) {
      return error;
    }
  }
}
