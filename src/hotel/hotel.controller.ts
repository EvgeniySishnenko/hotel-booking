import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { AddHotelParamsDTO } from './dto/add.hotel.params.dto';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/api/admin/hotels')
  async addHotel(@Body() addHotelDTO: AddHotelParamsDTO) {
    console.log(addHotelDTO);

    const hotel = await this.hotelService.addHotel(addHotelDTO);
    return {
      id: hotel._id,
      title: hotel.title,
      description: hotel.description,
    };
  }
}
