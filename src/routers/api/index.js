const express = require('express');
const bodyParser = require('body-parser');

const controller = require('../../controllers/api');

const router = express.Router();

router.post('/todos', bodyParser.json({}), (req, res, next) => {
  console.log(req.body);
  const text = req.body.text;

  controller.createTodo({ text });

  res.status(204).end();
});

router.get('/todos', (req, res, next) => {
  res.json(controller.readTodos());
});

router.delete('/todos/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (controller.deleteTodo(id)) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
