import { Client } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const createUserTable = 'CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL, firstname varchar, lastname varchar, email varchar, password varchar);';
const createRequestTable = 'CREATE TABLE requests (id SERIAL PRIMARY KEY, title varchar, description varchar, category varchar, image varchar, status varchar, dated date, userId integer, FOREIGN KEY (userId) REFERENCES "users" (id))';
const makeQuery = (query) => {
  const client = new Client(config[env]);
  client.connect();
  client.query(query)
    .then(() => client.end())
    .catch(() => client.end());
};
makeQuery(`DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;${createUserTable}${createRequestTable}`);
