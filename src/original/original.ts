// ANTI-SOLID код — навмисні порушення всіх принципів

class UserManager {
  private users: { name: string; email: string; role: string }[] = [];

  // SRP порушення: клас відповідає за все одразу
  addUser(name: string, email: string, role: string) {
    if (!email.includes('@')) {
      console.log('Invalid email');
      return;
    }
    this.users.push({ name, email, role });
    // DIP порушення: пряма залежність від конкретної реалізації
    const db = new MySQLDatabase();
    db.save({ name, email, role });
    // SRP порушення: відправка email тут же
    const mailer = new EmailService();
    mailer.send(email, 'Welcome!');
  }

  // OCP порушення: для кожної ролі — окремий if
  getPermissions(role: string): string[] {
    if (role === 'admin') return ['read', 'write', 'delete'];
    if (role === 'editor') return ['read', 'write'];
    if (role === 'viewer') return ['read'];
    return [];
  }

  // ISP порушення: один великий метод для всього
  generateReport(type: string) {
    if (type === 'pdf') console.log('PDF report');
    if (type === 'csv') console.log('CSV report');
    if (type === 'excel') console.log('Excel report');
  }
}

class AdminUser extends UserManager {
  // LSP порушення: змінює поведінку батьківського методу
  getPermissions(role: string): string[] {
    throw new Error('Not supported');
  }
}

class MySQLDatabase {
  save(data: object) { console.log('Saving to MySQL:', data); }
}

class EmailService {
  send(to: string, message: string) { console.log(`Sending email to ${to}: ${message}`); }
}

export { UserManager, AdminUser, MySQLDatabase, EmailService };
