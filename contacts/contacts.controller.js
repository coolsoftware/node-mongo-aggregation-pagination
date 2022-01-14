const express = require('express');
const router = express.Router();
const contactService = require('./contact.service');

router.get('/', getPage);

module.exports = router;

function getPage(req, res, next) {
    const page = req.query && req.query.page;
    contactService.getPage({page})
        .then(result => res.json(result))
        .catch(next);
}