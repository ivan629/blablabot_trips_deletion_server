/**
 * List of all HTTP codes used in API application
 */
export const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    NO_DATA: 204,
    MOVED_PERMANENTLY: 301,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

export const HTTP_CUSTOM_CODES = {
    JWT_TOKEN_INVALID: 401,
};

export const HTTP_CODE_ERRORS = {
    [HTTP_CODES.BAD_REQUEST]:
        'Cannot process request. One or more parameters are missed or not valid.',
    [HTTP_CODES.NOT_FOUND]: 'Requested resource not found.',
    [HTTP_CODES.CONFLICT]:
        'Request could not be completed due to conflict with the current state of requested resource.',
    [HTTP_CODES.UNAUTHENTICATED]:
        'You are not authenticated for this resource.',
    [HTTP_CODES.UNAUTHORIZED]: 'You are not authorized for this resource.',
    [HTTP_CODES.INTERNAL_SERVER_ERROR]:
        'Unexpected server error occurred while calling API.',
    [HTTP_CUSTOM_CODES.JWT_TOKEN_INVALID]: 'Invalid JWT token',
};
