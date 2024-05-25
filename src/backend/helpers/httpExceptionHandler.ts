import { NextResponse } from "next/server";
import { HttpStatus } from "../enums/httpStatus";

export function httpExceptionHandler(
  errorMessage: string | object,
  status: HttpStatus
) {
  return NextResponse.json(errorMessage, { status });
}
function transformMessage(message: string | object) {
  if (typeof message === "string") {
    return { responseMessage: message };
  }
  return message;
}

export function HttpNotFoundHandler(
  message: string | object = "Not Found"
): NextResponse {
  return NextResponse.json(
    { status: HttpStatus.NOT_FOUND, message: transformMessage(message) },
    { status: HttpStatus.NOT_FOUND }
  );
}

export function HttpCreatedHandler(
  message: string | object = "Created"
): NextResponse {
  return NextResponse.json(
    { status: HttpStatus.CREATED, message: transformMessage(message) },
    { status: HttpStatus.CREATED }
  );
}

export function HttpBadRequestHandler(
  message: string | object = "Bad Request"
): NextResponse {
  return NextResponse.json(
    { status: HttpStatus.BAD_REQUEST, message: transformMessage(message) },
    { status: HttpStatus.BAD_REQUEST }
  );
}

export function HttpUnauthorizedHandler(
  message: string | object = "Unauthorized"
): NextResponse {
  return NextResponse.json(
    { status: HttpStatus.UNAUTHORIZED, message: transformMessage(message) },
    { status: HttpStatus.UNAUTHORIZED }
  );
}

export function HttpForbiddenHandler(
  message: string | object = "Forbidden"
): NextResponse {
  return NextResponse.json(
    { status: HttpStatus.FORBIDDEN, message: transformMessage(message) },
    { status: HttpStatus.FORBIDDEN }
  );
}

export function HttpMethodNotAllowedHandler(
  message: string | object = "Method Not Allowed"
): NextResponse {
  return NextResponse.json(
    {
      status: HttpStatus.METHOD_NOT_ALLOWED,
      message: transformMessage(message),
    },
    { status: HttpStatus.METHOD_NOT_ALLOWED }
  );
}

export function HttpInternalServerErrorHandler(
  message: string | object = "Internal Server Error"
): NextResponse {
  return NextResponse.json(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: transformMessage(message),
    },
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

export function HttpServiceUnavailableHandler(
  message: string | object = "Service Unavailable"
): NextResponse {
  return NextResponse.json(
    {
      status: HttpStatus.SERVICE_UNAVAILABLE,
      message: transformMessage(message),
    },
    { status: HttpStatus.SERVICE_UNAVAILABLE }
  );
}
