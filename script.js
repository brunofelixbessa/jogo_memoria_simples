const animals = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁"];

// Criação do tabuleiro
const board = document.getElementById("board");
let matches = [];
let foundPairs = 0;
let tries = 0;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    const animalsCount = animals.length;
    let animalCountCopy = animalsCount;
    const animalIndices = [];

    while (animalCountCopy > 0) {
        const animalIndex = Math.floor(Math.random() * animalsCount);
        if (!animalIndices.includes(animalIndex)) {
            animalIndices.push(animalIndex);
            animalCountCopy--;

            const animal = animals[animalIndex];

            // Adiciona duas cartas com o mesmo animal
            matches.push(animal, animal);
        }
    }

    // Embaralha as cartas
    matches.sort(() => Math.random() - 0.5);

    // Cria as divs das cartas no tabuleiro
    matches.forEach((animal, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.innerText = "";
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.innerText = matches[this.dataset.index];

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

// Função para verificar se as cartas são iguais
function checkMatch() {
    let isMatch = firstCard.innerText === secondCard.innerText;
    isMatch ? disableCards() : unflipCards();
    incrementTries();
    checkWinCondition();
}

// Função para desabilitar as cartas encontradas
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
    foundPairs++;
}

// Função para virar as cartas novamente
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.innerText = "";
        secondCard.innerText = "";
        resetBoard();
    }, 1000);
}

// Função para reiniciar o tabuleiro
function resetBoard() {
    [lockBoard, firstCard, secondCard] = [false, null, null];
}

// Função para incrementar o número de tentativas
function incrementTries() {
    tries++;
}

// Função para verificar a condição de vitória
function checkWinCondition() {
    if (foundPairs === animals.length) {
        setTimeout(() => {
            alert(
                `Parabéns! Você encontrou todos os pares em ${tries} tentativas.`
            );
            resetGame();
        }, 500);
    }
}

// Função para reiniciar o jogo
function resetGame() {
    board.innerHTML = "";
    matches = [];
    foundPairs = 0;
    tries = 0;
    createBoard();
}

// Inicia o jogo
createBoard();
