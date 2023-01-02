import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, // private jwtService: JwtService,
  ) {}

  async registration(userDTO: CreateUserDTO) {
    console.log(userDTO);

    if (!userDTO) {
      throw {
        message: 'Данные должны быть заполненны',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const candidate = await this.userService.findByEmail(userDTO.email);
    if (candidate) {
      throw {
        message: 'Пользователь с таким email уже существует',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return await this.userService.create(userDTO);
  }
}
