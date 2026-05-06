import { IDatabase, IEmailService, IValidator, IPermissionStrategy, IReportGenerator, IUserRepository } from '../interfaces/interfaces';

// SRP — валідатор окремо
export class EmailValidator implements IValidator {
  validate(email: string): boolean {
    return email.includes('@');
  }
}

// DIP — абстракція бази даних
export class MySQLDatabase implements IDatabase {
  save(data: object): void {
    console.log('Saving to MySQL:', data);
  }
}

export class MongoDatabase implements IDatabase {
  save(data: object): void {
    console.log('Saving to MongoDB:', data);
  }
}

// SRP — email сервіс окремо
export class EmailService implements IEmailService {
  send(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}

// OCP — кожна роль — окремий клас
export class AdminPermissions implements IPermissionStrategy {
  getPermissions(): string[] {
    return ['read', 'write', 'delete'];
  }
}

export class EditorPermissions implements IPermissionStrategy {
  getPermissions(): string[] {
    return ['read', 'write'];
  }
}

export class ViewerPermissions implements IPermissionStrategy {
  getPermissions(): string[] {
    return ['read'];
  }
}

// LSP — коректне наслідування
export class BaseUser {
  constructor(public name: string, public email: string, public role: string) {}
  describe(): string {
    return `${this.name} (${this.role})`;
  }
}

export class AdminUser extends BaseUser {
  describe(): string {
    return `Admin: ${this.name}`;
  }
}

// ISP — окремі генератори звітів
export class PdfReportGenerator implements IReportGenerator {
  generate(): void { console.log('PDF report'); }
}

export class CsvReportGenerator implements IReportGenerator {
  generate(): void { console.log('CSV report'); }
}

// DIP — UserRepository залежить від абстракцій
export class UserRepository implements IUserRepository {
  constructor(
    private db: IDatabase,
    private mailer: IEmailService,
    private validator: IValidator
  ) {}

  addUser(name: string, email: string, role: string): void {
    if (!this.validator.validate(email)) {
      console.log('Invalid email');
      return;
    }
    this.db.save({ name, email, role });
    this.mailer.send(email, 'Welcome!');
  }
}
