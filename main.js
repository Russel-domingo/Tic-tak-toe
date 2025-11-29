const Tiles = function (){

    let row = 3;
    let col = 3;
    let board = []
    let value = "";

    function generateBoard() {
        for (let i = 0; i < row; i++) {
            board[i] = [];
            for (let j = 0; j < col; i++) {
                board[i][j] = value;
            }
        }
    }

    return {
        generateBoard
    }
}

const tiles = Tiles();
console.log(tiles.generateBoard());