import { createConnection } from 'typeorm';
import {} from '../recipes/models/recipe.model';
               '../**/models/**.model'

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
          __dirname + '/../**/models/*.model{.ts,.js}',
        //   __dirname + '../**/*.models/**.model{.ts,.js}'
      ],
      synchronize: true,
    }),
  },
];