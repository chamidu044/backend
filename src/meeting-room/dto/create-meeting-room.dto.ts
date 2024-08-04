import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMeetingRoomDto {
    @IsNotEmpty({message:'Name can not be empty'})
    @IsString({message:'name should be string'})
    name:string;

    @IsNotEmpty({message:'Number can not be empty'})
    capacity: number;

    @IsNotEmpty({message:'Name can not be empty'})
    @IsString({message:'name should be string'})
    location:string;
  }
  
  