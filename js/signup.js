/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
//adds an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', onReady);

function onReady() {

    //global variables for my code
    var signupForm = document.getElementById('signup');
    var occupationOther = signupForm.elements['occupationOther'];
    var occupationSelect = signupForm.elements['occupation'];
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

    var stateSelect = signupForm.elements['state'];

    var cancelButton = document.getElementById('cancelButton');
    var idx;
    var option;

    //creates my new option element for each state in the array
    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        stateSelect.appendChild(option);
    }

    //retrieves the value of the occupation select
    occupationSelect.addEventListener('change', function () {
        if (occupationSelect.value == 'other') {
            occupationOther.style.display = "inline";
        }
        else {
            occupationOther.style.display = "none";
        }
    });
    //event listener for leaving the page window
    cancelButton.addEventListener('click', function () {
        if (window.confirm("Are you sure you want to leave?")) {
            window.location.href = "http://google.com";
        }
    });

    //catches the exception that prevents the browser from not running my script in the developer
    //tools console
    signupForm.addEventListener('submit', onSubmit);

    function onSubmit(eventObject) {
        try {
            eventObject.returnValue = validateForm(this);
        }
        catch(error) {
            console.log(error);//stop form submission to see error
        }
        if (!eventObject.returnValue && eventObject.preventDefault) {
            eventObject.preventDefault();
        }
        //prohibit the form from being submitted by calling the event objecct
        return eventObject.returnValue;
    }

    //manipulates my validation boolean so that it is false
    //as the user is inputting all this information
    function validateForm(form) {
        var idx;
        var formValid = true;

        if (occupationSelect.value == 'other') {
            requiredFields.push('occupationOther');
        }

        //retrieves the required field elements
        for (idx = 0; idx < requiredFields.length; ++idx) {
            var requiredField = form.elements[requiredFields[idx]];
            formValid &= validateRequiredField(requiredField);
        }
        return formValid;
    }

    function validateRequiredField(field) {
        var value = field.value.trim();
        var valid;

        //conditions for my zip code element
        if (field.name == 'zip') {
            var zipRegExp = new RegExp('^\\d{5}$');
            valid = zipRegExp.test(value);
            if (value.length > 0 && !valid) {
                window.alert('Zip code must be 5 digits');
            }
        }
        //return the value of birthday difference
        else if (field.name == 'birthdate') {
            valid = testDate(value);
        }
        else {
            valid = value.length > 0;
        }
        field.className = valid ? 'form-control' : 'form-control invalid-field';
        return valid;
    }
    //tests if the user is older than 13 years old
    function testDate(dob) {
        var birthdateMessage = document.getElementById('birthdateMessage');
        if (dob.length > 0) {
            var valid = moment().diff(dob, 'years') >= 13;
            //user is not as old as 13 years old
            if (!valid) {
                birthdateMessage.innerHTML = 'You must be 13 years old to sign up';
                birthdateMessage.style.display = 'inline';
            }
            //user is 13 years old or older
            else {
                birthdateMessage.style.display = 'none';
            }
            return valid;
        }
        birthdateMessage.style.display = 'none';
        return false;
    }
}