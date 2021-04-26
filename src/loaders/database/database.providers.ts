import { createConnection } from 'typeorm';
import {} from '../../recipe/recipe.model';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
          __dirname + '/../../**/*.model{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];