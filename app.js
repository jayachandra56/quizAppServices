const http = require('http')
const mongoose = require('mongoose')
const Question = require('./modals/questions')
const Result = require('./modals/result')

const bodyParser = require('body-parser')

const dbURL = "mongodb+srv://chandra:12345@cluster0.dcuqw.mongodb.net/quizapp?retryWrites=true&w=majority"

mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(res => {
        console.log("DB Connected...")
    })
    .catch(error => console.log("Error Occured"))

const server = http.createServer((req, res) => {


    if (req.url === "/" && req.method === "GET") {
        Question.find()
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.end("Hello Welcome")
            }).catch(error => res.end(JSON.stringify(error)))
    }

    else if (req.url === "/questions" && req.method === "GET") {
        Question.find()
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.end(JSON.stringify(result))
            }).catch(error => res.end(JSON.stringify(error)))
    }

    else if (req.url === "/status" && req.method === "GET") {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end()

    }


    else if (req.url === "/submitResult") {
        let data = "";
        req.on('data', chunk => {
            data = data + chunk;
        })
        req.on('end', () => {
            const obj = JSON.parse(data)
            let notAttempted = 0;
            let correctAnswers = 0;
            obj.answers.forEach(item => {
                if (item.userAnswer === "Not Answered") {
                    notAttempted = notAttempted + 1;
                }
                if (item.result === true) {
                    correctAnswers = correctAnswers + 1;
                }
            });
            const addData = new Result({
                mailid: obj.mailid,
                answers: obj.answers,
                notAttempted: notAttempted,
                correctAnswers: correctAnswers,
                wrongAnswers: obj.answers.length - notAttempted - correctAnswers,
                finalScore: correctAnswers + " Out of " + obj.answers.length
            }).save()
                .then(result => {
                    Result.findOne({ mailid: obj.mailid }, (error, result) => {
                        if (error) {
                            console.log(error)
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json')
                            res.setHeader('Access-Control-Allow-Origin', '*')
                            return res.end(JSON.stringify(result))
                        }
                    })

                })
                .catch(error => {
                    res.setHeader('Content-Type', 'application/json')
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    return res.end(JSON.stringify(error))
                })
        })
    }

})


server.listen(5000, '0.0.0.0' , () => console.log("Server running on port 5000..."))