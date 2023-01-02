import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, // private jwtService: JwtService,
  ) {}

  async registration(userDTO: CreateUserDTO) {
    // const candidate = await this.userService.getUsersByEmail(userDTO.email);

    const user = await this.userService.create(userDTO);
  }
}
