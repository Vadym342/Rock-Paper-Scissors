import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import {
  SwaggerError400Response,
  SwaggerError404Response,
  SwaggerError401Response,
  SwaggerError503Response,
} from '@modules/execption/swagger/resources';

import { UpdateGuestDto } from '../dto/update-guest.dto';

export function UpdateGuestAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Guest',
      description: 'Update Guest',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'Guest was successfully updated',
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: SwaggerError400Response,
    }),
    ApiBadRequestResponse({
      description: 'Not found error',
      type: SwaggerError404Response,
    }),
    ApiUnauthorizedResponse({
      description: 'Not authorized',
      type: SwaggerError401Response,
    }),
    ApiServiceUnavailableResponse({
      description: 'Service error',
      type: SwaggerError503Response,
    }),
    ApiBody({
      type: UpdateGuestDto,
      examples: {
        validGuestResponse: {
          summary: 'Guest updates ',
          value: validGuestResponse,
        },
      },
    }),
  );
}

const validGuestResponse: UpdateGuestDto = {
  firstName: 'Jesse',
  status: 3,
};
