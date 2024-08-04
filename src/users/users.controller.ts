import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/gurads/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/gurads/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  
  @Post('signup')
  async signup(@Body()  UserSignUpDto:UserSignUpDto):Promise<{user:UserEntity}>{
    return {user:await this.usersService.signup(UserSignUpDto)};
  }

  @Post('signin')
  async signin(@Body() UserSignInDto:UserSignInDto){
    const user= await this.usersService.signin(UserSignInDto);
    const accessToken=await this.usersService.accessToken(user);
    return {accessToken,user}; 
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard,AuthorizeGuard)
  @Get('all')
  async findAll(): Promise<UserEntity[]>{
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.remove(+id);
  }
 
  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser:UserEntity){
    return currentUser;

  }

}
