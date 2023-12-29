function createPiece(piece, color) { //♔♕♖♗♘♙
    const div = document.createElement('div');
    const img = document.createElement('img');
    const split = piece.split('_');
    div.classList.add('chess-piece');
    div.dataset.pieceColor = split[0]
    div.dataset.pieceName = split[1];
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
    }    
}

document.addEventListener('mousemove', dragMove);
function dragMove(event) {
    event.preventDefault();

    if (payload.piece) {
        payload.offsetX = event.clientX - payload.initialX;
        payload.offsetY = event.clientY - payload.initialY;
        payload.piece.style.transform = `translate(${payload.offsetX}px, ${payload.offsetY}px)`;
    }
}

document.addEventListener('mouseup', dragEnd);
function dragEnd(event) {
    event.preventDefault();

    if (payload.piece) {
        payload.piece.style.display = 'none';
        let elementUnderDrag = document.elementFromPoint(event.clientX, event.clientY);
        payload.piece.style.display = 'flex';
        payload.piece.style.position = 'static';
        if(elementUnderDrag) {
            if(elementUnderDrag.parentNode.classList.contains('chess-piece') && elementUnderDrag.parentNode.dataset.pieceColor !== payload.piece.dataset.pieceColor) {
                elementUnderDrag.parentNode.remove();
                payload.piece.style.display = 'none';
                elementUnderDrag = document.elementFromPoint(event.clientX, event.clientY);
                payload.piece.style.display = 'flex';
                payload.piece.style.transform = null;
                elementUnderDrag.appendChild(payload.piece);
            }
            else if(elementUnderDrag.children.length == 0 && elementUnderDrag.classList.contains('chess-board-slot')) {
                payload.piece.style.transform = null;
                elementUnderDrag.appendChild(payload.piece);
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
    }
    payload.piece = undefined;
    payload.initialX = 0;
    payload.initialY = 0;
    payload.offsetX = 0;
    payload.offsetY = 0;
    payload.initialTransform = undefined;
}