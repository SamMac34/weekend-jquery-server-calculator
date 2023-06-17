const express =require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Data after calculating answer
let calcHistory = [ { 
    num1: 10, 
    num2: 20,
    operation: '+',
    answer: 30,
} ,
{ 
    num1: 100, 
    num2: 50,
    operation: '-',
    answer: 50
} ]

// Data before calculating answer
let calcList = [ { 
    num1: 10, 
    num2: 20,
    operation: '+'
},
{ 
    num1: 100, 
    num2: 50,
    operation: '-'
} ]



// Route to get calculations history
app.get('/history', (req, res) => {
    console.log('Request made for calculations /history')
    res.send(calcHistory)
});

// Route to POST calculations from client.js
app.post('/calcs', (req, res) => {
    console.log('In POST request, data is:', req.body);

    // Push new equation variables to calcList
    calcList.push(req.body.calcToAdd);

    res.sendStatus(201);

    // Generate answer
    calculateAnswer();

});

function calculateAnswer() {
    // let answer = ` ${num1} ${operation} ${num2} `;
    // let answer = calcList.num1 `${calcList.operation}` //calcList.num2
    let answerToAdd = {
        num1: calcList[calcList.length - 1].num1,
        num2: calcList[calcList.length - 1].num2,
        operation: calcList[calcList.length - 1].operation
    }
    console.log('answerToAdd is:', answerToAdd);

    if(calcList[calcList.length - 1].operation == '+' ) {
        answerToAdd.answer = Number(calcList[calcList.length - 1].num1) + Number(calcList[calcList.length - 1].num2);
        console.log('in calculateAnswer if, answer is:', answerToAdd.answer);
    } else {
        answerToAdd.answer = 1010;
        console.log('in calculateAnswer else, answer is:', answerToAdd.answer);
    }

    console.log('answerToAdd is:', answerToAdd);


    calcHistory.push(answerToAdd);
};

    // } else if( calcList.operation = '-');
    // console.log('in calculateAnswer, answer is:', answer); 
// };









app.listen(port, () => {
    console.log('listening on port:', 5000);
});
