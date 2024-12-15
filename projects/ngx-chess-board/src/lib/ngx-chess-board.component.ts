import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { AbstractEngineFacade } from './engine/abstract-engine-facade';
import { BoardLoader } from './engine/board-state-provider/board-loader/board-loader';
import {
    NotationProcessorFactory,
    NotationType,
} from './engine/board-state-provider/board-loader/notation-processors/notation-processor-factory';
import { ClickUtils } from './engine/click/click-utils';
import { EngineFacade } from './engine/engine-facade';
import { MoveChange } from './engine/outputs/move-change/move-change';
import { HistoryMove } from './history-move-provider/history-move';
import { Board } from './models/board';
import { Piece } from './models/pieces/piece';
import { NgxChessBoardView } from './ngx-chess-board-view';
import { PiecePromotionModalComponent } from './piece-promotion/piece-promotion-modal/piece-promotion-modal.component';
import { Constants } from './utils/constants';
import { PieceIconInput } from './utils/inputs/piece-icon-input';
import { PieceIconInputManager } from './utils/inputs/piece-icon-input-manager';
import { ColorInput, PieceTypeInput } from './utils/inputs/piece-type-input';
import { DefaultPiecesLoader } from './engine/board-state-provider/board-loader/default-pieces-loader';
import { Point } from './models/pieces/point';

