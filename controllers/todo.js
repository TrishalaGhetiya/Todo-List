const Todo = require('../models/todo');

exports.postAddTodoItem = (req, res, next) => {
    //console.log(req.body.isChecked);
    const item = req.body.item;
    const description = req.body.description;
    const isChecked = req.body.isChecked;

    Todo.create({
        item: item,
        description: description,
        isChecked: isChecked
    })
    .then(result => {
        console.log('todo item added');
    })
    .catch(err => console.log(err));
}

exports.getAddTodoItem = (req, res, next) => {
    Todo.findAll()
    .then(items => {
        console.log('items send');
        res.json(items);
    })
    .catch(err => console.log(err));
}

exports.editTodoItem = (req, res, next) => {
    const itemId = req.params.id;
    Todo.findByPk(itemId)
        .then(item => {
            item.isChecked = 'yes';
            return item.save();
        })
        .then(result => {
            console.log('todo done');
            res.json(result);
        })
        .catch(err => console.log(err));
}

exports.deleteTodoItem = (req, res, next) => {
    const itemId = req.params.id;
    Todo.findByPk(itemId)
        .then(item => {
            return item.destroy();
        })
        .then(result => {
            console.log('todo deleted');
            res.json(result);
        })
        .catch(err => console.log(err));
}