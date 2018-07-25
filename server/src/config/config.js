import dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    user: process.env.devUserName,
    password: process.env.devPassword,
    database: 'postgres',
    host: '127.0.0.1',
    port: process.env.conPort,
    emailHost: process.env.emailHost,
    emailUserName: process.env.emailUserName,
    emailPassword: process.env.emailPassword,
    emailPort: process.env.emailPort,
    emailSecure: process.env.emailSecure,
    emailRequireTLS: process.env.emailRequireTLS
  },
  test:
  {
    user: process.env.testUserName,
    password: process.env.testPassword,
    database: 'postgres',
    host: '127.0.0.1',
    port: process.env.conPort,
    emailHost: process.env.testEmailHost,
    emailUserName: process.env.testEmailUserName,
    emailPassword: process.env.testEmailPassword,
    emailPort: process.env.testEmailPort,
    emailSecure: process.env.testEmaiSecure,
    emailRequireTLS: process.env.testEmailRequireTLS
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
let setConnectionString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') setConnectionString = { connectionString: process.env.DATABASE_URL, ssl: true };
else setConnectionString = config[env];
export const connectionString = setConnectionString;
