import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
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
        const payload={sub: user._id}
       const token= await this.jwtService.signAsync(payload)
        return {AccessToken:token}
    }
}
