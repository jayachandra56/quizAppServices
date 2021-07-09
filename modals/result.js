const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reqString = {
    type: String,
    required: true
}

const answersSchema = new Schema({
    question: reqString,
    userAnswer: reqString,
    correctAnswer: reqString,
    result: {
        type: Boolean,
        required: true
    }
})

const resultSchema = new Schema({
    mailid: reqString,
    answers: [answersSchema],
    notAttempted: reqString,
    correctAnswers: reqString,
    wrongAnswers: reqString,
    finalScore: reqString
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;