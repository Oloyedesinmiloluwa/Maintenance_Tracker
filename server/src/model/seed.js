import { Client } from 'pg';
import bcryptjs from 'bcryptjs';
import config from '../config/config';

const hashedPassword = bcryptjs.hashSync('test', 8);

const seedUserData = { text: 'INSERT INTO users (firstname, lastname, email, password, role) VALUES($1, $2,$3,$4,$5)',
  values: ['Sinmi', 'John', 'sinmiloluwasunday@yahoo.com', hashedPassword, 'admin'] };
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

let conString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') conString = { connectionString: process.env.DATABASE_URL, ssl: true };
else conString = config[env];

const client = new Client(conString);
client.connect();
client.query(seedUserData)
  .then(() => {
    client.end();
    const client1 = new Client(conString);
    client1.connect();
    client1.query(query)
      .then(() => client1.end())
      .catch(() => client1.end());
  })
  .catch(() => client.end());

