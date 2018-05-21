import dotenv from 'dotenv';

dotenv.config();
export default {
  development: {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    password: 'JESUS',
    port: 5433
  },
  test:
  {
    user: 'postgres',
    password: 'JESUS',
    database: 'postgres',
    host: '127.0.0.1',
    port: 5433,
  },
  production: {
    
  }
};
