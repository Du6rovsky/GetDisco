// Card data default value
const card_data = {
    holder_name: "Ali Gasymov",
    card_number: 5403414685553195,
    expiry: '01/25',
    cvv: 123
}

// Add auto fill button
function add_auto_fill_button() {
    const actions = document.getElementsByClassName('form__actions')[0];
    if (actions) {
        const button = document.createElement('button');
        button.id = 'autofill';
        button.innerHTML = 'Autofill';
        button.addEventListener('click', function () {
            find_form_field();
        }, false);
        actions.appendChild(button);
    }
}

// Find form fields
function find_form_field() {
    let form_fields = document.getElementsByClassName('form__field');
    if (form_fields && form_fields.length > 0) {
        fill_form(form_fields);
    } else {
        const iFrames = document.getElementsByTagName('iframe');
        for (let i = 0; i < iFrames.length; i++) {
            const frame = iFrames[i];
            form_fields = frame.contentWindow.document.getElementsByClassName('form__field');
            if (form_fields && form_fields.length > 0) {
                fill_form(form_fields);
                break;
            }
        }
    }
}

// Filling form by card data
function fill_form(fields) {
    _.map(fields, (f) => {
        if (_.includes(f.placeholder.toLowerCase(), 'holder')) {
            f.value = card_data.holder_name;
        }
        if (_.includes(f.placeholder.toLowerCase(), 'number')) {
            f.value = card_data.card_number;
        }
        if (_.includes(f.placeholder.toLowerCase(), 'exp')) {
            f.value = card_data.expiry;
        }
        if (_.includes(f.placeholder.toLowerCase(), 'cvv')) {
            f.value = card_data.cvv;
        }
    })
}

// DOM checker
function nodeInsertedCallback(event) {
    const auto_fill_button = document.getElementById('autofill');
    if (!auto_fill_button) {
        add_auto_fill_button();
    }
}

/**
 *  Listen for DOM ready
 *  It's tricky because 'document.addEventListener('DOMContentLoaded', function(){})' is not universal
 */
$(document).ready(function () {
    nodeInsertedCallback();
});

// Listen for DOM changes
document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
