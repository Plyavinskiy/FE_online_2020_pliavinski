const INCPATH = '';
const mongoose = require('mongoose'),
  log = require(INCPATH + './log')(module),
  config = require(INCPATH + './config');
Q = require('q');

mongoose.connect(config.get('db'),{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', function (err) {
  log.error('connection error:', err.message);
});
db.once('open', function callback() {
  log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

const Article = new Schema({
  user: {
    type: String,
    required: true,
    minlength:3
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  preview: {
    type: String
  },
  comments: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  header: {
    type: String,
    required: true,
    minlength:3
  },
  description: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  }
});


module.exports.ArticleModel = mongoose.model('Article', Article);
module.exports.mongoose = mongoose;
