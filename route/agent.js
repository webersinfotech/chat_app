const express = require('express');
const Mongos = require('../mongo');
const Formats = require("../formats");
const Responses = require("../responses");
const Validations = require('../validations');
const format = new Formats();
const response = new Responses();
const validation = new Validations();
const mongo = new Mongos();
const router = express.Router();

router.get('/create', async (req, res) => {
    const agents = await mongo.fetch_agent({})
    if(agents.length >= 1){
        res.send('REDIRECT');
        return;
    }
    res.sendfile(`${__basedir}/public/html/agent.html`)
})

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
        console.error(Error);
        //util.send_error(Error);
        res.send(response.server_error());
    }
})

module.exports = router;