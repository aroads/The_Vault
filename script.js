// Game Mechanics Outline for "Shadow Vault"
// 1. Establish Player Registration and Login

//    - Design and implement registration and login forms.
//    - Create a system to store and validate player credentials.
//    - Ensure secure storage of player data.

// 2. AI-Assisted Vault Setup

//    - Passcode Input:
//       - Implement a form for the Vault Setter to input a passcode.
//    - Difficulty Level and AI Adjustment:
//       - Train an AI model to determine the appropriate difficulty level based on player data.
//       - Integrate the AI model to dynamically adjust difficulty during the vault setup.
//    - Hint Generation:
//       - Use an NLP model to generate hints based on the passcode and difficulty level.
//       - Store the generated hints in the vault data.
//    - Dynamic Cipher Creation:
//       - Develop a method for the AI to create ciphers matching the Solver's skill level.
//       - Integrate this method into the vault setup process.

// 3. Update Grid Symbols

//    - Develop a function to assign symbols to the passcode based on cipher logic.
//    - Implement logic to mix these symbols with other random symbols.
//    - Create a grid and assign symbols to grid cells dynamically.

// 4. Highlight Symbols Based on Candle Positions

//    - Develop a system to determine which symbols should be highlighted based on candle positions.
//    - Update the grid to reflect the highlighted symbols when candles are moved.

// 5. Verify Correct Symbols Are Collected

//    - Implement a method to verify if the highlighted symbols form the correct passcode.
//    - Trigger the cipher if the passcode is correct.

// 6. Display Cipher and Prompt for Passcode

//    - Display the cipher using the collected symbols and passcode.
//    - Prompt the Solver to enter the correct passcode.
//    - Provide hints after a specified number of incorrect attempts.

// 7. Sound and Music

//    - Add background music that loops throughout the game.
//    - Implement sound effects for various game actions.

// 8. Animations

//    - Create smooth animations for candle movements.
//    - Animate the grid crumbling when the passcode is correctly guessed.

// 9. Future Enhancements

//    - Implement visual feedback for dragging over placeholders.
//    - Develop more complex rules for symbol generation and passcode verification.
//    - Enhance the user interface with more detailed graphics and effects.
//    - Further integrate AI-powered adaptive difficulty and hint generation bas
//    Create link to send to other person



//   2. Update grid symbols
//    - Assign symbols to passcode based on cipher logic
//    - mix with other symbols, potentially
//    - assign symbols to grid cells

// 3. Highlight Symbols Based on Candle Positions
//    - Determine which symbols should be highlighted based on the candles.
//    - Update the grid to reflect the highlighted symbols.

// function highlightSymbols() {
// Logic to highlight symbols based on candle positions
// }

// 4. Verify correct symbols are collected
//    - Verify if the highlighted symbols are correct.
//    - If the passcode is correct, trigger cipher

// 5. Display Cipher
//    - Display the cipher based on the symbols collected and passcode
//    - Prompt solver for correct passcode
//     - Offer hints after x attempts
// 6. Solved Cipher
//     - If solver offers correct passcode
//    - animations and sound effects (e.g., grid crumbling and spooky scream).
// function checkPasscode() {
// Logic to check if the highlighted symbols form the correct passcode
//    if (isCorrectPasscode) {
//        playSound('spooky-scream.mp3'); // Play spooky scream
//        playAnimation('grid-crumbling'); // Trigger grid crumbling animation
//    }
// }

// 5. Sound and Music
//    - Implement background music that loops throughout the game.
//    - Add sound effects for various game actions (e.g., candle movement, passcode success).

// function playSound(filename) {
//    const audio = new Audio(`sounds/${filename}`);
//    audio.play();
// }

// function playBackgroundMusic() {
//    const backgroundMusic = new Audio('sounds/background-music.mp3');
//    backgroundMusic.loop = true;
//    backgroundMusic.play();
// }
// playBackgroundMusic(); // Start background music

// 6. Animations
//    - Create smooth animations for candle movements.
//    - Animate the grid crumbling when the passcode is correctly guessed.



// 1. Set up grid and symbols
//    - Create a grid of 6x6 cells with symbols in each cell.

const puzzleArea = document.getElementById('puzzle-area');
const vaultSetupForm = document.getElementById('vault-setup-form');
const vaultContentForm = document.getElementById('vault-content-form');
const vaultContentDisplay = document.getElementById('vault-content');
const vaultContentSetup = document.getElementById('vault-content-setup');
const unlockButton = document.getElementById('unlock-button');
const passcodeInput = document.getElementById('passcode-input');
const controlPanel = document.getElementById('control-panel');

const symbols = ['Ω', 'α', 'β', 'γ', 'δ', 'Ø', 'Ξ', 'λ'];
let vaultData = {};

