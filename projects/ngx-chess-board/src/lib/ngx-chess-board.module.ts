import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChessBoardComponent } from './ngx-chess-board.component';
import { PiecePromotionModalComponent } from './piece-promotion/piece-promotion-modal/piece-promotion-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [NgxChessBoardComponent, PiecePromotionModalComponent],
    imports: [CommonModule, DragDropModule, FormsModule],
    exports: [NgxChessBoardComponent],
})
export class NgxChessBoardModule {}
