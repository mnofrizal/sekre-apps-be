export class ApiResponse {
  static success(message, data = null, statusCode = 200) {
    return {
      success: true,
      message,
      data
    };
  }

  static error(message, errors = [], statusCode = 500) {
    return {
      success: false,
      message,
      errors: Array.isArray(errors) ? errors : [errors]
    };
  }
}