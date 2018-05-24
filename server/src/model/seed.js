import { Pool, Client } from 'pg';
import config from '../config/config';

const env = process.env.NODE_ENV || 'test';
const seedUserData = { text: 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2,$3,$4)',
  values: ['Sinmi', 'John', 'sinmiloluwasunday@yahoo.com', 'test'] };
const seedRequestData1 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'approved', '2018-12-13', 1);`;
const seedRequestData2 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'approved', '2018-12-13', 1);`;
const seedRequestData3 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'disapproved', '2018-12-13', 1);`;
const seedRequestData4 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'disapproved', '2018-12-13', 1);`;
const seedRequestData5 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'resolved', '2018-12-13', 1);`;
const seedRequestData6 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty Fan', 'we have a fault', 'electrical', 'IMAGE', 'resolved', '2018-12-13', 1);`;
const query = `${seedRequestData1}${seedRequestData2}${seedRequestData3}${seedRequestData4}${seedRequestData5}${seedRequestData6}`;
const client = new Client(config[env]);
client.connect();
client.query(seedUserData)
  .then(() => {
    client.end();
    const client1 = new Client(config[env]);
    client1.connect();
    client1.query(query)
      .then(() => client1.end())
      .catch(() => client1.end());
  })
  .catch(() => client.end());

