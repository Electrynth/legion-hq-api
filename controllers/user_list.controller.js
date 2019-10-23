const UserList = require('../models/user_list.model.js');

exports.create = (req, res) => {
  // TODO: do better/more validation for this...
  if (!req.body.userId) {
    return res.status(400).send({
      message: 'Must include a userId to create a list.'
    });
  }
  const userList = new UserList({
    ...req.body
  });
  userList.save().then(data => {
    res.send(data);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.findSome = (req, res) => {
  let query = {};
  if ('userId' in req.query) query = { userId: req.query.userId };
  UserList.find(query).then(results => {
    res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.findOne = (req, res) => {
  UserList.find({ listId: req.params.listId }).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.userId} not found.`
      });
    } else res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

exports.update = (req, res) => {
  // TODO: do better/more validation for this...
  if (!req.params.listId) {
    return res.status(400).send({
      message: 'Must include a listId to update a list.'
    });
  }
  UserList.findOneAndUpdate(
    { listId: req.params.listId },
    { ...req.body },
    { new: true },
  ).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    res.send(results);
  }).catch(error => {
    if (error.kind === 'ObjectId') {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    return res.status(500).send({
      message: `Internal server error (updating listId: ${req.params.listId}).`
    });
  });
};

exports.delete = (req, res) => {
  if (req.params.listId === '') {
    return res.status(400).send({
      message: 'The listId cannot be an empty string.'
    });
  }
  UserList.remove({ listId: req.params.listId }).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    res.send({ isListDeleted: true });
  }).catch(error => {
    if (error.kind === 'ObjectId' || error.name === 'NotFound') {
      return res.status(404).send({
        message: `The listId: ${req.params.listId} was not found.`
      });
    }
    return res.status(500).send({
      message: `Internal server error (deleting listId: ${req.params.listId}).`
    });
  });
};
