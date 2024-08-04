import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { MeetingRoomModule } from '../meeting-room/meeting-room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), MeetingRoomModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
