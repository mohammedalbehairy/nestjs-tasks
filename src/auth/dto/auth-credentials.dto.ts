import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {


    @IsString()
    @MinLength(2)
    @MaxLength(15)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    //@Matches('Regex here')
    password: string;
}