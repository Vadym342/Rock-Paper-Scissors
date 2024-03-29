import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import {
  SwaggerError400Response,
  SwaggerError401Response,
  SwaggerError404Response,
  SwaggerError503Response,
} from '@modules/execption/swagger/resources';

export function DeleteGuestAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Guest',
      description: 'Delete Guest',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'Guest was successfully deleted',
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
  );
}
