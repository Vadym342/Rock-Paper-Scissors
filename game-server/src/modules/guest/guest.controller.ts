import { Body, Controller, HttpCode, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetGuestResponseType } from './constants/guest.types';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GetGuestListResponseDto } from './dto/get-guest-list.response.dto';
import { GuestIdDto } from './dto/guest-id-param.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { GuestValidatorService } from './services/guest-validator.service';
import { GuestService } from './services/guest.service';
import { DeleteGuestAPIDocumentation } from './swagger/delete-user-documentation.decorator';
import { GetGuestAPIDocumentation } from './swagger/get-one-user-documentation.decorator';
import { GetGuestListAPIDocumentation } from './swagger/get-user-list-documentation.decorator';
import { PostGuestAPIDocumentation } from './swagger/post-user-documentation.decorator';
import { UpdateGuestAPIDocumentation } from './swagger/update-user-documentation.decorator';

@ApiTags('Guest')
@Controller('guest')
export class GuestController {
  private readonly logger = new Logger(GuestController.name);
  constructor(
    private readonly guestService: GuestService,
    private readonly guestValidatorService: GuestValidatorService,
  ) {}

  @Post()
  @PostGuestAPIDocumentation()
  async createGuest(@Body() createGuestDto: CreateGuestDto): Promise<string> {
    this.logger.log('Creating Guest');

    return this.guestService.createGuest(createGuestDto);
  }

  @Get()
  @GetGuestListAPIDocumentation()
  async getAllGuests(): Promise<GetGuestListResponseDto> {
    this.logger.log('Getting all Guests');

    return this.guestService.getAllGuests();
  }

  @Get(':id')
  @GetGuestAPIDocumentation()
  async getOneGuest(@Param() { id }: GuestIdDto): Promise<GetGuestResponseType> {
    this.logger.log('Getting one Guest');

    await this.guestValidatorService.doesGuestExist(id);

    return this.guestService.getOneGuest(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateGuestAPIDocumentation()
  async updateGuest(@Param() { id }: GuestIdDto, @Body() updateGuestDto: UpdateGuestDto): Promise<void> {
    this.logger.log('Updating Guest');

    await this.guestValidatorService.doesGuestExist(id);

    await this.guestService.updateGuest(id, updateGuestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteGuestAPIDocumentation()
  async deleteGuest(@Param() { id }: GuestIdDto): Promise<void> {
    this.logger.log('Deleting Guest');

    await this.guestValidatorService.doesGuestExist(id);

    await this.guestService.deleteGuest(id);
  }
}
