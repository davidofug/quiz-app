const { Router } = require('express');
const routerQuiz = Router();

routerQuiz.get('/quizzes', (req, res) => {
    return res.send('Quizzes will loaded soon!')
})

module.exports = routerQuiz;