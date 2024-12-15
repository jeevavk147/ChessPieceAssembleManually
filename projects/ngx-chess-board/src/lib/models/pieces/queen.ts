import { PieceConstant } from '../../utils/unicode-constants';
import { Board } from '../board';
import { Color } from './color';
import { King } from './king';
import { Piece } from './piece';
import { Point } from './point';

export class Queen extends Piece {
    constructor(
        point: Point,
        color: Color,
        constant: PieceConstant,
        board: Board
    ) {
        super(point, color, constant, 9, board);
    }

    getPossibleMoves(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;

        if(col!=8  && this.board.gamestart)
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
        }

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
        if(!this.board.reverted)
        {{
        if(this.color==Color.BLACK)
        {
            if (this.board.isFieldEmpty(1,3))
                {
                possiblePoints.push(new Point(1,3));
                }         
        }
        if(this.color==Color.WHITE) 
         {
            if (this.board.isFieldEmpty(8,3))
                {
                possiblePoints.push(new Point(8,3));
                } 
         }      
        }}

        if(this.board.reverted)
            {{
            if(this.color==Color.BLACK)
            {
                if (this.board.isFieldEmpty(8,4))
                    {
                    possiblePoints.push(new Point(8,4));
                    }         
            }
            if(this.color==Color.WHITE) 
             {
                if (this.board.isFieldEmpty(1,4))
                    {
                    possiblePoints.push(new Point(1,4));
                    } 
             }      
            }}

        return possiblePoints;
    }

    getPossibleCaptures(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;
        if(this.board.gamestart)
        {for (let i = row - 1, j = col - 1; i >= 2 && j >= 0; --i, --j) {
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
        for (let i = row + 1; i < 10; ++i) {
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
                if (!(this.board.getPieceByField(i, col) instanceof King)) {
                    possiblePoints.push(new Point(i, col));
                }
                break;
            }
        }

        for (let i = row - 1; i >= 2; --i) {
            // gora
            if (this.board.isFieldEmpty(i, col)) {
                possiblePoints.push(new Point(i, col));
            } else {
                if (!(this.board.getPieceByField(i, col) instanceof King)) {
                    possiblePoints.push(new Point(i, col));
                }
                break;
            }
        }

        for (let j = col - 1; j >= 0; --j) {
            // lewo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                if (!(this.board.getPieceByField(row, j) instanceof King)) {
                    possiblePoints.push(new Point(row, j));
                }
                break;
            }
        }

        for (let j = col + 1; j < 8; ++j) {
            // prawo
            if (this.board.isFieldEmpty(row, j)) {
                possiblePoints.push(new Point(row, j));
            } else {
                if (!(this.board.getPieceByField(row, j) instanceof King)) {
                    possiblePoints.push(new Point(row, j));
                }
                break;
            }
        }

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
