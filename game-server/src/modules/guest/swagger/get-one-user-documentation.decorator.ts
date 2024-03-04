import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import {
  SwaggerError400Response,
  SwaggerError401Response,
  SwaggerError404Response,
  SwaggerError503Response,
} from '@modules/execption/swagger/resources';

import { GuestResponse } from './get-user-list-documentation.decorator';

export function GetGuestAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get one Guest',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(GuestResponse),
    ApiOkResponse({
      description: 'Guest was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(GuestResponse),
        },
        example: validGuestListResponse,
      },
    }), //! TODO: Add from validation Context
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
export const validGuestListResponse: GuestResponse = {
  id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
  firstName: 'test',
  status: 3,
};
