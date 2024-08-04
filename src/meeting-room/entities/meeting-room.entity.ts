import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class MeetingRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Booking, (booking) => booking.meetingRoom)
  bookings: Booking[];

  @Column()
  capacity: number;

  @Column()
  location: string;
}
