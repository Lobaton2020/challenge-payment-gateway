import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}


export class BaseStatusDto extends BaseNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
export class BaseNameAndUserIdDto extends BaseNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
