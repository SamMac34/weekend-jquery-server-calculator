const express =require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

let answer;
// Data array
let calcHistory = [];


// Route to get calculations history
app.get('/history', (req, res) => {
    console.log('Request made for calculations /history')
    res.send(calcHistory)
});


// Route to POST calculations from client.js
app.post('/calcs', (req, res) => {
    console.log('In POST request, data is:', req.body);

    // Push new equation variables to calcHistory
    calcHistory.push(req.body.calcToAdd);

    // Generate answer
    calculateAnswer();
    console.log('in app.post, answer is:', answer);
    
    // Add answer property to calcHistory
    req.body.calcToAdd.answer = answer
    console.log('In POST request, data is:', req.body);

    res.sendStatus(201);
});


function calculateAnswer() {
    if(calcHistory[calcHistory.length - 1].operation == '+' ) {
        answer = Number(calcHistory[calcHistory.length - 1].num1) + Number(calcHistory[calcHistory.length - 1].num2);
        console.log('in calculateAnswer if, answer is:', answer);
    } else if(calcHistory[calcHistory.length - 1].operation == '-') {
        answer = Number(calcHistory[calcHistory.length - 1].num1) - Number(calcHistory[calcHistory.length - 1].num2);
        console.log('in calculateAnswer else if, answer is:', answer);
    } else if(calcHistory[calcHistory.length - 1].operation == '*') {
        answer = Number(calcHistory[calcHistory.length - 1].num1) * Number(calcHistory[calcHistory.length - 1].num2);
        console.log('in calculateAnswer else if, answer is:', answer);
    } else if(calcHistory[calcHistory.length - 1].operation == '/') {
            answer = Number(calcHistory[calcHistory.length - 1].num1) / Number(calcHistory[calcHistory.length - 1].num2);
            console.log('in calculateAnswer else if, answer is:', answer);
    };
    console.log('answer is:', answer);
};




app.listen(port, () => {
    console.log('listening on port:', 5000);
});
