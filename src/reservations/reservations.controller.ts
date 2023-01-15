import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/common/jwt.auth.guard';
import { CurrentUser } from 'src/auth/decorator/current.user.decorator';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { User } from 'src/users/schemas/user.schemas';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  /** 403 - если роль пользователя не client; */
  /** Метод IReservation.addReservation должен проверять, доступен ли номер на заданную дату. */

  @UseGuards(JwtAuthGuard)
  @Post('/api/client/reservations')
  async addReservation(
    @Body() data: ReservationDto,
    @CurrentUser() user: User & { _id: TID },
  ) {
    try {
      return await this.reservationsService.addReservation(data, user._id);
    } catch (error) {
      return error;
    }
  }
  /** 403 - если роль пользователя не client; */
  @UseGuards(JwtAuthGuard)
  @Get('/api/client/reservations')
  async getReservations(@CurrentUser() user: User & { _id: TID }) {
    try {
      return await this.reservationsService.getReservations(user._id);
    } catch (error) {
      return error;
    }
  }

  /** 403 - если роль пользователя не client; */
  @UseGuards(JwtAuthGuard)
  @Delete('/api/client/reservations/:id')
  async removeReservation(
    @Param() param: { id: string },
    @CurrentUser() user: User & { _id: TID },
  ) {
    try {
      return await this.reservationsService.removeReservation(param.id, user);
    } catch (error) {
      return error;
    }
  }

  /** 403 - если роль пользователя не manager; */
  @UseGuards(JwtAuthGuard)
  @Delete('/api/manager/reservations/:id')
  async removeManagerReservation(@Param() param: { id: string }) {
    try {
      return await this.reservationsService.removeManagerReservation(param.id);
    } catch (error) {
      return error;
    }
  }

  /**403 - если роль пользователя не manager. */
  // @UseGuards(JwtAuthGuard)
  @Get('/api/manager/reservations/:userId')
  async getUserReservations(@Param() param: { userId: string }) {
    try {
      return await this.reservationsService.getUserReservations(param.userId);
    } catch (error) {
      return error;
    }
  }
}
