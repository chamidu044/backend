import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { MeetingRoom } from './entities/meeting-room.entity';

@Injectable()
export class MeetingRoomService {
  constructor(
    @InjectRepository(MeetingRoom)
    private readonly meetingRoomRepository: Repository<MeetingRoom>,
  ) {}

  async create(createMeetingRoomDto: CreateMeetingRoomDto): Promise<MeetingRoom> {
    console.log('Create MeetingRoom DTO:', createMeetingRoomDto);
    const meetingRoom = this.meetingRoomRepository.create(createMeetingRoomDto);
    return await this.meetingRoomRepository.save(meetingRoom);
  }

  async findAll(): Promise<MeetingRoom[]> {
    return await this.meetingRoomRepository.find();
  }

  async findOne(id: number): Promise<MeetingRoom> {
    return await this.meetingRoomRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMeetingRoomDto: UpdateMeetingRoomDto): Promise<MeetingRoom> {
    await this.meetingRoomRepository.update(id, updateMeetingRoomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<MeetingRoom> {
    const meetingroom = await this.findOne(id);
    await this.meetingRoomRepository.remove(meetingroom);
    return meetingroom;  
  }
}
