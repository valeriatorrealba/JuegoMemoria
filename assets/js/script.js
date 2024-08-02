// Crea un tablero de cartas
var emojis = ['🐱', '🐶', '🐭', '🐰', '🐻', '🐼', '🐨', '🦁']; // Puedes agregar más emojis
var gameBoard = document.getElementById('game-board');
var flippedCards = [];
var matchedPairs = 0;

// Función para crear el tablero de cartas
function createGameBoard() {
    var shuffledEmojis = shuffle(emojis.concat(emojis));
    shuffledEmojis.forEach(function (emoji, index) {
        var cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);
        cardElement.setAttribute('data-emoji', emoji); // Asigna el emoji a la carta
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Función para mezclar las cartas
function shuffle(array) {
    var currentIndex = array.length, tempValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
}

// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-emoji'); // Muestra el emoji
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Función para verificar si las cartas coinciden
function checkMatch() {
    var firstCard = flippedCards[0].getAttribute('data-emoji');
    var secondCard = flippedCards[1].getAttribute('data-emoji');

    if (firstCard === secondCard) {
        flippedCards.forEach(function (card) {
            card.classList.add('matched');
        });
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            alert('¡Felicidades! Has encontrado todas las parejas.');
        }
    } else {
        flippedCards.forEach(function (card) {
            card.classList.remove('flipped');
            card.textContent = '';
        });
    }

    flippedCards = [];
}

// Iniciar el juego
createGameBoard();