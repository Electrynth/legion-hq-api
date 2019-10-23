const User = require('../models/user.model.js');

exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Must include an email to create a user.'
    });
  }
  const user = new User({
    email: req.body.email,
    settings: {}
  });
  user.save().then(data => {
    res.send(data);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

// exports.findAll = (req, res) => {
//   User.find().then(results => {
//     res.send(results);
//   }).catch(error => {
//     res.status(500).send({
//       message: error.message || 'Internal server error'
//     });
//   });
// };

exports.findOne = (req, res) => {
  User.find({ userId: req.params.userId }).then(results => {
    if (!results) {
      return res.status(404).send({
        message: `The userId: ${req.params.userId} was not found`
      });
    } else res.send(results);
  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Internal server error.'
    });
  });
};

// TODO: exports.update

// TODO: exports.delete
