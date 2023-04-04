import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RideService } from '../services/ride.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import { AccessRider } from '@app/auth/decorators/role.decorator';

@Controller('rides')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @AccessRider()
  @Post()
  create(@Req() req) {
    return this.rideService.create(req.riderId);
  }
}
