const board = document.querySelector('.chess-board');

const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function createSlot(row, column , color) {
    const div = document.createElement('div');
    div.classList.add('chess-board-slot');
    div.classList.add(`slot-${color}`);
    div.dataset.row = row;
    div.dataset.column = column;
    return div;
}

function drawBoard() {
    let currentColor = 'white'
    for(let i = 0; i < rows.length; i++) { //create the grid
        for (let j = 0; j < 8; j++) {
            if(columns[j] !== 'a') {
                if(currentColor === 'white') {currentColor = 'black';}
                else {currentColor = 'white'}
            }
            const newSlot = createSlot(rows[i], columns[j], currentColor)
            board.appendChild(newSlot);
        }
    }
}

function spawnPices() {
    chessboard.forEach(piece => {
        let foundSlot;
        document.querySelectorAll('.chess-board-slot').forEach(slot => {
            if(slot.dataset.row === piece.row && slot.dataset.column === piece.column) {
                foundSlot = slot;
            }
        });
        foundSlot.appendChild(createPiece(piece.piece));
    });
}

window.onload = () => {
    drawBoard();
    spawnPices();
}