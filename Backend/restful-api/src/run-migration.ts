import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source'; // Adjust path if necessary

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    console.log('Migrations ran successfully');
  })
  .catch((error) => console.error('Error running migrations', error))
  .finally(() => AppDataSource.destroy());
