let gameOver = false; // Flag to check if the game is over
let currentPlayer = 'cross'; // Track the current player ('cross' or 'circle')

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    if (gameOver || !event.target.classList.contains('dropBox') || event.target.hasChildNodes()) {
        return; // Prevent dropping if game is over or box is already occupied
    }

    if (currentPlayer === 'cross' && event.dataTransfer.getData("text").startsWith('circle')) {
        // alert("It's Player 1's turn!");
        return; // Prevent Player 1 from dropping Player 2's piece
    } else if (currentPlayer === 'circle' && event.dataTransfer.getData("text").startsWith('cross')) {
        // alert("It's Player 2's turn!");
        return; // Prevent Player 2 from dropping Player 1's piece
    }

    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);

    event.target.appendChild(droppedElement);
    checkWin();
    switchPlayer(); // Switch to the next player
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const board = document.querySelectorAll('.dropBox');

    const checkPattern = (player) => {
        return winPatterns.some(pattern => 
            pattern.every(index => 
                board[index].hasChildNodes() &&
                board[index].firstChild.classList.contains(player)
            )
        );
    };

    if (checkPattern('cross')) {
        // alert('Player 1 Wins!');
        document.querySelector("#p2").style.textDecoration = "line-through";
        gameOver = true;
        highlightWin('cross');
    } else if (checkPattern('circle')) {
        // alert('Player 2 Wins!');
        document.querySelector("#p1").style.textDecoration = "line-through";
        gameOver = true;
        highlightWin('circle');
    } else if ([...board].every(box => box.hasChildNodes())) {
        // alert('Draw!');
        gameOver = true;
    }
}

function highlightWin(player) {
    const board = document.querySelectorAll('.dropBox');
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    winPatterns.forEach(pattern => {
        if (pattern.every(index => 
            board[index].hasChildNodes() &&
            board[index].firstChild.classList.contains(player)
        )) {
            pattern.forEach(index => {
                board[index].classList.add('highlight'); // Add highlight class
            });
        }
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross'; // Switch turns
}

function resetGame() {
    document.querySelectorAll('.dropBox').forEach(box => {
        box.innerHTML = '';
        box.classList.remove('highlight'); // Reset highlight class
    });
    document.querySelectorAll('.dragBox').forEach(box => {
        const element = box.firstChild;
        if (element) {
            box.appendChild(element);
        }
    });
    gameOver = false; // Reset game over flag
    currentPlayer = 'cross'; // Reset the starting player
}
