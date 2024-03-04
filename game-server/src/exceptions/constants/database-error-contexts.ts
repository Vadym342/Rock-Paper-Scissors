import { validateErrorContexts } from '@src/exceptions/utils/validate-error-contexts';

export const DATABASE_ERROR_CONTEXT = {
  // Default
  DEFAULT_DATABASE_ERROR: {
    errorCode: 20000,
    message: 'Database error happened',
  },

  // User
  USER_CREATE_ONE: {
    errorCode: 20101,
    message: 'Create user entity exception',
  },
  USER_GET_ONE: {
    errorCode: 20102,
    message: 'Select one user entity exception',
  },
  USER_GET_AUTH_ONE: {
    errorCode: 20103,
    message: 'Select one auth user entity exception',
  },
  USER_GET_MANY: {
    errorCode: 20104,
    message: 'Select many user entities exception',
  },
  USER_UPDATE_ONE: {
    errorCode: 20105,
    message: 'Update user entity exception',
  },
  USER_DELETE_ONE: {
    errorCode: 20106,
    message: 'Delete user entity exception',
  },

  // Guest
  GUEST_CREATE_ONE: {
    errorCode: 20201,
    message: 'Create Guest entity exception',
  },
  GUEST_GET_ONE: {
    errorCode: 20202,
    message: 'Select one Guest entity exception',
  },
  GUEST_GET_AUTH_ONE: {
    errorCode: 20203,
    message: 'Select one auth Guest entity exception',
  },
  GUEST_GET_MANY: {
    errorCode: 20204,
    message: 'Select many Guest entities exception',
  },
  GUEST_UPDATE_ONE: {
    errorCode: 20205,
    message: 'Update Guest entity exception',
  },
  GUEST_DELETE_ONE: {
    errorCode: 20206,
    message: 'Delete Guest entity exception',
  },
};

validateErrorContexts(DATABASE_ERROR_CONTEXT, 'Database');
