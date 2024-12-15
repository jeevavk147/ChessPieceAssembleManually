import { Board } from '../models/board';
import { Bishop } from '../models/pieces/bishop';
import { Color } from '../models/pieces/color';
import { King } from '../models/pieces/king';
import { Knight } from '../models/pieces/knight';
import { Pawn } from '../models/pieces/pawn';
import { Piece } from '../models/pieces/piece';
import { Point } from '../models/pieces/point';
import { MoveTranslation } from '../models/move-translation';
import { Queen } from '../models/pieces/queen';
import { Rook } from '../models/pieces/rook';

export class MoveUtils {
    public static willMoveCauseCheck(
        currentColor: Color,
        row: number,
        col: number,
        destRow: number,
        destCol: number,
        board: Board
    ) {
        const srcPiece = board.getPieceByField(row, col);
        const destPiece = board.getPieceByField(destRow, destCol);

        if (srcPiece) {
            srcPiece.point.row = destRow;
            srcPiece.point.col = destCol;
        }

        if (destPiece) {
            board.pieces = board.pieces.filter((piece) => piece !== destPiece);
        }
        const isBound = board.isKingInCheck(currentColor, board.pieces);

        if (srcPiece) {
            srcPiece.point.col = col;
            srcPiece.point.row = row;
        }

        if (destPiece) {
            board.pieces.push(destPiece);
        }

        return isBound;
    }

    public static format(
        sourcePoint: Point,
        destPoint: Point,
        reverted: boolean
    ) {
        if (reverted) {
             let sourceX
             let srcpointrow
             let destX 
             if(sourcePoint.col < 8)
                {
                    destX= 104-destPoint.col
                    sourceX= 104 - sourcePoint.col;
                }
                srcpointrow=(sourcePoint.row + 1)
             if(sourcePoint.col == 8)
               {
                sourceX=sourcePoint.col + 97
                srcpointrow=Math.abs(sourcePoint.row - 9) + 1
                    destX= 104-destPoint.col
              } 
             
             
            return (
                String.fromCharCode(sourceX) +
                srcpointrow +
                String.fromCharCode(destX) +
                (destPoint.row + 1)
            );
        } else {
            const incrementX = 97;
            return (
                String.fromCharCode(sourcePoint.col + incrementX) +
                (Math.abs(sourcePoint.row - 9) + 1) +
                String.fromCharCode(destPoint.col + incrementX) +
                (Math.abs(destPoint.row - 9) + 1)
            );
        }
    }

    public static translateCoordsToIndex(x:string,y, reverted: boolean ) {
        let xAxis: number;
        let yAxis: number;
        if (reverted ) {
            if(x.charCodeAt(0) - 97 < 8)
            { 
                xAxis = 104 - x.charCodeAt(0);
            yAxis = Number(y) - 1;
            }
          if(x.charCodeAt(0) - 97==8)
            { 
             xAxis = x.charCodeAt(0) - 97;
             yAxis = Math.abs( Number(y) - 10);
            }
        } 
        else {
            xAxis = x.charCodeAt(0) - 97;
            yAxis = Math.abs( Number(y) - 10);
        }

        return new MoveTranslation(xAxis, yAxis, reverted);
    }

    public static findPieceByPossibleMovesContaining(
        coords: string,
        board: Board,
        color: Color
    ): Piece[] {
        let indexes = this.translateCoordsToIndex(coords.substring(0,1),coords.substring(1),board.reverted);
        let destPoint = new Point(indexes.yAxis, indexes.xAxis);
        let foundPieces = [];

        for (let piece of board.pieces.filter(piece => piece.color === color)) {
            for (let point of piece.getPossibleMoves()) {
                if (!MoveUtils.willMoveCauseCheck(
                    piece.color,
                    piece.point.row,
                    piece.point.col,
                    indexes.yAxis,
                    indexes.xAxis,
                    board
                ) && point.isEqual(destPoint)) {
                    foundPieces.push(piece);
                }
            }
        }
        return foundPieces;
    }

    public static findPieceByPossibleCapturesContaining(
        coords: string,
        board: Board,
        color: Color
    ): Piece[] {
        let indexes = this.translateCoordsToIndex(coords.substring(0,1),coords.substring(1), board.reverted);
        let destPoint = new Point(indexes.yAxis, indexes.xAxis);
        let foundPieces = [];
        for (let piece of board.pieces.filter(piece => piece.color === color)) {
            for (let point of piece.getPossibleCaptures()) {
                if (!MoveUtils.willMoveCauseCheck(
                    piece.color,
                    piece.point.row,
                    piece.point.col,
                    indexes.yAxis,
                    indexes.xAxis,
                    board
                ) && point.isEqual(destPoint)) {
                    foundPieces.push(piece);
                }
            }
        }

        return foundPieces;
    }

    public static formatSingle(point: Point, reverted: boolean): string {
        if (reverted) {
            const sourceX = 104 - point.col;
            return (
                String.fromCharCode(sourceX) +
                (point.row + 1)
            );
        } else {
            const incrementX = 97;
            return (
                String.fromCharCode(point.col + incrementX) +
                (Math.abs(point.row - 7) + 1)
            );
        }
    }

    public static getFirstLetterPiece(piece: Piece): string {
        if (piece instanceof Pawn) {
            return 'P';
        } else {
            if (piece instanceof Knight) {
                return 'N';
            } else {
                if (piece instanceof Bishop) {
                    return 'B';
                } else {
                    if (piece instanceof Rook) {
                        return 'R';
                    } else {
                        if (piece instanceof King) {
                            return 'K';
                        } else {
                            if (piece instanceof Queen) {
                                return 'Q';
                            }
                        }
                    }
                }
            }
        }

        return '';
    }

    static reverse(board: Board, row: number) {
        return board.reverted
            ? row + 1
            : Math.abs(row - 7) + 1;
    }

    static formatCol(board: Board, col: number): string {
        return board.reverted
            ? String.fromCharCode(104 - col)
            : String.fromCharCode(97 + col);
    }
}
