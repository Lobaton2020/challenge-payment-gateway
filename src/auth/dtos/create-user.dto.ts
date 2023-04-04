import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPassword } from '../../common/decorators/is-password.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  completeName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPassword()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
