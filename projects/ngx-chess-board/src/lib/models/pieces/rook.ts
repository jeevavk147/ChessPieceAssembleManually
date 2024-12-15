import { PieceConstant } from '../../utils/unicode-constants';
import { Board } from '../board';
import { Color } from './color';
import { King } from './king';
import { Piece } from './piece';
import { Point } from './point';

export class Rook extends Piece {
    isMovedAlready = false;

    constructor(
        point: Point,
        color: Color,
        constant: PieceConstant,
        board: Board
    ) {
        super(point, color, constant, 5, board);
    }

    getPossibleMoves(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;

        if(col!=8  && this.board.gamestart)
            {
        for (let i = row + 1; i < 10; ++i) {
            // dol
            if (this.board.isFieldEmpty(i, col)) {
                possiblePoints.push(new Point(i, col));
            } else {
                break;
            }
        }

        for (let i = row - 1; i >= 2; --i) {
            // gora
            if (this.board.isFieldEmpty(i, col)) {
                possiblePoints.push(new Point(i, col));
            } else {
                break;
            }
        }

        for (let j = col - 1; j >= 0; --j) {
            // lewo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                break;
            }
        }

        for (let j = col + 1; j < 8; ++j) {
            // prawo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                break;
            }
        }
    }

    if(col==8)
        {
            if(!this.board.reverted)
         {if(this.color==Color.BLACK)
         {
            if (this.board.isFieldEmpty(1,0))
                {
                possiblePoints.push(new Point(1,0));
                }
                if (this.board.isFieldEmpty(1,7))
                {
                    possiblePoints.push(new Point(1,7));
                }        
         } 
         if(this.color==Color.WHITE)
         {
            if (this.board.isFieldEmpty(8,0))
                {
                possiblePoints.push(new Point(8,0));
                }
             if (this.board.isFieldEmpty(8,7))
                {
                possiblePoints.push(new Point(8,7));
                }   
         }         }
        }

        if(this.board.reverted)
            {if(this.color==Color.BLACK)
            {
               if (this.board.isFieldEmpty(8,0))
                   {
                   possiblePoints.push(new Point(8,0));
                   }
                   if (this.board.isFieldEmpty(8,7))
                   {
                       possiblePoints.push(new Point(8,7));
                   }        
            } 
            if(this.color==Color.WHITE)
            {
               if (this.board.isFieldEmpty(1,0))
                   {
                   possiblePoints.push(new Point(1,0));
                   }
                if (this.board.isFieldEmpty(1,7))
                   {
                   possiblePoints.push(new Point(1,7));
                   }   
            }         }

        return possiblePoints;
    }

    getPossibleCaptures(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;
        if(this.board.gamestart)
        {for (let i = row + 1; i < 10; ++i) {
            // dol
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    col,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, col));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, col)) {
                    break;
                }
            }
        }

        for (let i = row - 1; i >= 2; --i) {
            // gora
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    col,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, col));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, col)) {
                    break;
                }
            }
        }

        for (let j = col - 1; j >= 0; --j) {
            // lewo
            if (
                this.board.isFieldTakenByEnemy(
                    row,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(row, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(row, j)) {
                    break;
                }
            }
        }

        for (let j = col + 1; j < 8; ++j) {
            // prawo
            if (
                this.board.isFieldTakenByEnemy(
                    row,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(row, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(row, j)) {
                    break;
                }
            }
        }}

        return possiblePoints;
    }

    getCoveredFields(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;

        for (let i = row + 1; i < 10; ++i) {
            // dol
            if (this.board.isFieldEmpty(i, col)) {
                possiblePoints.push(new Point(i, col));
            } else {
                if (!(this.board.getPieceByField instanceof King)) {
                    possiblePoints.push(new Point(i, col));
                    break;
                }
            }
        }

        for (let i = row - 1; i >= 2; --i) {
            // gora
            if (this.board.isFieldEmpty(i, col)) {
                possiblePoints.push(new Point(i, col));
            } else {
                if (!(this.board.getPieceByField instanceof King)) {
                    possiblePoints.push(new Point(i, col));
                    break;
                }
            }
        }

        for (let j = col - 1; j >= 0; --j) {
            // lewo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                if (!(this.board.getPieceByField instanceof King)) {
                    possiblePoints.push(new Point(row, j));
                    break;
                }
            }
        }

        for (let j = col + 1; j < 8; ++j) {
            // prawo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                if (!(this.board.getPieceByField instanceof King)) {
                    possiblePoints.push(new Point(row, j));
                    break;
                }
            }
        }

        return possiblePoints;
    }
}
