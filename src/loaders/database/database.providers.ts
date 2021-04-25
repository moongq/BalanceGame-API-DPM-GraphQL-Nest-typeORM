import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'database-1.cbzpsfvcb7i0.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'chldbflehdrmfkal',
      database: 'name0421',
      entities: [
          __dirname + '/../../**/*.model{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];