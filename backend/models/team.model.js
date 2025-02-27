const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],

}, {timestamps: true});

teamSchema.plugin(mongoosePaginate);
const Team = mongoose.model('Teams', teamSchema);

module.exports = Team;