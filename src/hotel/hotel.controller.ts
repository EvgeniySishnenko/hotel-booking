import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { AddHotelParamsDTO } from './dto/add.hotel.params.dto';
import { HotelService } from './hotel.service';
import { IFindSearchParams } from './interfaces/find-search.params.interface';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  /** еще guard нужен- 403 - если роль пользователя не admin. */
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/api/admin/hotels')
  async addHotel(@Body() addHotelDTO: AddHotelParamsDTO) {
    try {
      const hotel = await this.hotelService.addHotel(addHotelDTO);
      return {
        id: hotel._id,
        title: hotel.title,
        description: hotel.description,
      };
    } catch (error) {
      return error;
    }
  }

  //   interface SearchHotelParams {
  //   limit: number;
  //   offset: number;
  //   title: string;
  // }
  @Get('/api/admin/hotels')
  async getHotels(@Query() params: IFindSearchParams) {
    try {
      const hotels = await this.hotelService.getHotels(params);
      return hotels;
    } catch (error) {
      return error;
    }
  }
}
