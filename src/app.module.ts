import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    UsersModule,
    AuthModule,
    HotelModule,
  ],
  controllers: [AppController, HotelController],
  providers: [AppService],
})
export class AppModule {}
