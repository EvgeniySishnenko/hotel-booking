import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
import { HotelRoomService } from './hotel-room/hotel-room.service';
import { HotelRoomModule } from './hotel-room/hotel-room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public/images'),
    }),
    UsersModule,
    AuthModule,
    HotelModule,
    HotelRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
