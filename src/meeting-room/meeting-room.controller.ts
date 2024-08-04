import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Post()
  async create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return await this.meetingRoomService.create(createMeetingRoomDto);
  }

  @Get()
  findAll() {
    return this.meetingRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return this.meetingRoomService.update(+id, updateMeetingRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.meetingRoomService.remove(+id);
  }
}
