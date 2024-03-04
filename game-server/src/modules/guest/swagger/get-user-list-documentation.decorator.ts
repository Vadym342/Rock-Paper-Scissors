import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
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

export function GetGuestListAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Guest list ',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(GetGuestListResponse),
    ApiOkResponse({
      description: 'Guest list was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(GetGuestListResponse),
        },
        example: validGuestListResponse,
      },
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
export class GuestResponse {
  @ApiProperty({
    example: 'a87e37b5-09ac-447c-baf0-dfba9e224d3b',
    type: 'string',
    format: 'uuid',
    nullable: false,
  })
  id: string;

  @ApiProperty({
    example: 'Harry',
    type: 'string',
    nullable: false,
  })
  firstName: string;

  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'float',
    nullable: false,
  })
  status: number;
}

export class GetGuestListResponse {
  @ApiProperty({
    example: 1,
    type: 'integer',
  })
  total: number;

  @ApiProperty({
    type: () => [GuestResponse],
  })
  data: GuestResponse[];
}
export const validGuestListResponse: GetGuestListResponse = {
  total: 2,
  data: [
    {
      id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
      status: 3,
      firstName: 'test',
    },
    {
      id: 'ac636b9b-a948-4d3e-bae4-b08313504554',
      status: 2,
      firstName: 'dsfsgsdg',
    },
  ],
};
