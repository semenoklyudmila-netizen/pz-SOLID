import {
  EmailValidator,
  MySQLDatabase,
  MongoDatabase,
  EmailService,
  AdminPermissions,
  EditorPermissions,
  ViewerPermissions,
  BaseUser,
  AdminUser,
  PdfReportGenerator,
  CsvReportGenerator,
  UserRepository,
} from '../src/refactored/refactored';

// SRP
describe('EmailValidator', () => {
  const validator = new EmailValidator();
  it('should return true for valid email', () => {
    expect(validator.validate('test@example.com')).toBe(true);
  });
  it('should return false for invalid email', () => {
    expect(validator.validate('invalid-email')).toBe(false);
  });
});

// OCP
describe('Permissions', () => {
  it('admin should have read, write, delete', () => {
    expect(new AdminPermissions().getPermissions()).toEqual(['read', 'write', 'delete']);
  });
  it('editor should have read, write', () => {
    expect(new EditorPermissions().getPermissions()).toEqual(['read', 'write']);
  });
  it('viewer should have read only', () => {
    expect(new ViewerPermissions().getPermissions()).toEqual(['read']);
  });
});

// LSP
describe('User LSP', () => {
  it('BaseUser describe works', () => {
    const user = new BaseUser('Alice', 'alice@example.com', 'viewer');
    expect(user.describe()).toBe('Alice (viewer)');
  });
  it('AdminUser describe works without throwing', () => {
    const admin = new AdminUser('Bob', 'bob@example.com', 'admin');
    expect(admin.describe()).toBe('Admin: Bob');
  });
});

// ISP
describe('Report Generators', () => {
  it('PdfReportGenerator generates without error', () => {
    expect(() => new PdfReportGenerator().generate()).not.toThrow();
  });
  it('CsvReportGenerator generates without error', () => {
    expect(() => new CsvReportGenerator().generate()).not.toThrow();
  });
});

// DIP
describe('UserRepository', () => {
  it('should not add user with invalid email', () => {
    const db = new MySQLDatabase();
    const mailer = new EmailService();
    const validator = new EmailValidator();
    const repo = new UserRepository(db, mailer, validator);
    const spy = jest.spyOn(db, 'save');
    repo.addUser('Alice', 'invalid', 'admin');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should add user with valid email', () => {
    const db = new MongoDatabase();
    const mailer = new EmailService();
    const validator = new EmailValidator();
    const repo = new UserRepository(db, mailer, validator);
    const spy = jest.spyOn(db, 'save');
    repo.addUser('Alice', 'alice@example.com', 'admin');
    expect(spy).toHaveBeenCalledWith({ name: 'Alice', email: 'alice@example.com', role: 'admin' });
  });
});
