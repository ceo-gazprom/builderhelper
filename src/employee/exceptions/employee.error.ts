import {
  EmployeeErrorsEnum,
  EMPLOYEE_ERRORS_ENUM_TITLES,
} from './employee-errors.enum';

export class EmployeeError extends Error {
  public code: EmployeeErrorsEnum;

  constructor(code: EmployeeErrorsEnum, message?: string) {
    super(message || EMPLOYEE_ERRORS_ENUM_TITLES[code]);
    this.code = code;
  }
}
