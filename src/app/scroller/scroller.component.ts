import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements OnInit {

  canvasRef :HTMLCanvasElement | undefined;
  context!: CanvasRenderingContext2D | null;
  emojis:any[] = [];
  moveX: number = 24;
  moveY: number = -5;
  globalImg: any;
  width: number = 0;
  height: number = 0;
  animeChain: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() { }

  ngOnInit(): void {
    this.canvasRef = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = this.canvasRef.getContext('2d');
    this.emojis.push({
      points:[ 37, 35, 30, 30, 28,30, 30, 30],
      seconds: 12,
      completed: false,
      moveSteps:0,
      id: 1
    }, {
        points:[70, 35, 23, 30, 60,30, 23, 30],
        seconds: 20,
        completed: false,
        moveSteps:0,
        id: 2
    }, {
      points:[ 94, 35, 25, 32, 91,30, 25, 32],
      seconds: 25,
      completed: false,
      moveSteps:0,
      id: 3
    }, {
      points:[ 120, 35, 28, 33, 121,30, 28, 33],
      seconds: 13,
      completed: false,
      moveSteps:0,
      id: 4
    }, {
      points:[150, 35, 29, 30, 151,30, 30, 30],
      seconds: 5,
      completed: false,
      moveSteps:0,
      id: 5
    }, {
      points:[180, 35, 26, 30, 181,30, 26, 30],
      seconds: 19,
      completed: false,
      moveSteps:0,
      id: 6
    }, {
      points:[204, 35, 25, 33, 215,30, 30, 30],
      seconds: 22,
      completed: false,
      moveSteps:0,
      id: 7
    }, {
      points:[234, 34, 25, 30, 250,30, 25, 30],
      seconds: 30,
      completed: false,
      moveSteps:0,
      id: 8
    }, {
      points:[258, 35, 28, 30, 280,30, 28, 30],
      seconds: 33,
      completed: false,
      moveSteps:0,
      id: 9
    });
    let img = new Image();
    img.src = '/assets/images/emoji-sheet.png';
    this.globalImg = img;
    img.onload = () => {
      if(this.canvasRef) {
        this.width = this.canvasRef.width;
        this.height = this.canvasRef.height;
      }
      if(this.context) {
        this.emojis.forEach(val => {
          if(this.context) {
            this.context.drawImage(img, val.points[0], val.points[1], val.points[2], val.points[3], val.points[4], val.points[5], val.points[6], val.points[7]);
            this.drawCircles(val);
            this.context.fillStyle = 'white';
            this.context.fillText(val.seconds, val.points[4] + 19, val.points[5]);
          }
          
        });
       /* this.context.drawImage(img, 37, 35, 30, 30, 28,30, 30, 30); //dos
        this.context.drawImage(img, 70, 35, 23, 30, 60,30, 23, 30); //bolt
        this.context.drawImage(img, 94, 35, 25, 32, 91,30, 25, 32); //cross
        this.context.drawImage(img, 120, 35, 28, 33, 121,30, 28, 33); //blogger
        this.context.drawImage(img, 150, 35, 29, 30, 151,30, 30, 30); //bulb
        this.context.drawImage(img, 180, 35, 26, 30, 181,30, 26, 30);// star
        this.context.drawImage(img, 204, 35, 25, 33, 215,30, 30, 30); //pineapple
        this.context.drawImage(img, 234, 34, 25, 30, 250,30, 25, 30);//cigars
        this.context.drawImage(img, 258, 35, 28, 30, 280,30, 28, 30);//flags*/
        this.foo();
      }
    }
    this.animeChain.subscribe( indx => {
      if(this.emojis[indx-1]) {
        const diff = this.emojis[indx].points[4] - this.emojis[indx-1].points[4]
        this.emojis[indx-1].moveSteps = this.emojis[indx-1].moveSteps + diff;
        this.moveTheRest(this.emojis[indx-1].id,  this.emojis[indx-1].moveSteps);
        this.moveRight();
      } else {
        this.foo();
      }
    });
  }
  drawCircles(item: any): void {
    if(this.context) {
      this.context.beginPath();
      this.context.arc(item.points[4] + this.moveX, item.points[5] + this.moveY, 8, 0, 2 * Math.PI, false);
      this.context.fillStyle = 'green';
      this.context.fill();
      this.context.lineWidth = 1;
      this.context.strokeStyle = '#003300';
      this.context.stroke();
    }
   
  }
  redraw(): void {
    if(this.context) {
    
      this.context.clearRect(0, 0, this.width , this.height);
      this.emojis.forEach(val => {
        if(val.seconds > 0) {
          if(this.context) {
            this.context.drawImage(this.globalImg, val.points[0], val.points[1], val.points[2], val.points[3], val.points[4], val.points[5], val.points[6], val.points[7]);
            this.drawCircles(val);
            this.context.fillStyle = 'white';
            this.context.fillText(val.seconds, val.points[4] + 19, val.points[5]);
          }
          
        }
      
      });
    }
  }
  moveTheRest = (indx:number, stepAmt: number) => {
    const moveItems = this.emojis.filter(f => f.id < indx);
    moveItems.forEach( val => {
      val.moveSteps = stepAmt;
    });
    console.log('Steps going back before => ', indx, moveItems);
  }
  moveRight = () => {
    
     const moveLS = this.emojis.filter(f => f.moveSteps > 0);
     if(moveLS.length) {
        moveLS.forEach((val,index) => {

          if(val.moveSteps > 0) {
            val.points[4] += 2;
            val.moveSteps -= 2;
          } else {
            val.moveSteps = 0;
          }
        });
        setTimeout(() => {
          this.moveRight();
          this.redraw();
        }, 100);
     } else {
       this.foo();
     }
     
    
  }
  foo = () => {
    //debugger;
   
    this.emojis.forEach(val => {
      val.seconds = val.seconds - 1;
    })
    this.redraw();
    // your function code here
    const anySeconds = this.emojis.find( f => f.seconds > 0);
    const runOut = this.emojis.find(f => f.seconds === 0 && !f.completed);
    //debugger;
     if (runOut) {
      console.log('Running out => ', runOut);
      const indx = this.emojis.findIndex(f => f.seconds === 0 && !f.completed);
      this.emojis[indx].completed = true;
      //this.moveRight(indx);
      this.animeChain.next(indx);
    } else if(anySeconds) {
      setTimeout(this.foo, 1000);
    } else {
      if(this.context) {
        this.context.clearRect(0, 0, this.width , this.height);
      }
    }
    
  }

}