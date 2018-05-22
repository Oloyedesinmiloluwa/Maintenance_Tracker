import dotenv from 'dotenv';

dotenv.config();
export default {
  development: {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    password: 'JESUS',
    port: process.env.port,
    max: 10,
    idleTimeoutMillis: 30000
  },
  test:
  {
    user: process.env.testUserName,
    password: process.env.testPassword,
    database: 'postgres',
    host: '127.0.0.1',
    port: process.env.port,
    max: 10,
    idleTimeoutMillis: 30000
  },
  production: {
    
  }
};