@Component({
    selector: 'ngx-chess-board',
    templateUrl: './ngx-chess-board.component.html',
    styleUrls: ['./ngx-chess-board.component.scss'],
})
export class NgxChessBoardComponent
    implements OnInit, OnChanges, NgxChessBoardView, AfterViewInit {

    @Input() darkTileColor = Constants.DEFAULT_DARK_TILE_COLOR;
    @Input() lightTileColor: string = Constants.DEFAULT_LIGHT_TILE_COLOR;
    @Input() showCoords = true;
    @Input() sourcePointColor: string = Constants.DEFAULT_SOURCE_POINT_COLOR;
    @Input() destinationPointColor: string = Constants.DEFAULT_DESTINATION_POINT_COLOR;
    @Input() legalMovesPointColor: string = Constants.DEFAULT_LEGAL_MOVE_POINT_COLOR;
    @Input() showLastMove = true;
    @Input() showLegalMoves = true;
    @Input() showActivePiece = true;
    @Input() animationDuration = 200;
    @Input() showPossibleCaptures = true;
    /**
     * Enabling free mode removes turn-based restriction and allows to move any piece freely!
     */
    @Output() moveChange = new EventEmitter<MoveChange>();
    @Output() checkmate = new EventEmitter<void>();
    @Output() stalemate = new EventEmitter<void>();

    @ViewChild('boardRef')
    boardRef: ElementRef;
    @ViewChild('modal')
    modal: PiecePromotionModalComponent;

    pieceSize: number;
    selected = false;
    boardLoader: BoardLoader;
    pieceIconManager: PieceIconInputManager;
    startTransition = '';
    isDragging = false;
    public isChecked=false
    engineFacade: AbstractEngineFacade;

    randomId = (Math.random() + 1).toString(36).substring(7);

    constructor() {
        this.engineFacade = new EngineFacade(
            new Board(),
            this.moveChange
             
        );
    }
    custompiece:Piece[]=[]
    @Input('size')
    public set size(size: number) {
        if (
            size &&
            size >= Constants.MIN_BOARD_SIZE &&
            size <= Constants.MAX_BOARD_SIZE
        ) {
            this.engineFacade.heightAndWidth = size;
        } else {
            this.engineFacade.heightAndWidth = Constants.DEFAULT_SIZE;
        }
        this.engineFacade.drawProvider.clear();
        this.calculatePieceSize();
    }

    @Input('freeMode')
    public set freeMode(freeMode: boolean) {
        this.engineFacade.freeMode = freeMode;
    }

    @Input('dragDisabled')
    public set dragDisabled(dragDisabled: boolean) {
        this.engineFacade.dragDisabled = dragDisabled;
    }

    @Input('drawDisabled')
    public set drawDisabled(drawDisabled: boolean) {
        this.engineFacade.drawDisabled = drawDisabled;
    }

    @Input('pieceIcons')
    public set pieceIcons(pieceIcons: PieceIconInput) {
        this.engineFacade.pieceIconManager.pieceIconInput = pieceIcons;
    }

    @Input('lightDisabled')
    public set lightDisabled(lightDisabled: boolean) {
        this.engineFacade.lightDisabled = lightDisabled;
    }

    @Input('darkDisabled')
    public set darkDisabled(darkDisabled: boolean) {
        this.engineFacade.darkDisabled = darkDisabled;
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        event.preventDefault();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            (changes.lightDisabled &&
                this.lightDisabled &&
                this.engineFacade.board.currentWhitePlayer) ||
            (changes.darkDisabled &&
                this.darkDisabled &&
                !this.engineFacade.board.currentWhitePlayer)
        ) {
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
        }
    }

    ngOnInit() {
    }
    ngAfterViewInit(): void {
        this.engineFacade.modal = this.modal;
        this.calculatePieceSize();
        
    }
    getabsmin(num)
    {
        return Math.floor(num/60)
    }
    getabssec(num)
    {
        return Math.abs(num%60)   
    }
    onMouseUp(event: MouseEvent) {
        this.engineFacade.onMouseUp(
            event,
            this.getClickPoint(event),
            this.boardRef.nativeElement.getBoundingClientRect().left,
            this.boardRef.nativeElement.getBoundingClientRect().top
        );
    }

    reverse(): void {
        this.selected = false;
        this.engineFacade.board.reverse();
        this.engineFacade.coords.reverse();
    }

    setplacecount(i,j)
    {
        this.engineFacade.board.placecount.delete(i+j)
        let row=i
        let col=j
        if(i>4)
        {
            let moved=18
        for(let k=i+j+1;k<=19;k++)
       { 
        for(let l=0;l<this.engineFacade.board.placecount.get(k);l++)
        {
            this.engineFacade.board.getPieceByField(k-8,8).point=new Point(row,col)
        }
        this.engineFacade.board.placecount.set(k-1,this.engineFacade.board.placecount.get(k))
        row++
       }
       this.engineFacade.board.placecount.set(--moved,0)
      }
      if(i<=4)
        {
            let moved=7
        for(let k=i+j-1;k>=8;k--)
       { 
        for(let l=0;l<this.engineFacade.board.placecount.get(k);l++)
        {
            this.engineFacade.board.getPieceByField(k-8,8).point=new Point(row,col)
            
        }
        this.engineFacade.board.placecount.set(k+1,this.engineFacade.board.placecount.get(k))
        row--
       }
       this.engineFacade.board.placecount.set(++moved,0)
    }


    }
    updateBoard = (board: Board) => {
        this.engineFacade.board = board;
        this.engineFacade.board.possibleCaptures = [];
        this.engineFacade.board.possibleMoves = [];
        this.boardLoader = new BoardLoader(this.engineFacade);
        this.boardLoader.setEngineFacade(this.engineFacade);
    };

    setFEN(fen: string): void {
        try {
            this.engineFacade.boardLoader.setNotationProcessor(
                NotationProcessorFactory.getProcessor(NotationType.FEN)
            );
            this.engineFacade.boardLoader.loadFEN(fen);
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
            this.engineFacade.coords.reset();
        } catch (exception) {
            this.engineFacade.boardLoader.addPieces();
        }
    }

    setPGN(pgn: string): void {
        try {
            this.engineFacade.pgnProcessor.reset();
            this.engineFacade.boardLoader.setNotationProcessor(
                NotationProcessorFactory.getProcessor(NotationType.PGN)
            );
            this.engineFacade.boardLoader.loadPGN(pgn);
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
            this.engineFacade.coords.reset();
        } catch (exception) {
            console.log(exception);
            this.engineFacade.boardLoader.addPieces();
        }
    }

    getFEN(): string {
        return this.engineFacade.board.fen;
    }

    dragEnded(event: CdkDragEnd): void {
        this.isDragging = false;        
            this.engineFacade.dragEndStrategy.process(
                event,
                this.engineFacade.moveDone,
                this.startTransition
            );  
     }

    dragStart(event: CdkDragStart): void {
        this.isDragging = true;
        let trans = event.source.getRootElement().style.transform.split(') ');
        //   this.startTrans= trans;
        this.startTransition = trans.length === 2 ? trans[1] : trans[0];
        this.engineFacade.dragStartStrategy.process(event);
    }

    onMouseDown(event: MouseEvent) {
        this.engineFacade.onMouseDown(event, this.getClickPoint(event),
            this.boardRef.nativeElement.getBoundingClientRect().left,
            this.boardRef.nativeElement.getBoundingClientRect().top
        );
    }

    onContextMenu(event: MouseEvent): void {
        this.engineFacade.onContextMenu(event);
    }

    getClickPoint(event) {
        return ClickUtils.getClickPoint(
            event,
            this.boardRef.nativeElement.getBoundingClientRect().top,
            this.boardRef.nativeElement.getBoundingClientRect().height,
            this.boardRef.nativeElement.getBoundingClientRect().left,
            this.boardRef.nativeElement.getBoundingClientRect().width
        );
    }

    private calculatePieceSize() {
        this.pieceSize = this.engineFacade.heightAndWidth / 8;
    }


    getCustomPieceIcons(piece: Piece) {
        return JSON.parse(
            `{ "background-image": "url('${this.engineFacade.pieceIconManager.getPieceIcon(
                piece
            )}')"}`
        );
    }

    move(coords: string): void {
        this.engineFacade.move(coords);
    }

    getMoveHistory(): HistoryMove[] {
        return this.engineFacade.getMoveHistory();
    }

    reset(): void {
        this.engineFacade.reset();
    }

    undo(): void {
        this.engineFacade.undo();
    }

    addPiece(
        pieceTypeInput: PieceTypeInput,
        colorInput: ColorInput,
        coords: string
    ) {
        this.engineFacade.addPiece(pieceTypeInput, colorInput, coords);
    }

    getPGN() {
        return this.engineFacade.pgnProcessor.getPGN();
    }

    dragMoved($event: CdkDragMove<any>) {
        let x = ($event.pointerPosition.x - $event.source.getRootElement().parentElement.getBoundingClientRect().left) - (this.pieceSize / 2);
        let y = ($event.pointerPosition.y - $event.source.getRootElement().parentElement.getBoundingClientRect().top) - (this.pieceSize / 2);
        $event.source.getRootElement().style.transform = 'translate3d(' + x + 'px, '
            + (y) + 'px,0px)';
    }

    getTileBackgroundColor(i, j): string {
        let color
        if(i>0 && i<9 && j<8)
         color = ((i + j) % 2 === 0) ? this.lightTileColor : this.darkTileColor;
        if(j==8 && this.engineFacade.board.placecount.get(i+j)!=0)
            color=Constants.DEFAULT_COLOR
        if (this.showLastMove) {
            if (this.engineFacade.board.isXYInSourceMove(i, j) && j<8) {
                color = this.sourcePointColor;
            }

            if (this.engineFacade.board.isXYInDestMove(i, j)) {
                color = this.destinationPointColor;
            }
        }

        return color;
    }
    getbolderleftcolor(i,j)
    {
        if(j==8 && this.engineFacade.board.placecount.get(i+j)!=0)
        {
            return "1px solid black"
        }
    }
    getbolderbottomcolor(i,j)
    {
        if(j==8 && i==4 && this.engineFacade.board.placecount.get(i+j)!=0)
        {
            return "2px solid black"
        }
    }
}
