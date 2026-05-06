# Practical lesson: pz-SOLID

## Опис

Практична реалізація SOLID принципів шляхом рефакторингу існуючого коду на TypeScript.

## Структура проєкту
├── src/
│   ├── original/       # код із навмисними порушеннями SOLID
│   ├── refactored/     # код після рефакторингу
│   ├── interfaces/     # абстракції та інтерфейси
├── tests/
│   ├── refactored.spec.ts
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md

## SOLID принципи

### SRP — Single Responsibility Principle
**Порушення:** клас `UserManager` відповідав за валідацію, збереження та відправку email.  
**Рефакторинг:** розділено на `EmailValidator`, `UserRepository`, `EmailService`.

### OCP — Open/Closed Principle
**Порушення:** метод `getPermissions` використовував if/else для кожної ролі.  
**Рефакторинг:** окремі класи `AdminPermissions`, `EditorPermissions`, `ViewerPermissions`.

### LSP — Liskov Substitution Principle
**Порушення:** `AdminUser` кидав виняток замість реалізації методу батька.  
**Рефакторинг:** `AdminUser extends BaseUser` коректно перевизначає `describe()`.

### ISP — Interface Segregation Principle
**Порушення:** один великий клас з методами для всього.  
**Рефакторинг:** маленькі інтерфейси `IDatabase`, `IEmailService`, `IValidator`, `IReportGenerator`.

### DIP — Dependency Inversion Principle
**Порушення:** `UserManager` напряму створював `MySQLDatabase` і `EmailService`.  
**Рефакторинг:** `UserRepository` залежить від абстракцій через конструктор.

## Запуск тестів

```bash
npm install
npx jest
```

## Результати тестів
Tests: 11 passed, 11 total
