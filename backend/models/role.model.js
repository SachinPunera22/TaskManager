

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const roleSchema = new mongoose.Schema({
    name: { type: String, enum: ['Manager', 'Team Lead', 'Employee'], required: true, unique: true },
    description: { type: String },
  
}, { timestamps: true }); 

taskSchema.plugin(mongoosePaginate);
const Roles = mongoose.model('Roles', roleSchema);

module.exports = Roles;