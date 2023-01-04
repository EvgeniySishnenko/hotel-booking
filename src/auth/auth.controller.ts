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
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './common/jwt.auth.guard';
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

  @Post('/api/auth/logout')
  async logout(@Res() res: any, @Req() request: any) {
    // console.log(req.headers.authorization, req.headers);
    // delete req.headers.authorization;
    // res.clearCookie('jwt');
    // return {
    //   l: 'res.clearCookie',
    // };
    // res.clearCookie('jwt');
    // res.redirect('/');

    return;
  }
}
