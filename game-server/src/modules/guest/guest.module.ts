import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Guest } from './entities/guest.entity';
import { GuestController } from './guest.controller';
import { GuestRepository } from './guest.repository';
import { GuestValidatorService } from './services/guest-validator.service';
import { GuestService } from './services/guest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  controllers: [GuestController],
  providers: [GuestService, GuestValidatorService, GuestRepository],
  exports: [GuestService],
})
export class GuestModule {}
