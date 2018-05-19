# Maintenance_Tracker
[![Build Status](https://travis-ci.org/Oloyedesinmiloluwa/Maintenance_Tracker.svg?branch=develop)](https://travis-ci.org/Oloyedesinmiloluwa/Maintenance_Tracker)
[![Coverage Status](https://coveralls.io/repos/github/Oloyedesinmiloluwa/Maintenance_Tracker/badge.svg?branch=develop)](https://coveralls.io/github/Oloyedesinmiloluwa/Maintenance_Tracker?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4776543d19681cf61613/maintainability)](https://codeclimate.com/github/Oloyedesinmiloluwa/Maintenance_Tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4776543d19681cf61613/test_coverage)](https://codeclimate.com/github/Oloyedesinmiloluwa/Maintenance_Tracker/test_coverage)

Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

## How it works 
* Users can:
    * Get all their maintenance or repair requests
    * Create a request
    * modify their request
    
## Technologies
  * Nodejs(ES6)
  * Git
  * NPM
  * Express
  * Babel
## Installation
  Ensure you have the technologies installed then you can clone this repository in your local machine.Afterwards, run <code> npm install </code> and run <code>npm run start:dev</code> for a quick start. Or you may build first, using <code>npm run build</code> then run <code>npm start</code>.
If you only want to access the completed work, you will find the link to the hosted work at the bottom of this readme, you don't have to clone this repository!

## Test
  Mocha is the testing framework together with chai assertion library
  * You can run test after installation using <code>npm run test</code>   

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Functionality</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/request</td>
      <td>Create a request</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/users/requests/:requestId</td>
      <td>Modify existing request</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/requests</td>
      <td>Get all requests</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/requests/:requestId</td>
      <td>Get a request</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/requests?status={ status }</td>
      <td>Get requests base on status</td>
  </tr>
</table>
<br/>

You can access the app here https://m-tracker.herokuapp.com