import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from './schemas/hotelRoom.schemas';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async create(data, file) {
    const filesPath = file.map((file) => file.filename);
    console.log(data);

    const newHotelRoomModel = new this.hotelRoomModel({
      ...data,
      hotel: data.hotelId,
      images: filesPath,
    });

    await newHotelRoomModel.save();

    return newHotelRoomModel;
  }
}
