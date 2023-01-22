import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current.user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { IFindSearchParams } from 'src/hotel/interfaces/find-search.params.interface';
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

  @UseGuards(new RolesGuard([Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/client/support-requests/')
  async getSupportCallsClient(
    @Query() params: Omit<IFindSearchParams & { isActive: boolean }, 'hotel'>,
  ) {
    try {
      const result = await this.supportService.getSupportCalls(params);
      return result;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Manager]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/manager/support-requests/')
  async getSupportCallsManager(
    @Query() params: Omit<IFindSearchParams & { isActive: boolean }, 'hotel'>,
  ) {
    try {
      const result = await this.supportService.getSupportCallsManager(params);
      return result;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(new RolesGuard([Role.Manager, Role.Client]))
  @UseGuards(JwtAuthGuard)
  @Get('/api/common/support-requests/:id/messages')
  async getHistoryMessageSupportCalls(@Param('id') id: string) {
    try {
      return await this.supportService.getHistoryMessageSupportCalls(id);

      // [
      //   {
      //     id: string,
      //     createdAt: string,
      //     text: string,
      //     readAt: string,
      //     author: {
      //       id: string,
      //       name: string,
      //     },
      //   },
      // ];
    } catch (error) {
      return error;
    }
  }
  /**2.5.5. Доступно только пользователям с ролью manager и пользователю с ролью client, который создал обращение. */
  async sendMessage() {
    try {
    } catch (error) {
      return error;
    }
  }

  @Post('/api/common/support-requests/:id/messages/read')
  async markMessagesAsRead() {}
}
