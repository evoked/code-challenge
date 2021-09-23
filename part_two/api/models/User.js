const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: [true, 'username required'], maxlength: 13, unique: true },
    surveys: [{ type: Schema.Types.ObjectId, ref: "Survey" }],
    timestamp: { type: Date, createdAt: Date.Now }
  }
);

module.exports = mongoose.model('User', UserSchema);
