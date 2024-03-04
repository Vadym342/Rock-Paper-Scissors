import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { NotFoundException } from '@src/exceptions/not-found.exception';

import { Guest } from '../entities/guest.entity';

@Injectable()
export class GuestValidatorService {
  constructor(@InjectRepository(Guest) private readonly guestRepository: Repository<Guest>) {}
  async doesGuestExist(id?: string): Promise<boolean> {
    let guest = {};

    if (id) {
      guest = await this.doesGuestEntityExistById(id);
    }

    if (!guest) {
      throw new NotFoundException(VALIDATION_ERROR_CONTEXT.GUEST_ENTITY_NOT_FOUND);
    }

    return true;
  }

  private async doesGuestEntityExistById(id: string): Promise<boolean> {
    return await this.guestRepository.exists({ where: { id } });
  }
}
