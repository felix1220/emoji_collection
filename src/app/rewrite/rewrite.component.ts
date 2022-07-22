import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rewrite',
  templateUrl: './rewrite.component.html',
  styleUrls: ['./rewrite.component.scss']
})
export class RewriteComponent implements OnInit, OnDestroy {

  emojiRows: any[] = [];
  rowSelected:number = -1;
  row1:number = -1;
  row2: number = -1;
  rowVals: any[] = [];
  payload: any[] = [];
  upToList: any[] = [];
  upToVal: number = 29;
  formItems: any[] = [];
  @Output() updateEmoji : EventEmitter<any> = new EventEmitter();
  dataSubGet:  Subscription | null = null;
  dataSubPost: Subscription | null = null;
  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
   
    for(let i=1; i < 30; i++) {
      this.upToList.push({
        id: i,
        value: i
      });
    }
    this.dataSubGet = this.dataSvc.GetEmojiData(2).subscribe( resp => {
      if(resp && resp.emojis && resp.emojis.length) {
        this.payload = resp.emojis;
        this.grouping(resp.emojis);
        //this.mapY();
      }
    });

  }
  onChange(event:any): void {
    console.log('Row selected => ', this.rowSelected);
    if(this.rowSelected > -1) {
      this.filterRows(this.rowSelected);
    }
  }
  saveUpdates(): void {
    let tempItems: any[] = [...this.formItems];
    this.formItems.forEach( (f,indx) => {
      //debugger;
      const posXText = (document.querySelector('#posX' + f.id) as HTMLInputElement);
      const posYText = (document.querySelector('#posY' + f.id) as HTMLInputElement);
      const widthText = (document.querySelector('#width' + f.id) as HTMLInputElement);
      const heightText = (document.querySelector('#height' + f.id) as HTMLInputElement);
      const canvasXText = (document.querySelector('#canvasX' + f.id) as HTMLInputElement);
      const canvasYText = (document.querySelector('#canvasY' + f.id) as HTMLInputElement);
      const canvasWidthText = (document.querySelector('#canvasWidth' + f.id) as HTMLInputElement);
      const canvasHeightText = (document.querySelector('#canvasHeight' + f.id) as HTMLInputElement);
      tempItems[indx].x = Number(posXText.value);
      tempItems[indx].y = Number(posYText.value);
      tempItems[indx].width = Number(widthText.value);
      tempItems[indx].height = Number(heightText.value);
      tempItems[indx].canvasX = Number(canvasXText.value);
      tempItems[indx].canvasY = Number(canvasYText.value);
      tempItems[indx].canvasWidth = Number(canvasWidthText.value);
      tempItems[indx].canvasHeight = Number(canvasHeightText.value);
      //reset the payload values aswell
      const originalIndx = this.payload.findIndex(p => p.id === f.id);
      this.payload[originalIndx].x = Number(posXText.value);
      this.payload[originalIndx].y = Number(posYText.value);
      this.payload[originalIndx].width = Number(widthText.value);
      this.payload[originalIndx].height = Number(heightText.value);
      this.payload[originalIndx].canvasX = Number(canvasXText.value);
      this.payload[originalIndx].canvasY = Number(canvasYText.value);
      this.payload[originalIndx].canvasWidth = Number(canvasWidthText.value);
      this.payload[originalIndx].canvasHeight = Number(canvasHeightText.value);

    });
    console.log('Items leavng => ', tempItems);
    this.updateEmoji.emit(tempItems);
  }
  filterRows(index: number): void {
    debugger;
    this.formItems = [];
    const start = this.rowVals[index];
    const end = this.rowVals[index+1];
    const rowItems = this.payload.filter( f => f.id >= start.id && f.id < end.id);
    rowItems.forEach((val,indx) => {
      if( indx < this.upToVal) {
        this.formItems.push(val);
      }
    });
    //this.formItems = rowItems;

  }
  mapY(): void {
    const row1 = this.payload.filter( f => f.id >= this.rowVals[0].id && f.id < this.rowVals[1].id);
    const row2 = this.payload.filter( f => f.id >= this.rowVals[1].id && f.id < this.rowVals[2].id);
    const row3 = this.payload.filter( f => f.id >= this.rowVals[2].id && f.id < this.rowVals[3].id);
    const row4 = this.payload.filter( f => f.id >= this.rowVals[3].id && f.id < this.rowVals[4].id);
    const row5 = this.payload.filter( f => f.id >= this.rowVals[5].id && f.id < this.rowVals[6].id);
    console.log('Look at Ys --> ', row1[1].y, row2[1].y, row3[1].y, row4[1].y, row5[1].y);
    const diff1 = row2[1].y - row1[1].y;
    const diff2 = row3[1].y - row2[1].y;
    const diff3 = row4[1].y - row3[1].y;
    const diff4 = row5[1].y - row4[1].y;
   
    const sum = diff1 + diff2 + diff3 + diff4;
    const avg1 = Math.floor(sum / 4);
    console.log('Look at diff Ys ---> ', diff1, diff2, diff3, diff4, avg1);
    this.rowVals.forEach((val,iter) => {
      if(iter > 5) {
        if(this.rowVals[iter+1]) {
          let rowPrev = this.payload.filter( f => f.id >= this.rowVals[iter-1].id && f.id < this.rowVals[iter+1].id);
          let row = this.payload.filter( f => f.id >= this.rowVals[iter].id && f.id < this.rowVals[iter+1].id);
          row.forEach((val) => {
            val.y = rowPrev[1].y + avg1;
          })
        }
      }
    });
    this.saveEmojiChanges();
  }
  saveEmojiChanges(): void {
    this.dataSubPost = this.dataSvc.SaveEmojiData(this.payload).subscribe( resp => console.log(resp));
  }
  mapEmojis(): void {
    if(this.row1 > -1 && this.row2 > -1) {
      const start = this.rowVals[this.row1];
      const startLimit = this.rowVals[this.row1+1];
      const end =  this.rowVals[this.row2];
      const endLimit = this.rowVals[this.row2+1];
      const from = this.payload.filter( f => f.id >= start.id && f.id < startLimit.id);
      const to = this.payload.filter( f => f.id >= end.id && f.id < endLimit.id);
      from.forEach((val, indx) => {
        const pos = this.payload.findIndex( f => f.id === to[indx].id);
        this.payload[pos].x = val.x;
        this.payload[pos].canvasX = val.canvasX;
      });
      this.saveEmojiChanges();
    }
  }
  private grouping(svcData: any[]): void {
    const rows = svcData.filter( f=> f.x === 6 || f.x === 7);
    this.rowVals = [...rows];
    this.emojiRows.push({
      id:-1,
      value:'Select Row'
    })
    rows.forEach((val,iter) => {
      this.emojiRows.push({
        id: iter,
        value: iter
      });
    });
    //console.log('start rows => ', rows);

  }
  ngOnDestroy(): void {
    if(this.dataSubPost) {
      this.dataSubPost.unsubscribe();
    }
    if(this.dataSubGet) {
      this.dataSubGet.unsubscribe();
    }
  }

}
