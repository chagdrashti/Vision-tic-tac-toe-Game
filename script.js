document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const messageContainer = document.getElementById('message-container');
    const message = document.getElementById('message');
    const newGameBtn = document.getElementById('new-game-btn');
    const status = document.getElementById('status');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => cellClick(index));
            board.appendChild(cellElement);
        });
        updateStatus();
    };

    const updateStatus = () => {
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], 
          [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkDraw = () => {
        return !gameBoard.includes('');
    };

    const endGame = (winner) => {
        gameActive = false;
        message.textContent = winner ? `Player ${winner} wins!` : 'It\'s a draw!';
        messageContainer.classList.remove('hidden');
        renderBoard();
    };

    const cellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            endGame(winner);
        } else if (checkDraw()) {
            endGame(null);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    newGameBtn.addEventListener('click', () => {
        resetGame();
        messageContainer.classList.add('hidden');
    });

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        renderBoard();
    };

    renderBoard();
});
