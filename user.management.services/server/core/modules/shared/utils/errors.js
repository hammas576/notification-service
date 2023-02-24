/* eslint-disable arrow-parens */
export default {
  badRequest: message => {
    const response = {
      statusCode: 400,
      success: false,
      error: message,
    };
    return response;
  },

  conflict: message => {
    const response = {
      statusCode: 409,
      success: false,
      error: message,
    };
    return response;
  },
  unauthorized: message => {
    const response = {
      statusCode: 401,
      success: false,
      error: message,
    };
    return response;
  },
  forbidden: message => {
    const response = {
      statusCode: 403,
      success: false,
      error: message,
    };
    return response;
  },
  server: message => {
    const response = {
      statusCode: 500,
      success: false,
      error: message,
    };
    return response;
  },
};
