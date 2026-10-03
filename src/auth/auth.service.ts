import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';
@Injectable()
export class AuthService {
    constructor (
        private readonly userService:UserService,
        private readonly jwtService:JwtService

    ){
    }
   async registerUser(registerUserDto:RegisterDto){
        console.log(registerUserDto)
        const salt=10;
        const hash=await bcrypt.hash(registerUserDto.password,salt)
        const user= await this.userService.createUser({...registerUserDto,password:hash})
        const payload={sub: user._id,role:user.role}
       const token= await this.jwtService.signAsync(payload)
        return {AccessToken:token}
    }

    async loginUser(loginUserDto:LoginDto){
       const user=await this.userService.findByEmail(loginUserDto.email)
       console.log(user)
       if(!user){
        throw new NotFoundException("User not found.")
       }
       const passwordMatch = await bcrypt.compare(
  loginUserDto.password,
  user.password,
);
       if(!passwordMatch){
        throw new UnauthorizedException("Invalid Credentials");
       }
       const payload={
        sub:user._id,
        role:user.role
       }
       const token=await this.jwtService.signAsync(payload)
       return {Accesstoken:token}

}}
