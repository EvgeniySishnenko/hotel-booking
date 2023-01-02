import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/api/auth/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

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
}
