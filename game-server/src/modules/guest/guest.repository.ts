import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DATABASE_ERROR_CONTEXT, DatabaseException } from '@src/exceptions';

import { GetGuestResponseType } from './constants/guest.types';
import { CreateGuestDto } from './dto/create-guest.dto';
import { GetGuestListResponseDto } from './dto/get-guest-list.response.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';

@Injectable()
export class GuestRepository extends Repository<Guest> {
  private readonly logger = new Logger(GuestRepository.name);

  constructor(@InjectRepository(Guest) repository: Repository<Guest>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreateGuestDto): Promise<string> {
    try {
      const guest = await this.save(data);

      return guest.id;
    } catch (error) {
      this.logger.log('Creating Guest exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.GUEST_CREATE_ONE);
    }
  }

  async getOne(id: string): Promise<GetGuestResponseType> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      this.logger.log('Selecting Guest exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.GUEST_GET_ONE);
    }
  }

  async getAll(): Promise<GetGuestListResponseDto> {
    try {
      const skip = 0; //Change to Option from params
      const take = 10; //Change to Option from params
      const [data, total] = await this.findAndCount({
        select: {
          firstName: true,
          status: true,
        },
        take,
        skip,
      });

      return { total, data };
    } catch (error) {
      this.logger.log('Selecting Guest exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.GUEST_GET_MANY);
    }
  }

  async updateOne(id: string, data: UpdateGuestDto): Promise<void> {
    try {
      await this.update(id, data);
    } catch (error) {
      this.logger.log('Updating Guest exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.GUEST_UPDATE_ONE);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.log('Deleting Guest exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.GUEST_DELETE_ONE);
    }
  }
}
