import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health_check')
  healthCheck(): object {
    return { message: 'Service works' };
  }
}
