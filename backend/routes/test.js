const { Router } = require('express');
const routerTest = Router();

routerTest.get('/', (req, res) => {
    return res.send('Tests will loaded soon!')
})

module.exports = routerTest;