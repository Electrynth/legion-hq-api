module.exports = (app, autoIncrement) => {
  const users = require('../controllers/user.controller.js');
  // TODO: app.get('/users', users.findAll);
  app.get('/users', users.findByEmail);
  app.get('/users/:userId', users.findByUserId);
  app.post('/users', users.create);
  // TODO: app.put('/users/:userId', users.update);
  // TODO: app.delete('/users/:userId', users.delete);
};
