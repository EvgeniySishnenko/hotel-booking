import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
}
