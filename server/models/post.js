import mongoose from 'mongoose';

/*  This is not directly used but it is imported
  so that the models it contains are declared */
import User from './user';

var Schema = mongoose.Schema;

// Define and export User's schema and model
var post_schema = new Schema({
  publisher: { type: Schema.Types.ObjectId, ref: 'User' },
  media: String,
  message: String,
  date: { type: Date, default: Date.now },
  mentions: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  tags: [ String ]
}, { versionKey: false });

export default mongoose.model('Post', post_schema);
