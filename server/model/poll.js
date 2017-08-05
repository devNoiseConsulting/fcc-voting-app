var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PollSchema = new Schema({
  id: ObjectId, // base64 encoded UUID?
  title: String,
  owner: ObjectId,
  choices: [
    {
      id: Number,
      display: String,
      count: Number
    }
  ],
  voters: Array
});

var Poll = mongoose.model('Poll', PollSchema);

module.exports.Poll = Poll;
