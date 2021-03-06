const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    question:{
        type:String ,
        required: true
    },
    option1:{
        type:String ,
        required: true
    },
    option2:{
        type:String ,
        required: true
    },
    option3:{
        type:String ,
        required: true
    },
    option4:{
        type:String ,
        required: true
    },
    correctAnswer:{
        type:String ,
        required: true
    },
});

const Question = mongoose.model('Question',questionsSchema);
module.exports = Question;