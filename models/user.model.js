const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const UserSchema = mongoose.Schema({
  email: String,
  settings: mongoose.Schema.Types.Mixed
}, { timestamps: true, minimize: false });

UserSchema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: 'userId',
  startAt: 1000,
  incrementBy: 1
});

module.exports = mongoose.model('users', UserSchema);
