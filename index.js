'use strict';


const app = require('./src/server.js');
const { db } = require('./src/auth/models');
// const base64 = require('base-64');
// const bcrypt = require('bcrypt');

// let username = 'Username';
// let password = 'Password';

// let authHeaderString = `${username}:${password}`;

// let encodedHeader = base64.encode(authHeaderString);

// console.log(encodedHeader);
// let decodedHeader = base64.decode(encodedHeader);
// console.log(decodedHeader);

// let passwordFromHeader = decodedHeader.split(':')[1];

// async function encrypt(password) {

//   let complexity = 5;

//   let hashedPassword = await bcrypt.hash(password, complexity);

//   // this is safe to store.
//   return hashedPassword;
// }

// async function compare(password, hash) {

//   let isValid = await bcrypt.compare(password, hash);

//   console.log(isValid);
// }

// encrypt(passwordFromHeader)
//   .then(hash => {
//     console.log(hash);
//     compare('wrong', hash);
//   });

  db.sync().then(() => {
    app.start(process.env.PORT || 3001);
  });