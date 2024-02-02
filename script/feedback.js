function openMessageBox() {
    document.getElementById('messageBox').style.display = 'block';
    document.getElementById('thanksMessage').style.display = 'none';
}

function sendMessage() {
    const userEmail = document.getElementById('userEmail').value;
    console.log(userEmail)
    if (userEmail == "") {
        alert("Please add email")
    }
    else {
        const userContact = document.getElementById('userContact').value;
        const userMessage = document.getElementById('userMessage').value;
        const formData = {
            email: userEmail,
            contact: userContact,
            message: userMessage
        };

        fetch('https://feedback-production-76e1.up.railway.app/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Do something after successful post, like displaying a success message
                console.log(response.status);
                document.getElementById('messageBox').style.display = 'none';
                document.getElementById('thanksMessage').style.display = 'block';
            })
            .catch(error => {
                // Handle errors
                console.error('There was an error with the POST request:', error);
                // Display an error message to the user, or retry the request, etc.
            });
    }
}



function createElementWithClass(elementType, className) {
    const element = document.createElement(elementType);
    element.className = className;
    return element;
}

function createInputField(type, id, required) {
    const inputField = document.createElement('input');
    inputField.type = type;
    inputField.id = id;
    inputField.required = required;
    return inputField;
}

function createLabelWithTextAndFor(text, htmlFor) {
    const label = document.createElement('label');
    label.className = 'input-label';
    label.htmlFor = htmlFor;
    label.textContent = text;
    return label;
}

function createFeedback() {
    const feedback = document.getElementById('feedback');

    const messageBox = createElementWithClass('div', 'subcard');
    messageBox.id = "messageBox";
    messageBox.style.display = 'block';
    const innerDiv = createElementWithClass('div', 'center');

    const form = createElementWithClass('form', 'messageForm');

    form.appendChild(createLabelWithTextAndFor('Email: ', 'userEmail'));
    form.appendChild(createInputField('email', 'userEmail', true));

    form.appendChild(createLabelWithTextAndFor('Contact Number:', 'userContact'));
    form.appendChild(createInputField('text', 'userContact', true));

    form.appendChild(createLabelWithTextAndFor('Message:', 'userMessage'));

    const textareaMessage = document.createElement('textarea');
    textareaMessage.id = 'userMessage';
    textareaMessage.placeholder = 'Type your message here...';
    textareaMessage.required = true;
    form.appendChild(textareaMessage);

    const spanInvalid = document.createElement('span');
    spanInvalid.id = 'invalid';
    spanInvalid.style.cssText = 'color: white; display: none; background-color: red; text-align: center;';
    spanInvalid.textContent = 'Invalid Email';
    form.appendChild(spanInvalid);

    const buttonEmailCheck = document.createElement('button');
    buttonEmailCheck.id = 'emailcheck';
    buttonEmailCheck.type = 'button';
    buttonEmailCheck.textContent = 'Send';
    buttonEmailCheck.onclick = sendMessage; // Assuming there's a sendMessage function defined elsewhere
    form.appendChild(buttonEmailCheck);

    innerDiv.appendChild(form);
    messageBox.appendChild(innerDiv);

    const thanksMessage = createElementWithClass('div', 'subcard');
    thanksMessage.id = "thanksMessage"
    thanksMessage.style.display = 'none';

    const innerDivThanks = createElementWithClass('div', 'center');
    const titleThanks = createElementWithClass('div', 'title');
    titleThanks.textContent = 'Thanks for your feedback!';
    innerDivThanks.appendChild(titleThanks);

    const buttonGiveFeedback = document.createElement('button');
    buttonGiveFeedback.type = 'button';
    buttonGiveFeedback.textContent = 'Give Another Feedback';
    buttonGiveFeedback.onclick = openMessageBox; // Assuming there's an openMessageBox function defined elsewhere
    innerDivThanks.appendChild(buttonGiveFeedback);

    thanksMessage.appendChild(innerDivThanks);

    feedback.appendChild(messageBox);
    feedback.appendChild(thanksMessage);

    document.getElementById('userContact').addEventListener('input', function (event) {
        const input = event.target;
        input.value = input.value.replace(/\D/g, '').slice(0, 12); // Allow only numeric values
    });
    function validateEmail() {
        const email = document.getElementById('userEmail').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }
    document.getElementById('userEmail').addEventListener('input', function () {
        const Invalid = document.getElementById('emailcheck');
        const Invali = document.getElementById('invalid');
        Invali.style.display = validateEmail() ? 'none' : 'block';
        Invalid.style.display = validateEmail() ? 'block' : 'none';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    createFeedback();
});