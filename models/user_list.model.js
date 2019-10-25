const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const UserListSchema = mongoose.Schema({
  pointTotal: Number,
  userId: Number,
  numActivations: Number,
  faction: String,
  listMode: String,
  title: String,
  notes: String,
  serial: String,
  unitObjects: Array,
  commandCards: Array,
  objectiveCards: Array,
  deploymentCards: Array,
  conditionCards: Array,
  uniques: Array,
  nonUniques: Array,
  commanders: Array,
  unitSerials: Array,
  entourageLeaders: Array,
  limited: mongoose.Schema.Types.Mixed,
  rankCounts: mongoose.Schema.Types.Mixed
}, { timestamps: true, minimize: false });
UserListSchema.plugin(autoIncrement.plugin, {
  model: 'user_lists',
  field: 'listId',
  startAt: 1000,
  incrementBy: 1
});

module.exports = mongoose.model('user_lists', UserListSchema);
