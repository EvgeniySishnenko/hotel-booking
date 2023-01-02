import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  // async create(data: Partial<User>): Promise<User> {}
  // async findById(id: ID): Promise<User> {}
  // async findAll(params: SearchUserParams): Promise<User[]> {}
  async create(data: Partial<CreateUserDTO>) {
    const newUser = new this.UserModel({ ...data, role: 'client' });
    return await newUser.save();
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });
    return user;
  }
}
