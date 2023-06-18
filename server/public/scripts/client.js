// const { response } = require("express");

$(document).ready(onReady);
    console.log('JS ready!');

function onReady() {
    console.log('JQ ready!')

    // Get calculations history
    getHistory();

    // submit listener
    $('#submit-btn').on('click', compute)

    // math operation button listeners
    $('.operation-type').on('click', captureOperation)

}

// GET request to display calculations history
function getHistory() {
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then((response) => {
        console.log('Get history Success!', response);
        render(response);
    }).catch((error) => {
        alert('Request failed');
        console.log('Error from server!', error);
    });
}

// POST request to submit the equation to server
function compute(event) {
    event.preventDefault();

    const firstNumberInput = $('#first-number-input').val();
    const secondNumberInput = $('#second-number-input').val();
    operationType = $('.operation-type').val();

    $.ajax({
        method: 'POST',
        url: '/calcs',
        data: {
            calcToAdd: {
                num1: firstNumberInput,
                num2: secondNumberInput,
                operation: operationType
            }
        }
    }).then((response) => {
        console.log('Success posting calc to server!', response);
        getHistory();
    }).catch((error) => {
        alert('Error posting to server!');
        console.log('Error posting to server', error);
    })
};

// Capture the operationType button value
function captureOperation(event) {
    event.preventDefault();
    let operationType = $('.operation-type').val();
    console.log('in captureOperation, value is:', operationType);

};

// function preventDefault(event) {
//     event.preventDefault();
// }

function render(response) {
    $('#history').empty();

    for( let equation of response) {
        $('#history').append(`
            <li>
                ${equation.num1} ${equation.operation} ${equation.num2} = ${equation.answer}
            </li>
        `)
    }

    // if(calcHistory.length > 3)
    // $('#answer').empty();
    // $('#answer').append(`
    //     <h2>
    //         The answer is: ${equation.answer}
    //     </h2>
    // `)

};

        // The answer is: ${calcHistory[calcHistory.length -1]}
