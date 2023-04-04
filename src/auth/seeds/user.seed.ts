import { User } from '@app/auth/entities/User.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { hash } from 'bcryptjs';
export class UserCreatedSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users CASCADE');
    await getManager().query('TRUNCATE users CASCADE');
    const password = await hash('12345', 10);
    await getManager().query(
      `INSERT INTO users ("id", "createdAt", "updatedAt", "completeName", "email", "password", "phone","rolId")
      VALUES (1, now(), now(), 'Pedro antorio', 'driver@test.com', '${password}','+573122126785', 1);`,
    );
    await getManager().query(
      `INSERT INTO users ("id", "createdAt", "updatedAt", "completeName", "email", "password", "phone","rolId")
      VALUES (2, now(), now(), 'Albero lineros', 'driver2@test.com', '${password}','+573242123456', 1);`,
    );
    await getManager().query(
      `INSERT INTO users ("id", "createdAt", "updatedAt", "completeName", "email", "password", "phone","rolId")
      VALUES (3, now(), now(), 'Juan andres', 'rider@test.com', '${password}' ,'+573241213421', 2);`,
    );
    await getManager().query("SELECT setval('users_id_seq', 4, false);");
  }
}
