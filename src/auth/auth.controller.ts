import { Controller, Post, Body, Req, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { RefreshTokenDto } from './dtos/refreshToken';
import { SignInDto } from './dtos/signIn.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: CreateUserDto) {
    const { password, ...rest } = await this.authService.create(user);
    this.logger.log('User created successfully');
    return rest;
  }

  @Post('/refreshToken')
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.getNewToken(data.refreshToken);
  }
  @ApiBody({
    type: SignInDto,
  })
  @Post('/signin')
  @UseGuards(AuthGuard('local'))
  signin(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
