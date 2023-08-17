const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const errorController = require('./controllers/error');
const todoRoutes = require('./routes/todo');

app.use(todoRoutes);
app.use(errorController.get404);

sequelize
    .sync()
    .then(result => {
        app.listen(4000);
    })
    .catch(err => console.log(err));