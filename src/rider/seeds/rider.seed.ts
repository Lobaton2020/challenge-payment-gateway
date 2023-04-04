import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class RiderSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE riders CASCADE');
    await getManager().query('INSERT INTO riders ("userId") VALUES (3);');
  }
}
