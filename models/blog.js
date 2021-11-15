const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // },
    user: new mongoose.Schema({
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
            autopopulate: true
        }
    }),
    dateCreated : {
        type : Date,
        default : Date.now
    }
});

BlogSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('blogs', BlogSchema, 'blogs');