import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RideService } from '../services/ride.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import { AccessDriver, AccessRider } from '@app/auth/decorators/role.decorator';
import { EndRideDto, StartRideDto } from '../dto/start-ride.dto';

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

  @AccessRider()
  @Post(':ride_id/start')
  start(
    @Req() req,
    @Body() data: StartRideDto,
    @Param('ride_id', ParseIntPipe) rideId: number,
  ) {
    return this.rideService.start(req.riderId, rideId, data);
  }

  @AccessDriver()
  @Post(':ride_id/end')
  end(
    @Req() req,
    @Body() data: EndRideDto,
    @Param('ride_id', ParseIntPipe) rideId: number,
  ) {
    return this.rideService.end(req.riderId, rideId, data);
  }
}
