import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}
  async createUser (registerUserDto:RegisterDto){

     try {
         return   await this.userModel.create(
            {
                fname:registerUserDto.fname,
                lname:registerUserDto.lname,
                email:registerUserDto.email,
                password:registerUserDto.password,
                role:registerUserDto.role
            }
        )
       
     } catch (error:any) {
        console.log(error)
        const DUPLICATE_KEY_CODE=11000
        if (error.code === DUPLICATE_KEY_CODE) {
    console.log('Duplicate key:', error.keyPattern);
    console.log('Duplicate value:', error.keyValue);

    const field = Object.keys(error.keyPattern)[0];

    throw new ConflictException(
      `${field} already exists`,
    );
  }

  throw error;
     }  
    }

  async findByEmail(email: string) {
    console.log("email",email)
    return await this.userModel.findOne({ email });
  }

  async getUserById(id:string){
    return await this.userModel.findOne({_id:id})
  }
}
