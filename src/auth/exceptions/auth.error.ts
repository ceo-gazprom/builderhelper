import {
  AuthErrorsEnum,
  AUTH_ERRORS_ENUM_TITLES,
} from './auth-errors.enum';

export class AuthError extends Error {
  public code: AuthErrorsEnum;

  constructor(code: AuthErrorsEnum, message?: string) {
    super(message || AUTH_ERRORS_ENUM_TITLES[code]);
    this.code = code;
  }
}
