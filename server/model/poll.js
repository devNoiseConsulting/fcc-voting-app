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


// https://stackoverflow.com/a/7038576
PollSchema.methods.toClient = function() {
  let poll = this.toObject();

  //Rename fields
  poll.id = poll._id;

  poll._id = undefined;
  poll.__v = undefined;
  poll.owner = undefined;
  poll.voters = undefined;

  poll.choices = poll.choices.map(c => {
    c._id = undefined;
    return c;
  });

  return poll;
}

module.exports = mongoose.model('Poll', PollSchema);
