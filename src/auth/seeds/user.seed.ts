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
      VALUES (1, now(), now(), 'Pedro antorio', 'driver@test.com', '${password}','+5712121222', 1);`,
    );
    await getManager().query(
      `INSERT INTO users ("id", "createdAt", "updatedAt", "completeName", "email", "password", "phone","rolId")
      VALUES (2, now(), now(), 'Juan andres', 'rider@test.com', '${password}' ,'+57 312424253', 2);`,
    );
    await getManager().query('ALTER TABLE users AUTO_INCREMENT = 2;');
  }
}
