const express =require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));

let calcList = [ { 
    num1: 10, 
    num2: 20,
    operation: '+'
} ,
{ 
    num1: 100, 
    num2: 50,
    operation: '-'
} ]

// Route to get calculations history
app.get('/history', (req, res) => {
    console.log('Request made for calculations /history')
    res.send(calcList)
})












app.listen(port, () => {
    console.log('listening on port:', 5000);
});
