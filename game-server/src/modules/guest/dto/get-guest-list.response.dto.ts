import { ApiProperty } from '@nestjs/swagger';

export class GuestListType {
  @ApiProperty({ example: 'c3adcab6-d403-4563-80ff-dae1e0fe4e30' })
  id: string;

  @ApiProperty({ example: 'Harry' })
  firstName: string;

  @ApiProperty({ example: 1 })
  status: number;
}

export class GetGuestListResponseDto {
  total: number;
  data: GuestListType[];
}
