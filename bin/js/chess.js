const initialBoardState = [
    { piece: "w_pawn", row: "2", column: "a" },
    { piece: "w_pawn", row: "2", column: "b" },
    { piece: "w_pawn", row: "2", column: "c" },
    { piece: "w_pawn", row: "2", column: "d" },
    { piece: "w_pawn", row: "2", column: "e" },
    { piece: "w_pawn", row: "2", column: "f" },
    { piece: "w_pawn", row: "2", column: "g" },
    { piece: "w_pawn", row: "2", column: "h" },
    { piece: "w_rook", row: "1", column: "a" },
    { piece: "w_knight", row: "1", column: "b" },
    { piece: "w_bishop", row: "1", column: "c" },
    { piece: "w_queen", row: "1", column: "d" },
    { piece: "w_king", row: "1", column: "e" },
    { piece: "w_bishop", row: "1", column: "f" },
    { piece: "w_knight", row: "1", column: "g" },
    { piece: "w_rook", row: "1", column: "h" },
    { piece: "b_pawn", row: "7", column: "a" },
    { piece: "b_pawn", row: "7", column: "b" },
    { piece: "b_pawn", row: "7", column: "c" },
    { piece: "b_pawn", row: "7", column: "d" },
    { piece: "b_pawn", row: "7", column: "e" },
    { piece: "b_pawn", row: "7", column: "f" },
    { piece: "b_pawn", row: "7", column: "g" },
    { piece: "b_pawn", row: "7", column: "h" },
    { piece: "b_rook", row: "8", column: "a" },
    { piece: "b_knight", row: "8", column: "b" },
    { piece: "b_bishop", row: "8", column: "c" },
    { piece: "b_queen", row: "8", column: "d" },
    { piece: "b_king", row: "8", column: "e" },
    { piece: "b_bishop", row: "8", column: "f" },
    { piece: "b_knight", row: "8", column: "g" },
    { piece: "b_rook", row: "8", column: "h" }
];

function getAllMoves(pieceType, pieceColor, pieceRow, pieceColumn) {
    let processedColor;
    let allMoves;
    if (pieceColor.toLowerCase() === 'b' || pieceColor.toLowerCase() === 'black') {
        processedColor = 'black';
    } 
    else if (pieceColor.toLowerCase() === 'w' || pieceColor.toLowerCase() === 'white') {
        processedColor = 'white';
    } 
    else {
        console.error(pieceColor, 'is not a valid color...');
        return allMoves;
    }    
    console.log(`checking moves for ${processedColor} ${pieceType} located at ${pieceRow}${pieceColumn}`)
    switch (pieceType) {
        case 'pawn':
            if(processedColor === 'black') {
                allMoves = [
                    [(parseInt(pieceRow) - 1).toString(), pieceColumn],
                    [(parseInt(pieceRow) - 2).toString(), pieceColumn]
                ];
                return allMoves;
            }
            else if(processedColor === 'white') {
                allMoves = [
                    [(parseInt(pieceRow) + 1).toString(), pieceColumn],
                    [(parseInt(pieceRow) + 2).toString(), pieceColumn]
                ];
                return allMoves;
            }
            break;
    
        default:
            break;
    }
}

function getInitialBoardState() {
    return initialBoardState;
}

const chess = {
    getInitialBoardState,
    getAllMoves,
};

export default chess;