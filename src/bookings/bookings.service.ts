import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(MeetingRoom)
    private readonly meetingRoomRepository: Repository<MeetingRoom>
  ) {}

  async create(createBookingDto: CreateBookingDto, currentUser: UserEntity): Promise<Booking> {
    const meetingRoom = await this.meetingRoomRepository.findOne({
      where: { id: createBookingDto.meetingRoomId },
    });
  
    if (!meetingRoom) {
      throw new NotFoundException('Meeting room not found');
    }
  
    const bookingStart = new Date(createBookingDto.startTime);
    const bookingEnd = new Date(createBookingDto.endTime);
    console.log(bookingStart);
    console.log(bookingEnd);
  
    const overlappingBookings = await this.bookingRepository.find({
      where: {
        meetingRoom: meetingRoom,
        startTime: LessThanOrEqual(bookingEnd),
        endTime: MoreThanOrEqual(bookingStart),
      },
    });
    console.log('Overlapping bookings found:', overlappingBookings.map(b => ({
      id: b.id,
      startTime: b.startTime.toISOString(),
      endTime: b.endTime.toISOString(),
    })));
  
    if (overlappingBookings.length > 0) {
      throw new BadRequestException('Meeting room is already booked for the selected time frame');
    }
  
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user: currentUser,
      meetingRoom: meetingRoom,
    });
  
    return await this.bookingRepository.save(booking);
  }
  
  async findAll() {
    return await this.bookingRepository.find({
      relations: ['user', 'meetingRoom'],
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'meetingRoom'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    Object.assign(booking, updateBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<Booking> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
    return booking;
  }
}
