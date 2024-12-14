import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
    MoveChange,
    NgxChessBoardComponent,
    NgxChessBoardModule,
    PieceIconInput
} from 'ngx-chess-board';
import {
    ColorInput,
    PieceTypeInput
} from 'ngx-chess-board';
import { FenComponent } from 'src/app/components/fen/fen.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  fetchUserAttributes, getCurrentUser, signOut } from 'aws-amplify/auth';
import { APIService } from '../apiservice.service';
import { Hub } from 'aws-amplify/utils';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ FormsModule, NgxChessBoardModule,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnChanges{
  userId: string;
  username: string;
  error: string;
  usercolor: any;
  sendmove:String|null
  recievemove:String|null
  usercount=0
  constructor(private api:APIService){}

    ngOnChanges(changes: SimpleChanges): void {
    }

  async  currentAuthenticatedUser() {
    const userAttributes = await fetchUserAttributes();
    const {  userId, username,} = await getCurrentUser();
    this.userId=userId
    this.username = userAttributes.name || username
    this.boardManager.engineFacade.user1= userAttributes.name || username
    this.api.createItem({userid:userId,username:userAttributes.name || username}).subscribe(
          {
              next:()=>{
                    this.api.getitem().subscribe((item)=>{
                        const body = JSON.parse(item.body)
                         const users=body.items
                         this.usercount=users.length
                         users.forEach(element => {
                            if(element.userId===this.userId)
                            {
                              this.usercolor=element.color
                              this.boardManager.engineFacade.usercolor=element.color
                              if(element.color=="BLACK")
                               {
                               this.boardManager.reverse()
                               } 
                               if(element.color=="OUT")
                               {
                                this.error="User Pool is Full !!!"
                                this.api.errorcall(this.error)
                                this.handleSignOut()
                               }
                              }
                              else
                              {
                                this.boardManager.engineFacade.user2=element.username
                              }
                          });         
                    })  
              }
          }) 
      
    //auth event
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          break;
        case 'signedOut':
          this.delete()
          break;
      }
    });
}

async  handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
} 

@HostListener('window:beforeunload',['$event'])
beforeunloadHandler(event:Event)
{
    this.delete()
}

@HostListener('window:unload',['$event'])
unloadHandler(event:Event)
{
    this.delete()
}

delete(): void {
          this.api.deleteitem(this.userId).subscribe()
}
    
  ngOnInit(): void {
    
    //websocket service
    this.api.connect()
    this.api.getmove().subscribe((move)=>{
        this.recievemove=move
        if((this.recievemove!=this.sendmove)||this.sendmove==null)
        {
            console.log('recieve')
            this.boardManager.move(move)
        }
    })

    //http serveice
    this.currentAuthenticatedUser()
    
}
  @ViewChild('board')
  boardManager: NgxChessBoardComponent;

  @ViewChild('fenManager') fenManager: FenComponent;
  public fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  manualMove = 'd2d4';
  
  icons: PieceIconInput = {
      blackBishopUrl: '',
      blackKingUrl: '',
      blackKnightUrl: '',
      blackPawnUrl: '',
      blackQueenUrl: '',
      blackRookUrl: '',
      whiteBishopUrl: '',
      whiteKingUrl: '',
      whiteKnightUrl: '',
      whitePawnUrl: '',
      whiteQueenUrl: '',
      whiteRookUrl: ''
  };

  public darkTileColor = 'green';
  public lightTileColor = 'white';
  public size = 400;
  public dragDisabled = false;
  public drawDisabled = false;
  public lightDisabled = false;
  public darkDisabled = false;
  public freeMode = false;
  public addPieceCoords: string = 'a4';
  public selectedPiece = '1';
  public selectedColor = '1';
  public pgn: string = '';


  async handlesignOut()
  {
    await signOut()
  }

  //private lastboardstate 
  public reset(): void {
      alert('Resetting board');
      this.boardManager.reset();
      this.fen = this.boardManager.getFEN();
      this.freeMode = false;
  }

  public reverse(): void {
      this.boardManager.reverse();
  }

  public undo(): void {
      this.boardManager.undo();
      this.fen = this.boardManager.getFEN();
      this.pgn = this.boardManager.getPGN();
  }

  public setFen(): void {
      if (this.fen) {
          this.boardManager.setFEN(this.fen);
      }
  }
   
  public moveCallback(move: MoveChange): void {
      
      this.fen = this.boardManager.getFEN();
      this.pgn = this.boardManager.getPGN();
      this.sendmove=move.move
      if((this.recievemove!=this.sendmove)||this.recievemove==null)
      {
        this.api.sendmove({"action":"sendmove","data":move.move})
        console.log('send')
      }
      }
      

  public moveManual(): void {
      this.boardManager.move(this.manualMove);
  }

  getFEN() {
      let fen = this.boardManager.getFEN();
      alert(fen);
  }

  showMoveHistory() {
      alert(JSON.stringify(this.boardManager.getMoveHistory()));
  }

  switchDrag() {
      this.dragDisabled = !this.dragDisabled;
  }

  switchDraw() {
      this.drawDisabled = !this.drawDisabled;
  }

  switchDarkDisabled() {
      this.darkDisabled = !this.darkDisabled;
  }

  switchLightDisabled() {
      this.lightDisabled = !this.lightDisabled;
  }

  switchFreeMode() {
      this.freeMode = !this.freeMode;
  }

  addPiece() {
      let piece = this.resolveSelectedPiece();
      let color = this.resolveSelectedColor();
      this.boardManager.addPiece(piece, color, this.addPieceCoords);
  }

  private resolveSelectedPiece(): PieceTypeInput {
      switch (this.selectedPiece) {
          case '1':
              return PieceTypeInput.QUEEN;
          case '2':
              return PieceTypeInput.KING;
          case '3':
              return PieceTypeInput.ROOK;
          case '4':
              return PieceTypeInput.BISHOP;
          case '5':
              return PieceTypeInput.KNIGHT;
          case '6':
              return PieceTypeInput.PAWN;
      }
  }

  private resolveSelectedColor(): ColorInput {
      switch (this.selectedColor) {
          case '1':
              return ColorInput.LIGHT;
          case '2':
              return ColorInput.DARK;
      }
  }

  public setPgn() {
      this.boardManager.setPGN(this.pgn);
  }

  loadDefaultPgn() {
      this.pgn = '1. c4 b5 2. cxb5 c6 3. bxc6 Nxc6 4. Qa4 a6\n' +
          '5. Qxa6 Rb8 6. b3 d5 7. f4 e5 8. fxe5 f6\n' +
          '9. exf6 gxf6 10. Nf3 f5 11. Ne5 Bb7 12. Qxb7 Na7\n' +
          '13. Qxb8 Qxb8 14. Kf2 Kd8 15. Nc3 Be7 16. Nc4 Bf6\n' +
          '17. Nb6 Nb5 18. Nbxd5 f4 19. Ne4 Na7 20. Nexf6';
      this.setPgn();
  }

  getPGN() {
      alert(this.boardManager.getPGN());
  }
}

