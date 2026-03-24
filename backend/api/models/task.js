const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true 
    },
    title : {
        type : String,
        required : true 
    },
    created_at : {
        type : Date,
    },
    due_date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        default : "PENDING",
    },
});

module.exports = mongoose.model('Task', taskSchema);