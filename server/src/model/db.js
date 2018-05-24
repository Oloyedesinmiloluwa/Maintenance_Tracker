import { Client } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const createUserTable = 'CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL, firstname varchar(20), lastname varchar(20), email varchar(30), password varchar(70));';
const createRequestTable = 'CREATE TABLE requests (id SERIAL PRIMARY KEY, title varchar(20), description varchar(250), category varchar(20), image varchar(20), status varchar(20), dated date, userId integer, FOREIGN KEY (userId) REFERENCES "users" (id))';
const makeQuery = (query) => {
  const client = new Client(config[env]);
  client.connect();
  client.query(query)
    .then(() => client.end())
    .catch(() => client.end());
};
makeQuery(`DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;${createUserTable}${createRequestTable}`);
