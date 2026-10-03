import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {

    //dependency injection
    constructor(private readonly authService:AuthService,private readonly userService:UserService){
    }
    @Post('register')
     async register(@Body() registerUserDto:RegisterDto){
        const token=await this.authService.registerUser(registerUserDto);
        return token;
    }

    @Post('login')
    async login(@Body() loginUserDto:LoginDto){
            const token=await this.authService.loginUser(loginUserDto)
            return token
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Request() req:any){
        const userId=req.user.sub
        const user=await this.userService.getUserById(userId)
        
        return {
            _id:user?._id,
            fname:user?.fname,
            lname:user?.lname,
            email:user?.email
        }
    }
}
