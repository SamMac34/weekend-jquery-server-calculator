const { response } = require("express");

$(document).ready(onReady);
    console.log('JS ready!');

function onReady() {
    console.log('JQ ready!')

    // Get calculations history
    getHistory();

    // submit listener
    $('#submit-btn').on('click', compute)

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
// POST request to submit/Compute the equation
function compute(event) {
    event.preventDefault();

    const firstNumberInput = $('#first-number-input').val();
    const secondNumberInput = $('#second-number-input').val();
    const operationType = $('.operation-type').val();

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
}

