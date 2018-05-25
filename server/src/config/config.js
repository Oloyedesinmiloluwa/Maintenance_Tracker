import dotenv from 'dotenv';

dotenv.config();
export default {
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
