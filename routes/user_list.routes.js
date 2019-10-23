module.exports = (app, autoIncrement) => {
  const user_lists = require('../controllers/user_list.controller.js');
  app.get('/lists', user_lists.findSome);
  app.get('/lists/:listId', user_lists.findOne);
  app.post('/lists', user_lists.create);
  app.put('/lists/:listId', user_lists.update);
  app.delete('/lists/:listId', user_lists.delete);
};
