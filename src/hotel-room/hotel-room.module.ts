import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from 'src/hotel/hotel.module';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoom, HotelRoomSchema } from './schemas/hotelRoom.schemas';

@Module({
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
  exports: [HotelRoomService],
  imports: [
    HotelModule,
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
})
export class HotelRoomModule {}
