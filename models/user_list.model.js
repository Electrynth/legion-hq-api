const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const UserListSchema = mongoose.Schema({
  pointTotal: Number,
  userId: String,
  faction: String,
  mode: String,
  title: String,
  notes: String,
  units: Array,
  objectiveCards: Array,
  deploymentCards: Array,
  conditionCards: Array,
  uniques: Array,
  nonUniques: Array,
  commanders: Array,
  unitCounts: mongoose.Schema.Types.Mixed
}, { timestamps: true, minimize: false });
UserListSchema.plugin(autoIncrement.plugin, {
  model: 'user_lists',
  field: 'listId',
  startAt: 1000,
  incrementBy: 1
});

module.exports = mongoose.model('user_lists', UserListSchema);
