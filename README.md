# Maintenance_Tracker
[![Build Status](https://travis-ci.org/Oloyedesinmiloluwa/Maintenance_Tracker.svg?branch=develop)](https://travis-ci.org/Oloyedesinmiloluwa/Maintenance_Tracker)
[![Coverage Status](https://coveralls.io/repos/github/Oloyedesinmiloluwa/Maintenance_Tracker/badge.svg?branch=develop)](https://coveralls.io/github/Oloyedesinmiloluwa/Maintenance_Tracker?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4776543d19681cf61613/maintainability)](https://codeclimate.com/github/Oloyedesinmiloluwa/Maintenance_Tracker/maintainability)
FRONTEND
[![Test Coverage](https://api.codeclimate.com/v1/badges/4776543d19681cf61613/test_coverage)](https://codeclimate.com/github/Oloyedesinmiloluwa/Maintenance_Tracker/test_coverage)
[![CircleCI](https://circleci.com/gh/Oloyedesinmiloluwa/Maintenance_Tracker/tree/develop.svg?style=svg)](https://circleci.com/gh/Oloyedesinmiloluwa/Maintenance_Tracker/tree/develop)

Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request. To access the privileged endpoints token must be provided

## How it works 
* Users can:
    * Get all their maintenance or repair requests
    * Create a request
    * Modify their request
    * Create account
    * Login to their account
    * Reset password via email
* Admins can:
    * Get all requests in the application
    * Get a specified request
    * mark a request as resolved
    * mark a request as approved
    * mark a request as disapproved
* Super admin can:
    * make an existing user an admin
    
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
      <td>Get requests filter by status</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/requests?category={ category }</td>
      <td>Get requests filter by category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/requests</td>
      <td>Get all requests in the application</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/admin/{userId}/approve</td>
      <td>Super admin makes a user an admin</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/requests/{requestId}/approve</td>
      <td>Admin updates a request status as approved</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/requests/{requestId}/disapprove</td>
      <td>Admin updates a request status as disapproved</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/requests/{requestId}/resolve</td>
      <td>Admin updates a request status as resolved</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Login a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Creates an account for a new user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/password/reset</td>
      <td>Sends email to user for password reset</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/users/password/reset</td>
      <td>Resets user password</td>
  </tr>
</table>
<br/>

You can access the app here https://m-tracker.herokuapp.com
You can also access the API documentation at https://m-tracker.herokuapp.com/api-docs
