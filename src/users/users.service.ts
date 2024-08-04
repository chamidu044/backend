import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash,compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { IsEmail } from 'class-validator';
import { sign } from 'jsonwebtoken';
import {config} from 'dotenv'
config()

@Injectable()
export class UsersService {
  

  constructor(
    
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async signup(UserSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExists=await this.findUserByEmail(UserSignUpDto.email)
    if(userExists) throw new BadRequestException('Email already exists')
    UserSignUpDto.password=await hash(UserSignUpDto.password,10)
    let user=this.usersRepository.create(UserSignUpDto);
    user=await this.usersRepository.save(user);
    delete user.password
    return user;
  }

  async signin(UserSignInDto:UserSignInDto){
    const userExists=await this.usersRepository.createQueryBuilder('users').addSelect('users.password')
    .where('users.email=:email',{email:UserSignInDto.email}).getOne();
    if(!userExists) throw new BadRequestException( 'Bad credentials')
    const matchpassword=await compare(UserSignInDto.password,userExists.password);
    if(!matchpassword) throw new BadRequestException( 'Bad credentials.')
    delete userExists.password;

    return userExists;    
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() : Promise<UserEntity[]>{
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user= await this.usersRepository.findOneBy({id})
    if(!user) throw new NotFoundException( 'User not found')
    return user
  } 

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    return user;
  }
  
  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email});
  }

  async accessToken(user:UserEntity){
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
  }
}
