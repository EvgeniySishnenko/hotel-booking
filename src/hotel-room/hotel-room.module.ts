import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoom, HotelRoomSchema } from './schemas/hotelRoom.schemas';

@Module({
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
  exports: [HotelRoomService],
  imports: [
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
})
export class HotelRoomModule {}
