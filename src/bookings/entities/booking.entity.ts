import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { MeetingRoom } from '../../meeting-room/entities/meeting-room.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  user: UserEntity;

  @ManyToOne(() => MeetingRoom, (meetingRoom) => meetingRoom.bookings)
  meetingRoom: MeetingRoom;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
