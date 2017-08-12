var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PollSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  choices: [
    {
      id: Number,
      display: String,
      count: Number
    }
  ],
  voters: Array
});

module.exports = mongoose.model('Poll', PollSchema);
