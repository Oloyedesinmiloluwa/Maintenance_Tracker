import dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    password: 'JESUS',
    port: process.env.conPort,
  },
  test:
  {
    user: process.env.testUserName,
    password: process.env.testPassword,
    database: 'postgres',
    host: '127.0.0.1',
    port: process.env.conPort,
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
let conString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') conString = { connectionString: process.env.DATABASE_URL, ssl: true };
else conString = config[env];
export const connectionString = conString;
