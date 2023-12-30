import chess from "./chess.js";

export function createPiece(piece) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const split = piece.split('_');
    div.classList.add('chess-piece');
    div.dataset.color = split[0]
    div.dataset.type = split[1];
    img.src = `bin/chess-set/${piece}.svg`;
    img.draggable = false;
    img.alt = piece;
    img.classList.add('draggable');
    div.appendChild(img);
    return div;
}

const payload = {
    piece: undefined,
    initialX: 0,
    initialY: 0,
    offsetX: 0,
    offsetY: 0,
    initialTransform: undefined,
    elementUnderDrag: undefined,
};

document.addEventListener('mousedown', dragStart);
function dragStart(event) {
    event.preventDefault();

    if(event.target.classList.contains('draggable')) {
        payload.piece = event.target.parentNode;
        payload.piece.style.position = 'absolute';
        payload.initialTransform = window.getComputedStyle(payload.piece).transform;
        payload.initialX = event.clientX - payload.offsetX;
        payload.initialY = event.clientY - payload.offsetY;

        const allMoves = chess.getAllMoves(payload.piece.dataset.type, payload.piece.dataset.color, payload.piece.parentNode.dataset.row, payload.piece.parentNode.dataset.column);
        allMoves.forEach(move => {
            document.querySelectorAll('.chess-board-slot').forEach(slot => {
                if(slot.dataset.row === move[0] && slot.dataset.column === move[1]) {
                    slot.style.filter = 'opacity(.8)';
                }
            });
        });
    }    
}

document.addEventListener('mousemove', dragMove);
function dragMove(event) {
    event.preventDefault();
    document.querySelectorAll('.chess-board-slot').forEach(slot => {
        slot.style.border = '5px solid transparent';
    });
    if (payload.piece) {
        payload.piece.style.display = 'none';
        payload.elementUnderDrag = document.elementFromPoint(event.clientX, event.clientY);
        payload.piece.style.display = 'flex';
        payload.piece.style.zIndex = 9999;

        if(payload.elementUnderDrag.parentNode.classList.contains('chess-piece') && payload.elementUnderDrag.parentNode.dataset.color !== payload.piece.dataset.color) {
            payload.elementUnderDrag.parentNode.parentNode.style.border = '5px solid rgb(0, 255, 34)';
        }
        if(payload.elementUnderDrag.parentNode.classList.contains('chess-piece') && payload.elementUnderDrag.parentNode.dataset.color == payload.piece.dataset.color) {
            payload.elementUnderDrag.parentNode.parentNode.style.border = '5px solid rgb(355, 34, 0)';
        }
        if(payload.elementUnderDrag && payload.elementUnderDrag.classList.contains('chess-board-slot')){
            payload.elementUnderDrag.style.border = '5px solid rgb(0, 255, 34)';
        }

        payload.offsetX = event.clientX - payload.initialX;
        payload.offsetY = event.clientY - payload.initialY;
        payload.piece.style.transform = `translate(${payload.offsetX}px, ${payload.offsetY}px)`;
    }
}

document.addEventListener('mouseup', dragEnd);
function dragEnd(event) {
    event.preventDefault();

    if (payload.piece) {
        payload.piece.style.position = 'static';
        if(payload.elementUnderDrag) {
            if(payload.elementUnderDrag.parentNode.classList.contains('chess-piece') && payload.elementUnderDrag.parentNode.dataset.color !== payload.piece.dataset.color) {
                payload.elementUnderDrag.parentNode.remove();
                payload.piece.style.display = 'none';
                payload.elementUnderDrag = document.elementFromPoint(event.clientX, event.clientY);
                payload.piece.style.display = 'flex';
                payload.piece.style.transform = null;
                payload.elementUnderDrag.appendChild(payload.piece);
            }
            else if(payload.elementUnderDrag.children.length == 0 && payload.elementUnderDrag.classList.contains('chess-board-slot')) {
                payload.piece.style.transform = null;
                payload.elementUnderDrag.appendChild(payload.piece);
            }
            else {
                console.log('invalid move');
                payload.piece.style.transform = payload.initialTransform;
            }
        }
        else {
            console.log('invalid move');
            payload.piece.style.transform = payload.initialTransform;
        }
        document.querySelectorAll('.chess-board-slot').forEach(slot => {
            slot.style.filter = null;
        });
        payload.piece.style.zIndex = 100;
    }
    payload.piece = undefined;
    payload.initialX = 0;
    payload.initialY = 0;
    payload.offsetX = 0;
    payload.offsetY = 0;
    payload.initialTransform = undefined;
    payload.elementUnderDrag = undefined;
}