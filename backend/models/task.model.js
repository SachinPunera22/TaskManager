const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ['Pending', 'On Hold', 'Completed'],
      default: 'Pending'
    },
    assignedTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },

}, { timestamps: true }); // This line add CreatedAt & UpdatedAt

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;