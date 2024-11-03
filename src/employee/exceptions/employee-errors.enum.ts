export enum EmployeeErrorsEnum {
  CompanyNotFound = 'employee-001',
}

export const EMPLOYEE_ERRORS_ENUM_TITLES = {
  [EmployeeErrorsEnum.CompanyNotFound]: 'Компания с таким id не найдена.',
};
