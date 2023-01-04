import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AddHotelParamsDTO } from './dto/add.hotel.params.dto';
import { Hotel, HotelDocument } from './schemas/hotel.schemas';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addHotel(addHotelDTO: AddHotelParamsDTO) {
    const newHotel = new this.HotelModel(addHotelDTO);
    return await newHotel.save();
  }
}
