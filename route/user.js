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
    const users = await mongo.fetch_user({});
    if(users.length >= 1){
        res.send('REDIRECT');
        return;
    }
    res.sendFile(`${__basedir}/public/html/user.html`);
})

router.post('/create', async (req, res) => {
    console.log(req.body);
    try{
        await validation.validate_user(req.body);
    }
    catch(Error){
        console.log('Form validation failed');
        res.send(response.form_validation_failed());
        return;
    }
    try{
        await mongo.store_user(format.create_user(req.body));
        res.send(response.user_created());
    }
    catch(Error){
        console.error(Error);
        //util.send_error(Error);
        res.send(response.server_error());
    }
})

module.exports = router;