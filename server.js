const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./_helpers/error-handler');

const createTestUsers = require('./_helpers/create-test-users');
createTestUsers();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use('/contacts', require('./contacts/contacts.controller'));

app.use(errorHandler);

const port = 4000;
app.listen(port, () => {
    console.log(`Listen port: ${port}`);
    console.log(`Usage: GET http://localhost:${port}/contacts/?page=1`);
});
