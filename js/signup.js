/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

//adds an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
	
    //global variables for my code
    var form = document.getElementById('signup');
    var states = form.elements['state'];
    var option;
	var idx;
	var state;

    //creates
    for (idx = 0; idx < usStates.length;++idx) { 
        state = usStates[idx];
        //new option element for each state in the array
        option = document.createElement('option');
        //properties for new option element
        option.innerHTML = state.name;
        option.value = state.code;
        states.appendChild(option);
    }
    //retrieves the value of the occupation select
    var optionButton = document.getElementById('occupation').value = "other";
    var occupationSelect = document.getElementById('occupation');
    //occupation select list raising an event named change and
    //adds event listener
    occupationSelect.addEventListener('change', function() {
    	if("other" == occupationSelect.value) {
    		form.elements['occupationOther'].style.display = "block";
    	}
    	else {
    		form.elements['occupationOther'].style.display = "none";
    	}
    });

    //user confirms the action of redirecting to google
    var nothx = document.getElementById('cancelButton');
    nothx.addEventListener('click', function() {

        //used to let the user confirm something
        if(window.confirm('Are you sure you want to leave this page?')) {
            window.location = 'http://www.google.com/';
        }
    });
    //adds event listener for the submit element
    form.addEventListener('submit', onSubmit);
});

function onSubmit(eventObj) {
    //global variables assigned to invalid fields in my form
    var form = document.getElementById('signup');
    var firstName = document.getElementById('firstName').value;
    var lastName = form.elements['lastName'].value;
    var address = document.getElementById('address1').value;
    var city = document.getElementById('city').value;
    var state = form.elements['state'].value;
    var zip = form.elements['zip'].value;
    var birthday = document.getElementById('birthdate').value;
    var occupationSelect = document.getElementById('occupation');
    var date = new Date(birthday);
    var today = new Date();
    var occupationOther = form.elements['occupationOther'];
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = true;
    //catches the exception that prevents the browser 
    //from not running my script in the developer tools console
    try {
        valid = validateForm(this);
    }
    catch(exception) {
        valid = false; //stop form submission to see error
    }
    if (!valid && eventObj.preventDefault) {
            eventObj.preventDefault(); 
    }
    //prohibit the form from being submitted by calling the event object's
    //preventDefault() method
    //use new standard preventDefault() if available
    event.returnValue = valid; //for older browsers
    return valid;

    function validateForm() {
        var validation = true;
        //manipulates my validation boolean so that it is false as the user is
        //inputting all this information
        if (firstName == "") {
            document.getElementById('firstName').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('firstName').className = 'form-control';
        }
        if (lastName == "") {
            form.elements['lastName'].className = 'form-control invalid-field';
            validation = false;
        }
        else {
            form.elements['lastName'].className = 'form-control';
        }
        if (address == "") {
            document.getElementById('address1').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('address1').className = 'form-control';
        }
        if (city == "") {
            document.getElementById('city').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('city').className = 'form-control';
        }
        if (state == "") {
            form.elements['state'].className = 'form-control invalid-field';
            validation = false;
        }
        else {
            form.elements['state'].className = 'form-control';
        }
        if (zip == "") {
            form.elements['zip'].className = 'form-control invalid-field';
            validation = false;
        }
        else if(zip != "") {
            //uses the regexp object to test the zip field's value against this 
            //expression
            if (!zipRegExp.test(zip)) {
                form.elements['zip'].className = 'form-control invalid-field';
                validation = false;
            }
            else {
                form.elements['zip'].className = 'form-control';
            }
        } 
        if(occupationSelect.value == "other" && occupationOther.value == "") {
            occupationOther.className = 'form-control invalid-field';
            validation = false;
        }
        else {
            occupationOther.className = 'form-control';
        }
        if(birthday == "") {
            document.getElementById('birthdate').className = 'form-control invalid-field';
            validation = false;
        }
        else if(birthday != "") {
            //creates the condition for my birthdate year:
            //the user has to be 13 years old or older otherwise the form will
            //not allow him to fully submit the user's information
            var yearsDiff = today.getFullYear() - date.getUTCFullYear();
            var monthsDiff = today.getMonth() - date.getUTCMonth();
            var daysDiff = today.getDate() - date.getUTCDate();
            if (((yearsDiff < 13) || (yearsDiff == 13 && monthsDiff < 0)) || 
                ((yearsDiff == 13 && monthsDiff == 0) && (daysDiff < 0))) 
            {
                var message = document.getElementById('birthdateMessage');
                //displays message
                message.innerHTML = "You have to be at least 13 years old. Patience is a virtue!";
                document.getElementById('birthdate').className = 'form-control invalid-field';
                validation = false;
            }
            else {
                //retrieve user input for birthday
                var message = document.getElementById('birthdateMessage');
                message.innerHTML = "";
                document.getElementById('birthdate').className = 'form-control';
            }
        }
        return validation;
    }
}