import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiServiceUnavailableResponse } from '@nestjs/swagger';

import { SwaggerError400Response, SwaggerError404Response, SwaggerError503Response } from '@modules/execption/swagger/resources';

import { CreateGuestDto } from '../dto/create-guest.dto';

export function PostGuestAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Guest',
      description: `
        <p>Create Guest</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'Guest sucssesfully created.',
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: SwaggerError400Response,
    }),
    ApiBadRequestResponse({
      description: 'Not found error',
      type: SwaggerError404Response,
    }),
    ApiServiceUnavailableResponse({
      description: 'Service error',
      type: SwaggerError503Response,
    }),
    ApiBody({
      type: CreateGuestDto,
      examples: {
        validGuestBodyExample: {
          value: validGuestBodyExample,
        },
      },
    }),
  );
}

export const validGuestBodyExample: CreateGuestDto = {
  firstName: 'Harry',
  status: 1,
};
