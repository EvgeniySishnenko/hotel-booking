import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);

    return this.generateToken(user);
  }

  private async validateUser(loginDTO: LoginDTO) {
    if (!loginDTO) {
      throw new UnauthorizedException({
        message: 'Данные должны быть заполненны',
      });
    }
    const user = await this.userService.findByEmail(loginDTO.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Не корректный email или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Не корректный email или пароль',
    });
  }
  /** не знаю какой тип прописать для user. на ID ругается */
  private async generateToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
  async registration(userDTO: CreateUserDTO) {
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

    const hashPassword = await bcrypt.hash(userDTO.password, 5);

    return await this.userService.create({
      ...userDTO,
      password: hashPassword,
    });
  }
}
