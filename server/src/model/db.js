import { Client } from 'pg';
import { connectionString } from '../config/config';

const createUserTable = 'CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL, firstname varchar(20) NOT NULL, lastname varchar(20) NOT NULL, email varchar(30) NOT NULL UNIQUE, password varchar(70) NOT NULL, role varchar(5));';
const createRequestTable = 'CREATE TABLE requests (id SERIAL PRIMARY KEY, title varchar(20) NOT NULL, description varchar(250) NOT NULL, category varchar(20), image varchar(200), status varchar(20), dated date, userId integer NOT NULL, FOREIGN KEY (userId) REFERENCES "users" (id))';
const makeQuery = (query) => {
  const client = new Client(connectionString);
  client.connect();
  client.query(query)
    .then(() => client.end())
    .catch(() => client.end());
};
makeQuery(`DROP TABLE IF EXISTS requests; DROP TABLE IF EXISTS users;${createUserTable}${createRequestTable}`);
