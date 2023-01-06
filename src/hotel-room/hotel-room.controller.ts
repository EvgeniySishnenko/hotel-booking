import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateHotelRoomDTo } from './dto/create.hotel.room.dto';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoom } from './schemas/hotelRoom.schemas';
import { saveImagesToStorage } from './utils/save.images..to.storage';

@Controller('hotel-room')
export class HotelRoomController {
  constructor(private hotelRoomService: HotelRoomService) {}

  /** еще guard нужен- 403 - если роль пользователя не admin. */
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/api/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  async create(@UploadedFiles() file, @Body() data: CreateHotelRoomDTo) {
    try {
      return await this.hotelRoomService.create(data, file);
    } catch (error) {
      return error;
    }
  }

  async getHotelRooms() {
    // return await this.hotelRoomService.getHotelRooms();
  }

  //   findById(id: ID): Promise<HotelRoom>;
  //   search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  //   update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;

  /** еще guard нужен- 403 - если роль пользователя не admin. */
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  @Put('/api/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  update(@UploadedFiles() file, @Body() data, @Req() req: Request) {
    return;
  }
}
