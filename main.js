const Tiles = (function () {

    let rows = 3;
    let cols = 3;
    let board = [];
    let value = "";

    function generateBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < cols; j++) {
                board[i][j] = value;
            }
        }
    }

    function getBoard() {
        return board;
    }

    function setTiles(row, col, value) {
        if(row < 0 || row >= rows || col < 0 || col >= cols) {
            return;
        } else {
            board[row][col] = value;
        }
    }

    function resetBoard() {
        generateBoard();
    }

    generateBoard();

    return {
        getBoard,
        setTiles,
        resetBoard,
    };
})();

const PLayer = (function () {

    function create(name, marker) {
        let isTurn = false;
        
        function getName() {
            return name;
        }

        function getMarker() {
            return marker;
        }

        function setTurn(turn) {
            isTurn = turn;
        }

        function getTurn() {
            return isTurn;
        }

        return {
            getName,
            getMarker,
            setTurn,
            getTurn,
        };
    }

    return {create};
}());

const GameController = (function() {

    const board = Tiles;
    const player1 = PLayer.create("Player1", "X");
    const player2 = PLayer.create("Player2", "O");

    let currentPlayer = player1;

    function switchTurn() {
        if(currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function getCurrentPLayer() {
        return currentPlayer;
    }

    function playMove(row, col) {
        board.setTiles(row, col, currentPlayer.getMarker());

        const winner = checkWinner();
        if(winner) {
            console.log(winner);
        }
        return winner;
    }


    function checkWinner() {
        const b = board.getBoard();

        for(let i = 0; i < 3; i++) {
            if(b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
                return `${currentPlayer.getName()} wins!`;
            }
        }

        for(let i = 0; i < 3; i++) {
            if(b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
                return `${currentPlayer.getName()} wins!`;

            }
        }

        if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
            return `${currentPlayer.getName()} wins!`;
        }
        if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
            return `${currentPlayer.getName()} wins!`;
        }

        return null;
    }

    function resetGame() {
        board.resetBoard();
        currentPlayer = player1;
    }
    return {
        getCurrentPLayer,
        playMove,
        switchTurn,
        checkWinner,
        resetGame,
    };
})();


const BoardUi = (function() {
    const boardContainer = document.querySelector(".board");
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".message");
    const resetBtn = document.getElementById("resetBtn");

    function init() {
        updateMessage();
    }
    function bindCellEvent() {
        cells.forEach(cell => {
            cell.addEventListener('click', () => handleClick(cell));
        });
    }

    function bindResetEvent() {
        resetBtn.addEventListener('click', () => handleReset());
    }

    function handleClick(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if(cell.textContent === "") {
            const result = GameController.playMove(row, col);
            cell.textContent = GameController.getCurrentPLayer().getMarker();

            if (result) {
                message.textContent = result;
                disableBoard();
            } else {
                GameController.switchTurn();
                updateMessage();
            }

        }
    }

    function handleReset() {
        GameController.resetGame();
        resetBoardUi();
    }

    function disableBoard() {
        cells.forEach(cell => {
            cell.style.pointerEvents = "auto";
        });
    }
    function updateMessage() {
        const current = GameController.getCurrentPLayer();
        message.textContent = `${current.getName()}'s turn ${current.getMarker()}`;
    }

    function resetBoardUi (){
        cells.forEach(cell => {
            cell.textContent = "";
        });
        updateMessage();
    }

    return {
        init,
        bindCellEvent,
        bindResetEvent,
        updateMessage,
    }
    
})();

BoardUi.init();
BoardUi.bindCellEvent();
BoardUi.bindResetEvent();


