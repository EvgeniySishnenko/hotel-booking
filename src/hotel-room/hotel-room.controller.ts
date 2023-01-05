import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { HotelRoomService } from './hotel-room.service';
import { saveImagesToStorage } from './utils/save.images..to.storage';
@Controller('hotel-room')
export class HotelRoomController {
  constructor(private hotelRoomService: HotelRoomService) {}

  /** еще guard нужен- 403 - если роль пользователя не admin. */
  // @UseGuards(JwtAuthGuard)
  @Post('/api/admin/hotel-rooms')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  async create(@UploadedFiles() file, @Body() data) {
    return this.hotelRoomService.create(data, file);
  }

  //   findById(id: ID): Promise<HotelRoom>;
  //   search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  //   update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
