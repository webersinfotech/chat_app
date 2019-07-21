const express = require('express');
const mongo = require('../mongo');
const Formats = require("../formats");
const Responses = require("../responses");
const Validations = require('../validations');
const format = new Formats();
const response = new Responses();
const validation = new Validations();
const router = express.Router();

router.post('/create', async (req, res) => {
    try{
        await validation.validate_agent(req.body);
    }
    catch(Error){
        res.send(response.form_validation_failed());
        return;
    }
    try{
        await mongo.store_agent(format.create_agent(req.body));
        res.send(response.agent_created());
    }
    catch(Error){
        res.send(response.server_error());
    }
})

module.exports = router;