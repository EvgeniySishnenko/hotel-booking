import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/decorators/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { Role } from './enums/roles.enum';
import { ISearchParams } from './interfaces/search.params.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /** 403 - если роль пользователя не admin */
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  @Post('/api/admin/users/')
  @UsePipes(ValidationPipe)
  async create(@Body() registrationDTO: CreateUserDTO) {
    try {
      const user = await this.authService.registration(registrationDTO);
      return {
        email: user.email,
        password: user.password,
        name: user.lastName,
        contactPhone: user.contactPhone,
        role: user.role,
      };
    } catch (error) {
      return error;
    }
  }

  @Get('/api/admin/users/')
  async findUsers(@Query() params: ISearchParams) {
    try {
      return await this.usersService.findUsers(params);
    } catch (error) {
      return error;
    }
  }
}
