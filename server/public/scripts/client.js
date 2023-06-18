$(document).ready(onReady);
    console.log('JS ready!');

function onReady() {
    console.log('JQ ready!');

    // Get calculations history
    getHistory();

    // submit listener
    $('#submit-btn').on('click', compute);

    // math operation button listeners
    $('#inputs').on('click', '.plus-btn',  captureOperation);
    $('#inputs').on('click', '.minus-btn', captureOperation);
    $('#inputs').on('click', '.multiply-btn', captureOperation);
    $('#inputs').on('click', '.divide-btn', captureOperation);

    // Clear inputs listener
    $('#inputs').on('click', '#clear-btn', clearInputs);


}

let operationType;

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
    
    // If statement to require math operation input
    if( operationType == undefined ) {
        alert( 'Must enter operator +, -, *, or / .' );
    } else if( firstNumberInput == '' ) {
        alert( 'Must enter a value for First Number!' );
    } else if( secondNumberInput == '' ) {
        alert( 'Must enter a value for Second Number' );
    } else {
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
};

// Capture the operationType button value
function captureOperation(event) {
    event.preventDefault();
    operationType = `${this.value}`;

};

// Render data to page
function render(response) {
    $('#history').empty();

    for( let equation of response) {
        $('#history').append(`
            <li>
                ${equation.num1} ${equation.operation} ${equation.num2} = ${equation.answer}
            </li>
        `)
        $('#answer').empty();
        $('#answer').append(`
            <h2>
                ${equation.num1} ${equation.operation} ${equation.num2} = ${equation.answer}
            </h2>
        `)  
    }
};

// Clear inputs
function clearInputs(event) {
    event.preventDefault();
    $('#first-number-input').val('');
    $('#second-number-input').val('');
    $('#answer').val('');
    
};