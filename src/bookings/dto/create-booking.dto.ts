import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'Start time cannot be empty' })
  @IsDate({ message: 'Start time must be a valid date' })
  @Type(() => Date)
  startTime: Date;

  @IsNotEmpty({ message: 'End time cannot be empty' })
  @IsDate({ message: 'End time must be a valid date' })
  @Type(() => Date)
  endTime: Date;

  @IsNotEmpty({ message: 'Room id cannot be empty' })
  @IsNumber()
  meetingRoomId: number;
}
