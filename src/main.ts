import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


 /** Денис Владимиров
   * 
   * Вопрос 1

   * В методе create нужно:
   * ссылка на файл src\hotel-room\hotel-room.service.ts
  
   * Не могу добавить отель как зависимость, 
   * Если джобавить id,  добавляется id  как строка, но не объект hotel. 
   * Сделал в лоб реализацию 
   * 
   * Вопрос 2
   * 
   * В методе getHotelRooms нужно:
   * ссылка на файл src\hotel-room\hotel-room.controller.ts
   * 
   * Если пользователь не аутентифицирован или его роль client, 
   * то при поиске всегда должен использоваться флаг isEnabled: true. 
   * 
   * Я решил, что нужно проверить авторизован ли пользователь  req.isAuthenticated()
   * и потом получить юзера из базы и проверить у него роль.
   * Но я не знаю, как можно проверить авторизован ли пользователь. 
   * @UseGuards(JwtAuthGuard) блокирует и выбрасывает ошибку.
   * Не могу понять верный ли способ я выбрал или нужен другой. Не могу найти правильное решение
   * 
   * Подскажите, пожалуйста, как мне решить эту задачу?
   * */