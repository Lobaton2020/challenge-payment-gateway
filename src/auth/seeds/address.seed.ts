import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
export class UserCreatedSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE address CASCADE');
    await getManager().query(
      `INSERT INTO public.address ("createdAt","updatedAt",address_line_1,address_line_2,country,region,city,postal_code,status,"userId") VALUES
      ('2023-04-04 05:22:47.084','2023-04-04 05:22:47.084','12','32','CO','Central','Bogota DC','111111',true,1),
      ('2023-04-04 05:22:47.216','2023-04-04 05:22:47.216','23','23','VE','Norte','Caracas','121212',true,2),
      ('2023-04-04 05:22:47.229','2023-04-04 05:22:47.229','26','3','CH','Sur','Santiago','231421',true,3);
 `,
    ),
      await getManager().query("SELECT setval('users_id_seq', 4, false);");
  }
}
