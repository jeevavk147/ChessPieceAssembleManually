import { PieceConstant } from '../../utils/unicode-constants';
import { Board } from '../board';
import { Color } from './color';
import { Piece } from './piece';
import { Point } from './point';

export class Knight extends Piece {
    isMovedAlready = false;

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

        if(col!=8  && this.board.gamestart)
            {
        // gora -> lewo
        if (this.board.isFieldEmpty(row - 2, col - 1)) {
            possiblePoints.push(new Point(row - 2, col - 1));
        }

        // gora -> prawo
        if (this.board.isFieldEmpty(row - 2, col + 1)) {
            possiblePoints.push(new Point(row - 2, col + 1));
        }

        // lewo -> gora
        if (this.board.isFieldEmpty(row - 1, col - 2)) {
            possiblePoints.push(new Point(row - 1, col - 2));
        }

        // prawo -> gora
        if (this.board.isFieldEmpty(row - 1, col + 2)) {
            possiblePoints.push(new Point(row - 1, col + 2));
        }

        // lewo -> dol
        if (this.board.isFieldEmpty(row + 1, col - 2)) {
            possiblePoints.push(new Point(row + 1, col - 2));
        }

        // prawo -> dol
        if (this.board.isFieldEmpty(row + 1, col + 2)) {
            possiblePoints.push(new Point(row + 1, col + 2));
        }

        // dol -> lewo
        if (this.board.isFieldEmpty(row + 2, col - 1)) {
            possiblePoints.push(new Point(row + 2, col - 1));
        }

        // dol -> prawo
        if (this.board.isFieldEmpty(row + 2, col + 1)) {
            possiblePoints.push(new Point(row + 2, col + 1));
        }
    }
    if(col==8)
        {
            if(!this.board.reverted)
         {if(this.color==Color.BLACK)
         {
            if (this.board.isFieldEmpty(1,1))
                {
                possiblePoints.push(new Point(1,1));
                }
                if (this.board.isFieldEmpty(1,6))
                {
                    possiblePoints.push(new Point(1,6));
                }        
         } 
         if(this.color==Color.WHITE)
         {
            if (this.board.isFieldEmpty(8,1))
                {
                possiblePoints.push(new Point(8,1));
                }
             if (this.board.isFieldEmpty(8,6))
                {
                possiblePoints.push(new Point(8,6));
                }   
         }      
        }
        
        if(this.board.reverted)
            {if(this.color==Color.BLACK)
            {
               if (this.board.isFieldEmpty(8,1))
                   {
                   possiblePoints.push(new Point(8,1));
                   }
                   if (this.board.isFieldEmpty(8,6))
                   {
                       possiblePoints.push(new Point(8,6));
                   }        
            } 
            if(this.color==Color.WHITE)
            {
               if (this.board.isFieldEmpty(1,1))
                   {
                   possiblePoints.push(new Point(1,1));
                   }
                if (this.board.isFieldEmpty(1,6))
                   {
                   possiblePoints.push(new Point(1,6));
                   }   
            }      
           }

        }
        return possiblePoints;
    }

    getPossibleCaptures(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;
        if(this.board.gamestart)
        // gora -> lewo
        {if (
            this.board.isFieldTakenByEnemy(
                row - 2,
                col - 1,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row - 2, col - 1));
        }

        // gora -> prawo
        if (
            this.board.isFieldTakenByEnemy(
                row - 2,
                col + 1,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row - 2, col + 1));
        }

        // lewo -> gora
        if (
            this.board.isFieldTakenByEnemy(
                row - 1,
                col - 2,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row - 1, col - 2));
        }

        // prawo -> gora
        if (
            this.board.isFieldTakenByEnemy(
                row - 1,
                col + 2,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row - 1, col + 2));
        }

        // lewo -> dol
        if (
            this.board.isFieldTakenByEnemy(
                row + 1,
                col - 2,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row + 1, col - 2));
        }

        // prawo -> dol
        if (
            this.board.isFieldTakenByEnemy(
                row + 1,
                col + 2,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row + 1, col + 2));
        }

        // dol -> lewo
        if (
            this.board.isFieldTakenByEnemy(
                row + 2,
                col - 1,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row + 2, col - 1));
        }

        // dol -> prawo
        if (
            this.board.isFieldTakenByEnemy(
                row + 2,
                col + 1,
                this.color === Color.WHITE ? Color.BLACK : Color.WHITE
            )
        ) {
            possiblePoints.push(new Point(row + 2, col + 1));
        }}

        return possiblePoints;
    }

    getCoveredFields(): Point[] {
        const possiblePoints = [];

        const row = this.point.row;
        const col = this.point.col;

        // gora -> lewo
        possiblePoints.push(new Point(row - 2, col - 1));

        // gora -> prawo
        possiblePoints.push(new Point(row - 2, col + 1));

        // lewo -> gora
        possiblePoints.push(new Point(row - 1, col - 2));

        // prawo -> gora
        possiblePoints.push(new Point(row - 1, col + 2));

        // lewo -> dol
        possiblePoints.push(new Point(row + 1, col - 2));

        // prawo -> dol
        possiblePoints.push(new Point(row + 1, col + 2));

        // dol -> lewo
        possiblePoints.push(new Point(row + 2, col - 1));

        // dol -> prawo
        possiblePoints.push(new Point(row + 2, col + 1));

        return possiblePoints;
    }
}
