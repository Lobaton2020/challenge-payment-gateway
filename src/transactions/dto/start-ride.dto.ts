import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StartRideDto {
  @IsNotEmpty()
  @IsNumber()
  start_latitud: string;
  @IsNotEmpty()
  @IsNumber()
  start_longitud: string;
  @IsNotEmpty()
  @IsDateString()
  start_ride: string;
}

export class EndRideDto {
  @IsNotEmpty()
  @IsNumber()
  end_latitud: string;
  @IsNotEmpty()
  @IsNumber()
  end_longitud: string;
  @IsNotEmpty()
  @IsDateString()
  end_ride: string;
}
