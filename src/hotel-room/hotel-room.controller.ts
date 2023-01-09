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

  /** Денис Владимиров
   * 
   * В этом методе нужно:
   * 
   * Если пользователь не аутентифицирован или его роль client, 
   * то при поиске всегда должен использоваться флаг isEnabled: true. 
   * 
   * Я решил, что нужно проверить авторизован ли пользователь  req.isAuthenticated()
   * и потом получить юзера из базы и проверить у него роль.
   * Но я не знаю, как можно проверить авторизован ли пользователь. 
   * @UseGuards(JwtAuthGuard) блокирует и выбрасывает ошибку.
   * Не могу понять верный ли способ я выбрал или нужен другой. Не могу найти правильное решение
   * 
   * Подскажите, пожалуйста, как мне решить эту задачу?
   * */
  @Get('/api/common/hotel-rooms')
  async getHotelRooms(@Query() params: IFindSearchParams, @Request() req) {

    return await this.hotelRoomService.getHotelRooms(params);
  }


  /** еще guard нужен- 403 - если роль пользователя не admin. */
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Put('/api/admin/hotel-rooms/:id')
  @UseInterceptors(FilesInterceptor('file', 10, saveImagesToStorage))
  update(@UploadedFiles() file, @Body() data) {
    return;
  }
}
