import {
  CompanyErrorsEnum,
  COMPANY_ERRORS_ENUM_TITLES,
} from './company-errors.enum';

export class CompanyError extends Error {
  public code: CompanyErrorsEnum;

  constructor(code: CompanyErrorsEnum, message?: string) {
    super(message || COMPANY_ERRORS_ENUM_TITLES[code]);
    this.code = code;
  }
}
