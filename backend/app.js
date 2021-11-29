const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user')

const { MONGODB_URL } = process.env;

const app = express();
const port = 3002;

try {
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
} catch (error) {
    console.log(error);
}
// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/username/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await User.getUser(username);

        if (user !== null)
            return res.json({
                'result': 'success',
                'user': user
            });

        return res.json({
            'result': 'failure',
            'message': `${username} not found`
        });
    } catch (error) {
        // console.log(error);
        return res.json({
            'result': 'failure',
            'message': `user: ${username} not found`
        });
    }
});

app.post('/login', async (req, res) => {
    res.json({'message':'under development'})
});

app.post('/register', async (req, res) => {
    //Register logic
    const { username, password } = req.body

    try {
        const user = new User({ username, password });
        await user.save()

        if (user !== null)
            return res.json({
                'result': 'success',
                'message': 'Register Successful',
                'user': user
            });

        return res.json({
            'result': 'failure',
            'message': 'Register Failed'
        });
    } catch (error) {
        // console.log( typeof error)
        return res.json({
            'result': 'failure',
            'message': 'Register Failed',
            'description': 'Maybe username is already taken'
       })
    }
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