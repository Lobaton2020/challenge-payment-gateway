import {
  IsCreditCard,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePaymentMethodCardDto {
  @IsNotEmpty()
  @IsString()
  @IsCreditCard()
  number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  cvc: string;

  @IsNotEmpty()
  @IsNumberString()
  exp_month: string;

  @IsNotEmpty()
  @IsNumberString()
  exp_year: string;

  @IsNotEmpty()
  @IsString()
  card_holder: string;
}

export class CreatePaymentMethodNequiDto {
  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
