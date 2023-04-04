import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/config/constants.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IJwtConfig } from 'src/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { RolsService } from './services/rols.service';
import { CommonModule } from 'src/common/common.module';
import { User } from './entities/User.entity';
import { Rol } from './entities/Rol.entity';
import { Address } from './entities/Address.entity';

const JwtModuleProvider = JwtModule.registerAsync({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<IJwtConfig>(JWT_CONFIG).secretKey,
    signOptions: {
      expiresIn: `${configService.get<IJwtConfig>(JWT_CONFIG).expirationTime}s`,
    },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol, Address]),
    JwtModuleProvider,
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    RolsService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