//Handle Form submission for vault set up
vaultSetupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const passcode = document.getElementById('passcode').value.toUpperCase();
    const hint = document.getElementById('hint').value;
    const difficulty = document.getElementById('difficulty').value;

    const cipher_dict = generateCipher(difficulty);
    const symbols = passcode.split('').map(char => cipher_dict[char]);

    vaultData = {
        passcode: passcode,
        hint: hint,
        difficulty: difficulty,
        cipher_dict: cipher_dict,
        symbols: symbols
    };

    document.getElementById('vault-setup').style.display = 'none';
    vaultContentSetup.style.display = 'block';
});

// Handle form submission for vault content setup
vaultContentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const content = document.getElementById('content').value;
    try {
        vaultData.content = btoa(unescape(encodeURIComponent(content))); // Ensure correct Base64 encoding
    } catch (e) {
        console.error("Error encoding content: ", e);
        alert("Failed to encode content. Please try again.");
        return;
    }

    vaultContentSetup.style.display = 'none';
    document.getElementById('puzzle-area').style.display = 'grid';

    generateGrid(6, 6, vaultData.symbols);
});


function generateCipher(difficulty) {
    const base_dict = {
        'A': '!', 'B': '@', 'C': '#', 'D': '$', 'E': '%', 'F': '^', 'G': '&', 'H': '*', 'I': '(', 'J': ')',
        'K': '-', 'L': '_', 'M': '=', 'N': '+', 'O': '{', 'P': '}', 'Q': '[', 'R': ']', 'S': ':', 'T': ';',
        'U': '"', 'V': "'", 'W': '<', 'X': '>', 'Y': '?', 'Z': '/', ' ': ' '
    };
    if (difficulty === "Medium") {
        for (const key in base_dict) {
            base_dict[key] = String.fromCharCode(base_dict[key].charCodeAt(0) + 1);
        }
    } else if (difficulty === "Hard") {
        for (const key in base_dict) {
            base_dict[key] = String.fromCharCode(base_dict[key].charCodeAt(0) + 2);
        }
    }
    return base_dict;
}


function generateGrid(columns, rows, symbols) {
    puzzleArea.innerHTML = '';
    const gridSymbols = [...symbols];
    while (gridSymbols.length < columns * rows) {
        const randomSymbol = Object.values(vaultData.cipher_dict)[Math.floor(Math.random() * Object.values(vaultData.cipher_dict).length)];
        gridSymbols.push(randomSymbol);
    }
    shuffleArray(gridSymbols);

    for (let i = 0; i < 36; i++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        puzzleArea.appendChild(cell);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//   Play sound effects when candle shift occurs. 
function playSound(filename) {
    const audio = new Audio(filename);
    audio.play();
}

//    Swap two elements in the DOM
function swapElements(el1, el2) {
    const parent1 = el1.parentNode;
    const sibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;

    el2.parentNode.insertBefore(el1, el2);
    parent1.insertBefore(el2, sibling1);
}

// Add click event listeners to candles
document.querySelectorAll('.draggable').forEach((candle, index, candles) => {
    candle.addEventListener('click', () => {
        if (index > 0) {
            // Swap with the left neighbor
            swapElements(candle, candles[index - 1]);
        } else {
            // Swap with the rightmost candle
            swapElements(candle, candles[candles.length - 1]);
        }
        playSound('sounds/candle_shift.mp3'); // Play shift sound
    });
});

// Placeholder for highlighted symbols based on candle positions
function highlightSymbols(position) {
    const symbolGrid = document.getElementById('symbol-grid').children;
    const symbolIndex = position[0] * 6 + position[1];
    const symbolElement = symbolGrid[symbolIndex];
    symbolElement.classList.add('highlighted');
}

// Function to unlock the vault and display content
unlockButton.addEventListener('click', () => {
    const inputPasscode = passcodeInput.value.toUpperCase();
    const revealedSymbols = Array.from(document.getElementsByClassName('highlighted')).map(el => el.textContent);
    const decodedPasscode = revealedSymbols.map(symbol => Object.keys(vaultData.cipher_dict).find(key => vaultData.cipher_dict[key] === symbol)).join('');

    if (inputPasscode === decodedPasscode) {
        try {
            vaultContentDisplay.innerHTML = decodeURIComponent(escape(atob(vaultData.content))); // Decrypt and display content
        } catch (e) {
            console.error("Error decoding content: ", e);
            alert("Failed to decode content. Please try again.");
            return;
        }
        vaultContentDisplay.style.display = 'block';
        playSound('sounds/unlock.mp3'); // Play unlock sound
    } else {
        alert('Incorrect passcode. Try again.');
    }
});