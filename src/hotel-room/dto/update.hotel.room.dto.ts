import { IsBoolean } from 'class-validator';
import { CreateHotelRoomDTo } from './create.hotel.room.dto';

export class UpdateHotelRoomDTO extends CreateHotelRoomDTo {
  @IsBoolean()
  readonly isEnabled: boolean;
}
