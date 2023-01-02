import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  // async create(data: Partial<User>): Promise<User> {}
  // async findById(id: ID): Promise<User> {}
  // async findByEmail(email: string): Promise<User> {}
  // async findAll(params: SearchUserParams): Promise<User[]> {}
  async create(data: Partial<User>) {
    const newUser = new this.UserModel(data);

    return newUser.save();
  }
}
