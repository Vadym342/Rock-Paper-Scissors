import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class CreateGuestDto {
  @MaxLength(100, { context: VALIDATION_ERROR_CONTEXT.GUEST_FIRSTNAME_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.GUEST_FIRSTNAME_IS_NOT_STRING })
  firstName: string;

  @Max(3, { context: VALIDATION_ERROR_CONTEXT.GUEST_STATUS_INVALID })
  @Min(1, { context: VALIDATION_ERROR_CONTEXT.GUEST_STATUS_INVALID })
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.GUEST_STATUS_INVALID })
  status: number;
}
