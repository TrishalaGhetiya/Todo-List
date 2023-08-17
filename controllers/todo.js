const Todo = require('../models/todo');

//Add Items to the database
exports.postAddTodoItem = (req, res, next) => {
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

//Get items when page is loaded
exports.getAddTodoItem = (req, res, next) => {
    Todo.findAll()
    .then(items => {
        console.log('items send');
        res.json(items);
    })
    .catch(err => console.log(err));
}

//Update items from remaining to done
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

//delete items
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