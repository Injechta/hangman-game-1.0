// Selectors
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['musculation', 'fitness', 'dietetique', 'plage',
 'halteres', 'natation', 'programmation', 'entrepreneur',
  'interface'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word 
function displayWord () {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ``}
            </span>
    `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Félicitations! Tu as gagné! 😃';
        popup.style.display = 'flex';
    }
}

//Update The Wrong Letters
function updateWrongLettersEl() {
    // Display Wrong Letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` :''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
// Display Parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

// Check If Lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Malheureusement tu as perdu 😭';
        popup.style.display = 'flex';
    }
}

// Show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Key Down Letter Press

window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }  
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restart Game And Play Again
playAgainBtn.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})


displayWord();