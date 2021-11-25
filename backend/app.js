const express = require('express');
const app = express();
const port = 3002;
// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    //Login logoic
    res.json({
        'result': 'success',
        'message': 'Login Successful'
    });
});

app.post('/register', (req, res) => {
    //Register logic

    console.log(req.body)
    res.json({
        'result': 'success',
        'message': 'Register Successful'
    });
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let ids = id.split(',');
    console.log(typeof ids);
    let str = ''
    let deletedCount = 0
    ids.forEach(id => {
        deletedCount++;
        str += `${id},`
    })
    
    res.json({
        'result': 'success',
        'total_items_deleted': deletedCount,
        'deleted_items': str
    })
})

app.put('/users', (req, res) => {
    console.log(req.body)
    res.send('Update User')
});
app.patch('/users/:id', (req, res) => {

    const { id } = req.params;
    let user = {
        "id": 12,
        'username': 'David',
        'gender': 'Male',
        'email': 'davidwampamba@gmail.com'
    }

    console.log('Old user', user)

    const { username } = req.body;

    if (user.id == id) {
        user.username = username;
        res.json({
            'result': 'success',
            'Username': `Username updated to ${user.username}`,
            'updated_user': user
        })
    } else {
        res.send(`User ${id} not found`)
    }
})
app.listen(port, () => {
    console.log(`API working on http://localhost:${port}`);
});