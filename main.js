let header = document.querySelector('.header');
let swiper = document.querySelector('.header__swiper');
let radioButtons = document.querySelectorAll('.radioBtn');

// displaying what decision is made
let sayDecision = document.querySelector('.say-decision');

// main button to make decision
let mainButton = document.querySelector('.main-button');

// this is where inputs for decisions are put in DOM
let editDecisions = document.querySelector('.edit-decisions');

let decisionValue = 1;
let newChoicesValues = [];

// after picking option, notifies you yhe main button is rdy for a click
const amplifyMainBtn = () => {
    mainButton.classList.toggle('amplifyMe');
    setTimeout(() => mainButton.classList.toggle('amplifyMe'), 500);
};

// takes values of radio buttons, on how many decisions you want
radioButtons.forEach(el => el.addEventListener('click', (e) => {
    decisionValue = e.target.value;
    e.target.parentNode.classList.add('activeChoice');
}));

radioButtons[0].addEventListener('click', () => {
radioButtons[1].parentNode.classList.remove('activeChoice');
editDecisions.innerHTML = '';
amplifyMainBtn();
    }
);

radioButtons[1].addEventListener('click', () => {
radioButtons[0].parentNode.classList.remove('activeChoice');
radioButtons[2].parentNode.classList.remove('activeChoice');
editDecisions.innerHTML = '';
amplifyMainBtn();
    }
);

radioButtons[2].addEventListener('click', () => {
    editDecisions.innerHTML = '';
    createAddMoreBtn();
    radioButtons[0].parentNode.classList.remove('activeChoice');
    radioButtons[1].parentNode.classList.remove('activeChoice');
    createDecisionInput(decisionValue);
    pickUpChoices();
    }
);

// pick up choices
const pickUpChoices = () => {
    let numberOfChoices = document.querySelectorAll('.newChoice');
    let lastChoice =numberOfChoices[numberOfChoices.length -1];

    numberOfChoices.forEach(el => {
        el.addEventListener('change', (e) => newChoicesValues.push(e.target.value));
        el.addEventListener('input', () => {
            if (lastChoice.value != '') {
                amplifyMainBtn();
            }
        });
    });

    if (numberOfChoices.length == 6) {
        let addMoreBtn = document.querySelector('.addMoreBtn');
        addMoreBtn.style.display = 'none';
    }
};

//creates DOM inputs for decisions
const createDecisionInput = (howManyDecisions) => {
    for (let i = 0; i < howManyDecisions; i++) {
        let decision = document.createElement('INPUT');
        decision.setAttribute('type', 'text');
        decision.setAttribute('required', true);
        decision.classList.add('newChoice');
        decision.placeholder = 'enter new ...';
        editDecisions.appendChild(decision);
    } 
};

// creates add more choices button
const createAddMoreBtn = () => {
    let btn = document.createElement('BUTTON');
    btn.setAttribute('type', 'button');
    btn.appendChild(document.createTextNode('add more'));
    btn.addEventListener('click', () => {
        createDecisionInput(1);
        pickUpChoices();
    });
    btn.classList.add('addMoreBtn');
    editDecisions.appendChild(btn);
};

// create random number between twwo values
const createRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
};

// finally, displays random decision on main button click
const makeDecision = (arrayOfChoices) => {
    if (decisionValue == 1) {
        // swipeHeader();
        return 'choose something';
    }
    if (decisionValue == 2) {
        let randomNum = createRandomNumber(1, 3);
        if(randomNum == 1) {
            return 'A';
        } else {
            return 'B';
        }
    }
    if (decisionValue == 3) {
        let randomNum = createRandomNumber(1, 4);
        if (randomNum == 1) {
            return 'A';
        }
        if (randomNum == 2) {
            return 'B';
        }
        if (randomNum == 3) {
            return 'C';
        }
    }
    if (decisionValue >= 4) {

        if (arrayOfChoices.length < 3) {
            swipeHeader();
            return "fill all fields";
        }
        if (arrayOfChoices.length == 4) {
            let randomNum = createRandomNumber(1, 5);
            if (randomNum == 1) {
                return arrayOfChoices[0];
            }
            if (randomNum == 2) {
                return arrayOfChoices[1];
            }
            if (randomNum == 3) {
                return arrayOfChoices[2];
            }
            if (randomNum == 4) {
                return arrayOfChoices[3];
            }
        }
        if (arrayOfChoices.length == 5) {
            let randomNum = createRandomNumber(1, 6);
            if (randomNum == 1) {
                return arrayOfChoices[0];
            }
            if (randomNum == 2) {
                return arrayOfChoices[1];
            }
            if (randomNum == 3) {
                return arrayOfChoices[2];
            }
            if (randomNum == 4) {
                return arrayOfChoices[3];
            }
            if (randomNum == 5) {
                return arrayOfChoices[4];
            }
        }
        if (arrayOfChoices.length == 6) {
            let randomNum = createRandomNumber(1, 7);
            if (randomNum == 1) {
                return arrayOfChoices[0];
            }
            if (randomNum == 2) {
                return arrayOfChoices[1];
            }
            if (randomNum == 3) {
                return arrayOfChoices[2];
            }
            if (randomNum == 4) {
                return arrayOfChoices[3];
            }
            if (randomNum == 5) {
                return arrayOfChoices[4];
            }
            if (randomNum == 6) {
                return arrayOfChoices[5];
            }
        }
    }
};

// this swipes header on click
const swipeHeader = () => header.classList.toggle('swiped');

swiper.addEventListener('click', swipeHeader);

mainButton.addEventListener('click', () => {
    sayDecision.innerHTML = makeDecision(newChoicesValues);
    newChoicesValues = [];
    swipeHeader();
    document.querySelector('.activeChoice')?.classList?.toggle('activeChoice');
    editDecisions.innerHTML = '';
});