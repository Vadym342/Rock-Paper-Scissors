import { Injectable, Logger } from '@nestjs/common';

import { GetGuestResponseType } from '../constants/guest.types';
import { CreateGuestDto } from '../dto/create-guest.dto';
import { GetGuestListResponseDto } from '../dto/get-guest-list.response.dto';
import { UpdateGuestDto } from '../dto/update-guest.dto';
import { GuestRepository } from '../guest.repository';

@Injectable()
export class GuestService {
  private readonly logger = new Logger(GuestService.name);
  constructor(private readonly guestEntityRepository: GuestRepository) {}

  async createGuest(data: CreateGuestDto): Promise<string> {
    this.logger.log('Creating new Guest');

    return await this.guestEntityRepository.createOne(data);
  }

  async getOneGuest(email: string): Promise<GetGuestResponseType> {
    this.logger.log('Getting Guest');

    return await this.guestEntityRepository.getOne(email);
  }

  async getAllGuests(): Promise<GetGuestListResponseDto> {
    this.logger.log('Getting Guest List');

    return await this.guestEntityRepository.getAll();
  }

  async updateGuest(id: string, data: UpdateGuestDto): Promise<void> {
    this.logger.log('Updating Guest');

    return await this.guestEntityRepository.updateOne(id, {
      firstName: data.firstName,
      status: data.status,
    });
  }

  async deleteGuest(id: string): Promise<void> {
    this.logger.log('Deleting Guest');

    return await this.guestEntityRepository.deleteOne(id);
  }
}
