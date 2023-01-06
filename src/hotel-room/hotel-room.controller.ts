import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { IFindSearchParams } from 'src/hotel/interfaces/find-search.params.interface';
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

  @Get('/api/common/hotel-rooms/:id')
  async getHotelRoom(@Param('id') id: string) {
    try {
      return await this.hotelRoomService.getHotelRoom(id);
    } catch (error) {
      return error;
    }
  }

  /** В Этом методе нужно добавить проверку на isEnabled */
  @Get('/api/common/hotel-rooms')
  async getHotelRooms(@Query() params: IFindSearchParams) {
    return await this.hotelRoomService.getHotelRooms(params);
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
