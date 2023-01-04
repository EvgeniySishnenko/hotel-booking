import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AddHotelParamsDTO } from './dto/add.hotel.params.dto';
import { IFindSearchParams } from './interfaces/find-search.params.interface';
import { Hotel, HotelDocument } from './schemas/hotel.schemas';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addHotel(addHotelDTO: AddHotelParamsDTO) {
    const newHotel = new this.hotelModel(addHotelDTO);
    return await newHotel.save();
  }
  async getHotels(params: IFindSearchParams) {
    const skip = Number(params.offset) || 0;
    const limit = Number(params.limit) || 6;

    return this.hotelModel.find().skip(skip).limit(limit).exec();
  }
}
