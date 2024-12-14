import { Board } from '../../../models/board';
import { Bishop } from '../../../models/pieces/bishop';
import { Color } from '../../../models/pieces/color';
import { King } from '../../../models/pieces/king';
import { Knight } from '../../../models/pieces/knight';
import { Pawn } from '../../../models/pieces/pawn';
import { Piece } from '../../../models/pieces/piece';
import { Point } from '../../../models/pieces/point';
import { Queen } from '../../../models/pieces/queen';
import { Rook } from '../../../models/pieces/rook';
import { UnicodeConstants } from '../../../utils/unicode-constants';

export class DefaultPiecesLoader {
static loadDefaultPieces(board: Board) {
    board.pieces = [];


    board.placecount.set(8,8)
    board.placecount.set(9,2)
    board.placecount.set(10,2)
    board.placecount.set(11,2)
    board.placecount.set(12,1)
    board.placecount.set(13,1)

    board.placecount.set(14,8)
    board.placecount.set(15,2)
    board.placecount.set(16,2)
    board.placecount.set(17,2)
    board.placecount.set(18,1)
    board.placecount.set(19,1)


    // piony czarne
    for (let i = 0; i < 8; ++i) {
        board.pieces.push(new Pawn(
            new Point(0, 8),
            Color.BLACK,
            UnicodeConstants.BLACK_PAWN,
            board
        ));
    }
   
    board.pieces.push(new Rook(
        new Point(1, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_ROOK,
        board
    ));
    
    board.pieces.push(new Knight(
        new Point(2, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_KNIGHT,
        board
    ));
    board.pieces.push(new Bishop(
        new Point(3, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_BISHOP,
        board
    ));
    board.pieces.push(new Queen(
        new Point(4, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_QUEEN,
        board
    ));
    board.pieces.push(new King(
        new Point(5, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_KING,
        board
    ));
    board.pieces.push(new Bishop(
        new Point(3, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_BISHOP,
        board
    ));
    board.pieces.push(new Knight(
        new Point(2, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_KNIGHT,
        board
    ));

    board.pieces.push(new Rook(
        new Point(1, 8),
        Color.BLACK,
        UnicodeConstants.BLACK_ROOK,
        board
    ));

    // piony biale
    for (let i = 0; i < 8; ++i) {
        board.pieces.push(new Pawn(
            new Point(6, 8),
            Color.WHITE,
            UnicodeConstants.WHITE_PAWN,
            board
        ));
    }
    board.pieces.push(new Rook(
        new Point(7, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_ROOK,
        board
    ));
    board.pieces.push(new Knight(
        new Point(8, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_KNIGHT,
        board
    ));
    board.pieces.push(new Bishop(
        new Point(9, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_BISHOP,
        board
    ));
    board.pieces.push(new Queen(
        new Point(10, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_QUEEN,
        board
    ));
    board.pieces.push(new King(
        new Point(11, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_KING,
        board
    ));
    board.pieces.push(new Bishop(
        new Point(9, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_BISHOP,
        board
    ));
    board.pieces.push(new Knight(
        new Point(8, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_KNIGHT,
        board
    ));
    board.pieces.push(new Rook(
        new Point(7, 8),
        Color.WHITE,
        UnicodeConstants.WHITE_ROOK,
        board
    ));

    board.calculateFEN();
}
}