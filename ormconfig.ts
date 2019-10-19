import { DB_PORT, DB_USER, DB_NAME, NODE_ENV } from './src/config/env'

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: DB_PORT,
  username: DB_USER,
  password: '',
  database: DB_NAME,
  synchronize: true,
  logging: NODE_ENV === 'development',
  dropSchema: NODE_ENV === 'test',
  entities: ['src/entities/*.*'],
  migrations: ['src/migrations/*.*']
}
