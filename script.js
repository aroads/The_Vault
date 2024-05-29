// Game Mechanics Outline for "Shadow Vault"

// 1. Setup the Grid and Symbols
//    - Generate a 6x6 grid with random symbols from a predefined set.
//    - Display the grid on the game board.

function generateGrid(columns, rows) {
    // Generate grid logic here
}
generateGrid(6, 6);

// 2. Implement Drag-and-Drop Mechanics for Candles
//    - Enable candles to be draggable.
//    - Allow candles to be dropped onto specific placeholders.
//    - Play sound effects for picking up and dropping candles.

document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', draggable.id);
        playSound('candle-pickup.mp3'); // Play sound effect
    });
});

document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.addEventListener('dragover', e => {
        e.preventDefault();  // Necessary for dropping
    });

    placeholder.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        placeholder.appendChild(draggable);
        // Reset position properties
        draggable.style.position = 'relative';
        draggable.style.left = '';
        draggable.style.top = '';
        playSound('candle-drop.mp3'); // Play sound effect
    });
});

// 3. Highlight Symbols Based on Candle Positions
//    - Determine which symbols should be highlighted based on the positions of the candles.
//    - Update the grid to reflect the highlighted symbols.

function highlightSymbols() {
    // Logic to highlight symbols based on candle positions
}

// 4. Check the Passcode
//    - Verify if the highlighted symbols form the correct passcode.
//    - If the passcode is correct, trigger animations and sound effects (e.g., grid crumbling and spooky scream).

function checkPasscode() {
    // Logic to check if the highlighted symbols form the correct passcode
    if (isCorrectPasscode) {
        playSound('spooky-scream.mp3'); // Play spooky scream
        playAnimation('grid-crumbling'); // Trigger grid crumbling animation
    }
}

// 5. Sound and Music
//    - Implement background music that loops throughout the game.
//    - Add sound effects for various game actions (e.g., candle movement, passcode success).

function playSound(filename) {
    const audio = new Audio(`sounds/${filename}`);
    audio.play();
}

function playBackgroundMusic() {
    const backgroundMusic = new Audio('sounds/background-music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();
}
playBackgroundMusic(); // Start background music

// 6. Animations
//    - Create smooth animations for candle movements.
//    - Animate the grid crumbling when the passcode is correctly guessed.

function playAnimation(animationName) {
    const grid = document.getElementById('puzzle-area');
    grid.classList.add(animationName);
}

// Example CSS for animations
/*
.draggable {
    transition: transform 0.3s ease; // Smooth transition for movement
}

@keyframes gridCrumble {
    0% { transform: scale(1); }
    100% { transform: scale(0); }
}

.grid-crumbling {
    animation: gridCrumble 1s forwards; // Play crumbling animation
}
*/

// 7. Future Enhancements
//    - Add visual feedback for dragging over placeholders.
//    - Add more complex rules for symbol generation and passcode verification.
//    - Enhance the user interface with more detailed graphics and effects.

/////////


const puzzleArea = document.getElementById('puzzle-area');
const symbols = ['Ω', 'α', 'β', 'γ', 'δ', 'Ø', 'Ξ', 'λ'];

function generateGrid(columns, rows) {
    for (let i = 0; i < 36; i++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        puzzleArea.appendChild(cell);
    }
}

//Generate 6X6 grid
generateGrid(6, 6);

document.querySelectorAll('.draggable').forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', draggable.id);
    });
});



document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.addEventListener('dragover', e => {
        e.preventDefault();  // Necessary for dropping
    });

    placeholder.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        placeholder.appendChild(draggable);
        draggable.style.position = 'relative';  // Reset to flow normally within the placeholder
        draggable.style.left = '';  // Clear any previous positions
        draggable.style.top = '';
    });
});