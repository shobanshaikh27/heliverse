const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uniqueDomains: {
    type: [{
      type: String,
      unique: true,
    }],
    required: true,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      available: { type: Boolean, required: true },
    },
  ],
});


teamSchema.index({ name: 1, 'users.user': 1, 'uniqueDomains': 1 }, { unique: true });


module.exports = mongoose.model('Team', teamSchema);
