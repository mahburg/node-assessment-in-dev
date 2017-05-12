const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const userCtrl = require('./usersCtrl');

const port = 3000;
const app = express();

app.use(bodyParser.json());
//------GET requests--------------------------------------
app.get('/api/users', userCtrl.getUsers);
app.get('/api/users/:userId', userCtrl.getUsersById);
app.get('/api/admins', userCtrl.getAdmins);
app.get('/api/nonadmins', userCtrl.getNonAdmins);
app.get('/api/user_type/:usrType', userCtrl.getUserByType);

//------PUT requests--------------------------------------
app.put('/api/users/:userId', userCtrl.updateUser);
//------POST requests--------------------------------------
app.post('/api/users', userCtrl.addUser);
//------DELETE requests--------------------------------------
app.delete('/api/users/:userId', userCtrl.deleteUser);


app.listen(port, ()=>{console.log("Listening on port:"+port)});