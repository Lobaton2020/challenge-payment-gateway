import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/config/constants.config';
import { IJwtConfig } from 'src/config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<IJwtConfig>(JWT_CONFIG).secretKey,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      riderId: payload.riderId,
      driverId: payload.driverId,
      role: payload.rol.name,
    };
  }
}
