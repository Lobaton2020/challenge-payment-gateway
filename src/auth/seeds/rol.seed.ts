import { User } from '@app/auth/entities/User.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class RolSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE rols CASCADE');
    await getManager().query(
      'INSERT INTO rols ("id", "createdAt", "updatedAt", "name") VALUES (1, now(), now(), \'DRIVER\'), (2, now(), now(), \'RIDER\');',
    );
  }
}
