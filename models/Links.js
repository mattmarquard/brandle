var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  title: String,
  link: String,
  icon: { data: Buffer, contentType: String },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Link', LinkSchema);
