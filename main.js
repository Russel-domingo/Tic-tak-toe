const Tiles = function () {

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
            board[row, col] = value;
        }
    }

    generateBoard();

    return {
        board,
        getBoard,
        setTiles,
    };
};

const tiles = Tiles();
console.log(tiles.board);
