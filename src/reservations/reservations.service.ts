import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { HotelRoomService } from 'src/hotel-room/hotel-room.service';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { HotelRoom } from 'src/hotel-room/schemas/hotelRoom.schemas';
import { Role } from 'src/users/enums/roles.enum';
import { ReservationDto } from './dto/reservation.dto';
import { Reservations } from './schemas/reservations.schemas';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservations.name)
    private reservationsModel: Model<Reservations>,
    private hotelRoomService: HotelRoomService,
    @InjectConnection() private connection: Connection,
  ) {}

  async addReservation(data: ReservationDto, id: TID) {
    try {
      const hotelRoom = await this.hotelRoomService.getHotelRoom(
        data.hotelRoom,
      );

      if (!hotelRoom || !hotelRoom.isEnabled) throw new BadRequestException();

      const newReservation = new this.reservationsModel({
        ...data,
        roomId: data.hotelRoom,
        userId: id,
        hotelId: hotelRoom.hotel,
      });
      await newReservation.save();
      return newReservation;
    } catch (error) {
      return error;
    }
  }
}
