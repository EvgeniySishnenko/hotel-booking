import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current.user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { Role } from 'src/users/enums/roles.enum';
import { User } from 'src/users/schemas/user.schemas';
import { CreateSupportRequestDto } from './dto/create.support.request.dto';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @UseGuards(new RolesGuard([Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Post('/api/client/support-requests')
  async createSupportRequest(
    @Body() data: CreateSupportRequestDto,
    @CurrentUser() user: User & { _id: TID },
  ) {
    return await this.supportService.createSupportRequest(data, user);
  }
}
