import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TID } from 'src/hotel-room/interfaces/hotel.room.interfaces';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schemas';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current.user.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/api/client/register')
  @UsePipes(ValidationPipe)
  async registration(@Body() registrationDTO: CreateUserDTO) {
    try {
      const user = await this.authService.registration(registrationDTO);
      return {
        id: user._id,
        email: user.email,
        name: user.lastName,
      };
    } catch (error) {
      return error;
    }
  }

  @Post('/api/auth/login')
  async login(@Req() req: Request, @Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/auth/logout')
  async logout(@CurrentUser() user: User & { _id: TID }) {
    return await this.authService.logout(user._id);
  }
}
