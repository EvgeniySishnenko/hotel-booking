import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { CurrentUser } from 'src/auth/decorator/current.user.decorator';
import { IFindSearchParams } from 'src/hotel/interfaces/find-search.params.interface';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { User } from 'src/users/schemas/user.schemas';
import { CreateHotelRoomDTo } from './dto/create.hotel.room.dto';
import { UpdateHotelRoomDTO } from './dto/update.hotel.room.dto';
import { CheckAuthGuard } from './guards/check.auth.guard';
import { HotelRoomService } from './hotel-room.service';
import { TID } from './interfaces/hotel.room.interfaces';
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

  @UseGuards(CheckAuthGuard)
  @Get('/api/common/hotel-rooms')
  async getHotelRooms(
    @CurrentUser() user: User & { _id: TID },
    @Query() params: IFindSearchParams,
  ) {
    return await this.hotelRoomService.getHotelRooms(params, user);
  }

  /** еще guard нужен- 403 - если роль пользователя не admin. */
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/api/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  async update(
    @UploadedFiles() file,
    @Body() data: UpdateHotelRoomDTO,
    @Param('id') id: string,
  ) {
    try {
      return await this.hotelRoomService.update(data, file, id);
    } catch (error) {
      return error;
    }
  }
}
