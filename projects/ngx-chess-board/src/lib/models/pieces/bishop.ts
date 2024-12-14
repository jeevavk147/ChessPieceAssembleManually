import { PieceConstant } from '../../utils/unicode-constants';
import { Board } from '../board';
import { Color } from './color';
import { King } from './king';
import { Piece } from './piece';
import { Point } from './point';

export class Bishop extends Piece {
    constructor(
        point: Point,
        color: Color,
        constant: PieceConstant,
        board: Board
    ) {
        super(point, color, constant, 3, board);
    }

    getPossibleMoves(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;
        if(col!=8 && this.board.gamestart)
        {
        for (let i = row - 1, j = col - 1; i >= 2 && j >= 0; --i, --j) {
            // lewa gorna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        for (let i = row - 1, j = col + 1; i >= 2 && j < 8; --i, ++j) {
            // prawa gorna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        for (let i = row + 1, j = col - 1; i < 10 && j >= 0; ++i, --j) {
            // lewa dolna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        for (let i = row + 1, j = col + 1; i < 10 && j < 8; ++i, ++j) {
            // prawa dolna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        } }
        if(col==8)
        {
        if(!this.board.reverted)
        { if(this.color==Color.BLACK)
         {
            if (this.board.isFieldEmpty(2,2))
                {
                possiblePoints.push(new Point(2,2));
                }
                if (this.board.isFieldEmpty(2,5))
                {
                    possiblePoints.push(new Point(2,5));
                }        
         } 
         if(this.color==Color.WHITE)
         {
            if (this.board.isFieldEmpty(9,2))
                {
                possiblePoints.push(new Point(9,2));
                }
             if (this.board.isFieldEmpty(9,5))
                {
                possiblePoints.push(new Point(9,5));
                }   
         }         }
         if(this.board.reverted)
         {
            if(this.color==Color.BLACK)
                {
                   if (this.board.isFieldEmpty(9,2))
                       {
                       possiblePoints.push(new Point(9,2));
                       }
                       if (this.board.isFieldEmpty(9,5))
                       {
                           possiblePoints.push(new Point(9,5));
                       }        
                } 
                if(this.color==Color.WHITE)
                {
                   if (this.board.isFieldEmpty(2,2))
                       {
                       possiblePoints.push(new Point(2,2));
                       }
                    if (this.board.isFieldEmpty(2,5))
                       {
                       possiblePoints.push(new Point(2,5));
                       }   
                }    

         }
        }
        return possiblePoints;
    }

    getPossibleCaptures() {
       
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;
        if(this.board.gamestart)
        {
            for (let i = row - 1, j = col - 1; i >= 2 && j >= 0; --i, --j) {
            // lewa gorna przekatna
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row - 1, j = col + 1; i >= 2 && j < 8; --i, ++j) {
            // prawa gorna przekatna
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row + 1, j = col - 1; i < 10 && j >= 0; ++i, --j) {
            // lewa dolna przekatna
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row + 1, j = col + 1; i < 10 && j < 8; ++i, ++j) {
            // prawa dolna przekatna
            if (
                this.board.isFieldTakenByEnemy(
                    i,
                    j,
                    this.color === Color.WHITE ? Color.BLACK : Color.WHITE
                )
            ) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!this.board.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }
    }
        return possiblePoints;
    }

    getCoveredFields(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;

        for (let i = row - 1, j = col - 1; i >= 2 && j >= 0; --i, --j) {
            // lewa gorna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                if (!(this.board.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                }
                break;
            }
        }

        for (let i = row - 1, j = col + 1; i >= 2 && j < 8; --i, ++j) {
            // prawa gorna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                if (!(this.board.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                }
                break;
            }
        }

        for (let i = row + 1, j = col - 1; i < 10 && j >= 0; ++i, --j) {
            // lewa dolna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                if (!(this.board.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                }
                break;
            }
        }

        for (let i = row + 1, j = col + 1; i < 10 && j < 8; ++i, ++j) {
            // prawa dolna przekatna
            if (this.board.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                if (!(this.board.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                }
                break;
            }
        }

        return possiblePoints;
    }
}
