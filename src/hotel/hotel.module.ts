import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Module({
  controllers: [HotelService],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
