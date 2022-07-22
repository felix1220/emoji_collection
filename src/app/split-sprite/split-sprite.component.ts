import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { from, interval, of, Subscription} from 'rxjs';
import { DataService } from '../data.service';
import { mergeMap, delay, takeUntil, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-split-sprite',
  templateUrl: './split-sprite.component.html',
  styleUrls: ['./split-sprite.component.scss']
})
export class SplitSpriteComponent implements OnInit, OnDestroy, OnChanges {

  canvasRef :HTMLCanvasElement | undefined;
  context!: CanvasRenderingContext2D | null;
  blnShowServer: boolean = true;
  dataSubPost: Subscription | null = null;
  dataSubGet:  Subscription | null = null;
  emojiRows: any[] = [];
  @Input() icons: any[] = [];
  @Input() formEmoji: any[] | undefined = [];
  globalImg:any = null;
  rowSelected:number = -1;
  rowVals: any[] = [];
  payload: any[] = [];
  upToList: any[] = [];
  upToVal: number = 29;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    for(let i=1; i < 30; i++) {
      this.upToList.push({
        id: i,
        value: i
      });
    }
    let imgOriginal = new Image();
    this.globalImg = imgOriginal;
    
    //this.fixId();
    imgOriginal.onload = () => {
      if(this.context) {
        if(!this.blnShowServer) {
          let blnFoundId: boolean = false;
          let startId: number = 426;
            //this.context.drawImage(imgOriginal,10,10);
          let srcStartX = this.icons[0].Positions[0];
          let srcStartY = this.icons[0].Positions[1]+25;
          let destStartX = this.icons[0].Positions[4];
          let destStartY = this.icons[0].Positions[5];
          //debugger;
          for(let i = 0; i < this.icons.length; i++) {
        
            if((this.icons[i].Positions[0] === 6 || this.icons[i].Positions[0] === 7 ) && i > 0) {
             // debugger;
              srcStartX = this.icons[i].Positions[0];
              srcStartY = this.icons[i].Positions[1]-6;
              destStartX = this.icons[i].Positions[4];
              destStartY = this.icons[i].Positions[5]-6;
            }
            let width = parseInt(this.icons[i].Positions[2] + (this.icons[i].Positions[2] * .67))
            let height = parseInt(this.icons[i].Positions[3] + (this.icons[i].Positions[3] * .77))
            this.context.drawImage(imgOriginal, srcStartX, srcStartY, width, height,destStartX, destStartY, width, height);
            this.icons[i].Positions[0] = parseInt(srcStartX);
            this.icons[i].Positions[1] = srcStartY;
            this.icons[i].Positions[2] = width;
            this.icons[i].Positions[3] = height;
            this.icons[i].Positions[4] = parseInt(srcStartX);
            this.icons[i].Positions[5] = srcStartY;
            if(this.icons[i].ID === 426 && !blnFoundId) {
              blnFoundId = true;
            } else if(this.icons[i].ID === 426 && blnFoundId) {
              startId++;
              this.icons[i].ID = startId;
            }
            srcStartX += width;
            destStartX += width;
            //debugger;
          }//end for loop
          this.postItems();
        } else {
          this.dataSubGet = this.dataSvc.GetEmojiData(2).subscribe( resp => {
             if(resp && resp.emojis && resp.emojis.length) {
                //TODO
                this.payload = resp.emojis;
                this.grouping(resp.emojis);
              
             }
          });
        }
        
      }
      
    }
    imgOriginal.src = '/assets/images/emoji-sheet.png';
    //[ 25, 22, 17, 17, 28,30, 17, 17]
    this.canvasRef = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = this.canvasRef.getContext('2d');
   
  }
  recurseItems(start:any): void {
    
    setTimeout(() => {
      if(this.context) {
        this.context.drawImage(this.globalImg, start.x ,  start.y,  start.width,  start.height,  start.canvasX,  start.canvasY, start.canvasWidth,  start.canvasHeight);
      }
    },1000);
  }
  filterRows(index: number): void {
    const start = this.rowVals[index];
    const end = this.rowVals[index+1];
    const rowItems = this.payload.filter( f => f.id >= start.id && f.id < end.id);
    let iter = rowItems.length-1;
    
    if(this.canvasRef) {
      this.context?.clearRect(0,0, this.canvasRef.width, this.canvasRef.height);
    }
   
    interval(500)
    .pipe(
      take(this.upToVal),
      map((i) => { return rowItems[i]; })
    ).subscribe( val => { 
      console.log('Value is => ', val);
      if(this.context) {
        this.context.drawImage(this.globalImg, val.x ,  val.y,  val.width,  val.height,  val.canvasX,  val.canvasY, val.canvasWidth,  val.canvasHeight);
      }
     
    });
   
    //debugger;
    /*const $stream = from(rowItems)
    $stream.pipe(
      interval(1000)
    ).subscribe( val => console.log('Delaying... => ', val));
    */
    /*do {
      this.recurseItems(rowItems[iter]);
      iter--;
    } while (iter >= 0);*/
   
    
    
  }

  OnChangeItem(event:any): void {
    console.log('Row selected => ', this.rowSelected);
    if(this.rowSelected > -1) {
      this.filterRows(this.rowSelected);
    }
  }
  private fixId(): void {
    let blnFoundId: boolean = false;
    let startId: number = 426;
    this.dataSubGet = this.dataSvc.GetEmojiData(2).subscribe( resp => {
        if(resp && resp.emojis && resp.emojis.length) {
          //TODO
          this.payload = resp.emojis;
          this.payload.forEach(val => {
            if(val.id === 426 && !blnFoundId) {
              blnFoundId = true;
            } else if(val.id === 426 && blnFoundId) {
              startId++;
              val.id = startId;
            }
            val.x = parseInt(val.x);
            val.canvasX = parseInt(val.canvasX);
          });
        }
    });
    this.dataSubPost = this.dataSvc.SaveEmojiData(this.payload).subscribe( resp => console.log(resp));
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
  ngOnChanges(changes: any): void {
    //debugger;
    if (changes.formEmoji.currentValue && changes.formEmoji.currentValue.length) {
       console.log('new emoji changes => ', changes.formEmoji.currentValue);
       if(this.canvasRef) {
        this.context?.clearRect(0,0, this.canvasRef.width, this.canvasRef.height);
      }
      const upTo = changes.formEmoji.currentValue.length;
      interval(500)
      .pipe(
        take(upTo),
        map((i) => { return changes.formEmoji.currentValue[i]; })
      ).subscribe( val => { 
        console.log('Value is => ', val);
        if(this.context) {
          this.context.drawImage(this.globalImg, val.x ,  val.y,  val.width,  val.height,  val.canvasX,  val.canvasY, val.canvasWidth,  val.canvasHeight);
        }
       
      });
    }
  }

  ngOnDestroy(): void {
    if(this.dataSubPost) {
      this.dataSubPost.unsubscribe();
    }
    if(this.dataSubGet) {
      this.dataSubGet.unsubscribe();
    }
  }
  private postItems(): void {
    //filter( f => f.ID > 0 && f.ID < 15)
    const data = this.icons.map( m => {
      return {
        x: m.Positions[0],
        y: m.Positions[1],
        width: m.Positions[2],
        height: m.Positions[3],
        canvasX: m.Positions[4],
        canvasY: m.Positions[5],
        canvasWidth: m.Positions[2],
        canvasHeight: m.Positions[3],
        id: m.ID,
        name: m.Name
      }
    });
    
    this.dataSubPost = this.dataSvc.SaveEmojiData(data).subscribe( resp => console.log(resp));
  }

}
