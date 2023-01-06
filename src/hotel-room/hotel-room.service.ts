import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { HotelRoom, HotelRoomDocument } from './schemas/hotelRoom.schemas';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
    private hotelService: HotelService,

    @InjectConnection() private connection: Connection,
  ) {}
  /** todo прописать типы */
  async create(data, file) {
    /** todo прописать типы */
    const filesPath = file.map((file) => file.filename);
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
  }
}
