import { Booking } from "src/bookings/entities/booking.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({unique:true})
  email: string;

  @Column({select:false})
  password: string;

  @Column({ type: 'json', default: JSON.stringify([Roles.USER]) })
  roles: Roles[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
  
  @CreateDateColumn()
  createdAt:Timestamp;
  @UpdateDateColumn()
  updatedAt:Timestamp;
}
