import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    email:string


    @IsString()
    @IsNotEmpty()
    password: string;
}