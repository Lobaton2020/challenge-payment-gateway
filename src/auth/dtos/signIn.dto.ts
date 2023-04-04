import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsString } from "class-validator";
import { IsPassword } from '../../common/decorators/is-password.decorator'
export class SignInDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPassword()
    password:string;
}