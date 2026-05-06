// ISP — маленькі специфічні інтерфейси

export interface IDatabase {
  save(data: object): void;
}

export interface IEmailService {
  send(to: string, message: string): void;
}

export interface IValidator {
  validate(email: string): boolean;
}

export interface IPermissionStrategy {
  getPermissions(): string[];
}

export interface IReportGenerator {
  generate(): void;
}

export interface IUserRepository {
  addUser(name: string, email: string, role: string): void;
}
