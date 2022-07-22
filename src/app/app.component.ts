import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'emoji';
  canvasRef :HTMLCanvasElement | undefined;
  context!: CanvasRenderingContext2D | null;
  canvasOriginal :HTMLCanvasElement | undefined;
  contextOriginal!: CanvasRenderingContext2D | null;
  dataSub: Subscription | null = null;
  allEmojis: any[] = [];
  allLoaded: boolean = false;
  formEmoji: any[] | undefined = [];
  public lastDate = this.formatLastYearISODate();

  constructor(private svc: DataService) {}

  ngOnInit() {
    const rand = this.getRandomArbitrary(1, 25);
    console.log('the random number => ', rand);

  }

  ngAfterViewInit(): void {
    this.canvasRef = <HTMLCanvasElement>document.getElementById('canvasPuzzle');
    this.context = this.canvasRef.getContext('2d');
    this.canvasOriginal = <HTMLCanvasElement>document.getElementById('canvasOriginal');
    this.contextOriginal = this.canvasOriginal.getContext('2d');
    this.loadDataFromSvc();
   
  }
  private loadDataFromSvc(): void {
    this.dataSub = this.svc.GetEmojiData(1).subscribe( data => {
      
       //debugger;
       if(data.emojis.length) {
         //data.emojis.forEach( f => {
          // debugger;
         // if(this.context) {
          console.log('show me data => ', data);
           this.loadImgWrapper(data.emojis)
           //this.context.drawImage(this.globalImg, f.x, f.y, f.width, f.height,f.canvasX, 350, f.canvasWidth, f.canvasHeight)
         // }
          
         //});
       }
     })
   }
  private loadImgWrapper(data: any[]): void {
    let img = new Image();
    let imgOriginal = new Image();
   
    img.onload = () => {
      if(this.context) {
       
        //this.context.drawImage(img, 10, 10);
        this.context.drawImage(img, 7,22,17,17,10,30,17,17); //copyright
       
        //const pixel = this.context.getImageData(15, 35, 1, 1);
        /*const data = pixel.data;
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        console.log('single pixel from copyright => ', rgba);
       */
        //let pixels:any[] = [];
       // pixels.push([data[0], data[1], data[2]])
       
        this.context.drawImage(img, 25, 22, 17, 17, 28,30, 17, 17); //dos
        
        this.context.drawImage(img, 41, 22, 15, 16, 46,30, 17, 16); //bolt
        this.context.drawImage(img, 56, 22, 16, 18, 63,30, 16, 18); //cross
        this.context.drawImage(img, 73, 22, 16, 17, 80,30, 16, 17); //blogger
        this.context.drawImage(img, 90, 22, 17, 17, 97,30, 17, 17); //bulb
        this.context.drawImage(img, 107, 22, 16, 17, 114,30, 16, 17);// star
        this.context.drawImage(img, 124, 22, 15, 18, 131,30, 15, 18); //pineapple
        this.context.drawImage(img, 137, 22, 18, 19, 148,30, 18, 19);//cigars
        this.context.drawImage(img, 155, 22, 17, 17, 165,30, 17, 17);//flags
        this.context.drawImage(img, 172, 22, 17, 18, 182,30, 17, 18);//notes
        this.context.drawImage(img, 189, 22, 17, 18, 199,30, 17, 18);//work building
        this.context.drawImage(img, 206, 22, 17, 17, 216,30, 17, 17);//boar
        this.context.drawImage(img, 223, 22, 17, 18, 233,30, 17, 18);//monkey
        this.context.drawImage(img, 238, 22, 17, 18, 260,30, 17, 18);//shirt
        this.context.drawImage(img, 255, 22, 16, 18, 277,30, 16, 18);//arab
        this.context.drawImage(img, 270, 22, 18, 18, 294,30, 18, 18);//couple
        this.context.drawImage(img, 287, 22, 17, 17, 311,30, 17, 17);//hundred
        this.context.drawImage(img, 304, 22, 17, 17, 328,30, 17, 17);//llolipop
        this.context.drawImage(img, 321, 22, 17, 18, 341,30, 17, 18);//mailbox
        this.context.drawImage(img, 338, 22, 16, 17, 360,30, 16, 17);//magnifier
        this.context.drawImage(img, 353, 22, 18, 19, 380,30, 18, 19);//revolver
        this.context.drawImage(img, 371, 22, 17, 19, 401,30, 17, 19);//noon
        this.context.drawImage(img, 388, 22, 16, 18, 420,30, 16, 18);//emoji sleep
        this.context.drawImage(img, 403, 22, 17, 20, 438,30, 17, 20);//emoji gross
        this.context.drawImage(img, 420, 22, 17, 19, 458,30, 17, 19);//high five
        this.context.drawImage(img, 436, 22, 18, 18, 477,30, 18, 18);//truck
        this.context.drawImage(img, 453, 22, 17, 18, 491,30, 17, 18);//crossing
        this.context.drawImage(img, 470, 22, 17, 17, 509,30, 17, 17);//italian

        //second row
        this.context.drawImage(img, 7,40,17,17,10,48,17,17); //registered
        this.context.drawImage(img, 24,40,15,17,28,48,15,17); //sun
        this.context.drawImage(img, 39,40,17,17,45,48,17,17); //circle
        this.context.drawImage(img, 56,40,16,17,63,48,16,17); //x
        this.context.drawImage(img, 73,40,17,17,80,48,17,17); //oh
        this.context.drawImage(img, 90,40,17,17,97,48,17,17); //umbrella
        this.context.drawImage(img, 106,40,16,17,114,48,16,17); //shooting star
        this.context.drawImage(img, 122,40,17,17,131,48,17,17); //apple
        this.context.drawImage(img, 137,40,17,17,148,48,17,17); //candy
        this.context.drawImage(img, 153,40,17,17,165,48,17,17); //candles
        this.context.drawImage(img, 172,42,17,16,182,48,17,16); //saxophone
        this.context.drawImage(img, 189,42,17,17,199,48,17,17); //tall building
        this.context.drawImage(img, 205,42,17,17,216,48,17,17); //elephant
        this.context.drawImage(img, 222,42,17,17,233,48,17,17); //puppy
        this.context.drawImage(img, 238,42,17,17,260,48,17,17); //jeans
        this.context.drawImage(img, 255,42,17,16,277,48,17,16); //smiling girl
        this.context.drawImage(img, 270,42,17,17,294,48,17,17); //church
        this.context.drawImage(img, 287,42,17,17,311,48,17,17); //money bag
        this.context.drawImage(img, 304,42,17,17,328,48,17,17); //paperclip
        this.context.drawImage(img, 321,42,17,17,341,48,17,17); //mailbox open
        this.context.drawImage(img, 338,42,17,17,360,48,17,17); //magnifier shift
        this.context.drawImage(img, 353,42,17,17,380,48,17,17); //microscope
        this.context.drawImage(img, 371,42,17,17,401,48,17,17); //clock2
        this.context.drawImage(img, 388,42,17,17,420,48,17,17); //love emoji
        this.context.drawImage(img, 403,42,17,17,438,48,17,17); //scream emoji
        this.context.drawImage(img, 420,42,17,17,458,48,17,17); //girl sad
        this.context.drawImage(img, 436,42,17,17,477,48,17,17); //truck brown
        this.context.drawImage(img, 453,42,17,16,495,48,17,16); //sign man
        this.context.drawImage(img, 470,42,17,18,512,48,17,18); //japan
        //third row
        this.context.drawImage(img, 7,57,17,17,10,65,17,17); //exclamation
        this.context.drawImage(img, 23,57,16,17,28,65,16,17); //cloud
        this.context.drawImage(img, 39,57,16,17,46,65,16,17); //dark circle
        this.context.drawImage(img, 56,57,17,17,63,65,17,17); //x in box
        this.context.drawImage(img, 73,57,17,17,80,65,17,17); //blue p
        this.context.drawImage(img, 89,57,16,17,97,65,16,17); //twilight
        this.context.drawImage(img, 105,57,17,17,114,65,17,17); //nut
        this.context.drawImage(img, 122,57,17,17,131,65,17,17); //sour apple
        this.context.drawImage(img, 138,57,17,17,148,65,17,17); //spiral llolipop
        this.context.drawImage(img, 155,57,17,17,165,65,17,17); //two women
        this.context.drawImage(img, 172,57,17,17,182,65,17,17); //guitar
        this.context.drawImage(img, 189,57,16,17,199,65,16,17); //bland building
        this.context.drawImage(img, 204,57,17,17,216,65,17,17); //octopus
        this.context.drawImage(img, 222,57,17,17,233,65,17,17); //pig
        this.context.drawImage(img, 238,57,17,17,260,65,17,17); //dress
        this.context.drawImage(img, 255,57,17,17,277,65,17,17); //sheik
        this.context.drawImage(img, 270,57,17,17,294,65,17,17); //pink heart
        this.context.drawImage(img, 287,57,17,17,311,65,17,17); //symbols
        this.context.drawImage(img, 304,57,17,17,328,65,17,17); //ruler
        this.context.drawImage(img, 321,57,17,17,341,65,17,17); //mailbox2
        this.context.drawImage(img, 338,57,17,17,360,65,17,17); //lock open
        this.context.drawImage(img, 354,57,17,17,380,65,17,17); //telescope
        this.context.drawImage(img, 371,57,17,17,401,65,17,17); //clock3
        this.context.drawImage(img, 388,57,17,17,420,65,17,17); //emoji cool
        this.context.drawImage(img, 403,57,17,17,438,65,17,17); //emoji tense
        this.context.drawImage(img, 420,57,17,17,458,65,17,17); //plain girl
        this.context.drawImage(img, 436,57,17,17,477,65,17,17); //tractor
        this.context.drawImage(img, 453,57,17,17,494,65,17,17); //sign woman
        this.context.drawImage(img, 470,57,17,17,510,65,17,17); //korea
        //fourth row
        this.context.drawImage(img, 6,74,16,17,10,82,16,17); //two question mark
        this.context.drawImage(img, 22,74,17,17,28,82,17,17); //old phone
        this.context.drawImage(img, 40,74,17,17,46,82,17,17); //soccer ball
        this.context.drawImage(img, 55,74,17,17,63,82,17,17); //question mark
        this.context.drawImage(img, 72,74,17,17,80,82,17,17); //ab
        this.context.drawImage(img, 89,74,17,17,97,82,17,17); //sunrise
        this.context.drawImage(img, 106,74,17,17,114,82,17,17); //plant
        this.context.drawImage(img, 123,74,16,17,131,82,16,17); //pear
        this.context.drawImage(img, 138,74,17,17,148,82,17,17); //flan
        this.context.drawImage(img, 154,74,17,17,165,82,17,17); //weird pole
        this.context.drawImage(img, 171,74,17,17,182,82,17,17); //keyboard
        this.context.drawImage(img, 188,74,17,17,199,82,17,17); //spreadsheet
        this.context.drawImage(img, 205,74,17,17,216,82,17,17); //shell
        this.context.drawImage(img, 222,74,17,17,233,82,17,17); //frog
        this.context.drawImage(img, 237,74,17,17,260,82,17,17); //fancy dress
        this.context.drawImage(img, 254,74,17,17,277,82,17,17); //baby face
        this.context.drawImage(img, 269,74,18,17,294,82,18,17); //heart split
        this.context.drawImage(img, 286,74,17,17,311,82,17,17); //dollar
        this.context.drawImage(img, 303,74,17,17,328,82,17,17); //triangle
        this.context.drawImage(img, 320,74,17,17,343,82,17,17); //board note
        this.context.drawImage(img, 337,74,17,17,360,82,17,17); //lock key
        this.context.drawImage(img, 353,74,17,17,380,82,17,17); //star globe
        this.context.drawImage(img, 371,74,17,17,401,82,17,17); //clock4
        this.context.drawImage(img, 388,74,16,17,420,82,16,17); //emoji smirk
        this.context.drawImage(img, 403,74,16,17,438,82,16,17); //emoji cry
        this.context.drawImage(img, 420,74,16,17,458,82,16,17); //pray hands
        this.context.drawImage(img, 436,74,16,17,477,82,16,17); //tram
        this.context.drawImage(img, 453,74,17,17,493,82,17,17); //both sexes
        this.context.drawImage(img, 470,74,17,17,510,82,17,17); //french
        //fifth row
        this.context.drawImage(img, 6,91,17,17,10,99,17,17); //trademark
        this.context.drawImage(img, 23,91,17,17,28,99,17,17); //checkmark
        this.context.drawImage(img, 40,91,17,17,46,99,17,17); //baseball
        this.context.drawImage(img, 55,91,17,17,63,99,17,17); //question mark light
        this.context.drawImage(img, 72,91,17,17,80,99,17,17); //cl
        this.context.drawImage(img, 89,91,17,17,97,99,17,17); //sunset
        this.context.drawImage(img, 105,91,17,17,114,99,17,17); //tree
        this.context.drawImage(img, 123,91,17,17,131,99,17,17); //peach
        this.context.drawImage(img, 138,91,17,17,148,99,17,17); //big bowl
        this.context.drawImage(img, 154,91,17,17,165,99,17,17); //blue thing
        this.context.drawImage(img, 171,91,17,17,182,99,17,17); //trumpet
        this.context.drawImage(img, 188,91,17,17,199,99,17,17); //urn
        this.context.drawImage(img, 205,91,17,17,216,99,17,17); //centiepede
        this.context.drawImage(img, 222,91,17,17,233,99,17,17); //mouse face
        this.context.drawImage(img, 238,91,17,17,260,99,17,17); //bikini
        this.context.drawImage(img, 254,91,17,17,277,99,17,17); //monk
        this.context.drawImage(img, 269,91,17,17,294,99,17,17); //two hearts
        this.context.drawImage(img, 286,91,17,17,311,99,17,17); //license
        this.context.drawImage(img, 303,91,17,17,328,99,17,17); //white paper
        this.context.drawImage(img, 320,91,17,17,341,99,17,17); //french horn
        this.context.drawImage(img, 337,91,17,17,360,99,17,17); //key
        this.context.drawImage(img, 352,91,17,17,380,99,17,17); //star david
        this.context.drawImage(img, 370,91,17,17,401,99,17,17); //clock5
        this.context.drawImage(img, 387,91,17,17,420,99,17,17); //emoji plain
        this.context.drawImage(img, 403,91,17,17,438,99,17,17); //emoji surprise
        this.context.drawImage(img, 419,91,17,17,458,99,17,17); //rocket
        this.context.drawImage(img, 435,91,17,17,477,99,17,17); //mosque
        this.context.drawImage(img, 452,91,17,17,493,99,17,17); //baby sign
        this.context.drawImage(img, 469,91,17,17,510,99,17,17); //usa
       //sixth row
       this.context.drawImage(img, 6,108,17,17,10,116,17,17); //italics
       this.context.drawImage(img, 23,108,17,17,28,116,17,17); //umbrella rain
       this.context.drawImage(img, 40,108,17,17,46,116,17,17); //snowman
       this.context.drawImage(img, 55,108,17,17,63,116,17,17); //light exclamation
       this.context.drawImage(img, 72,108,17,17,80,116,17,17); //cool sign
       this.context.drawImage(img, 89,108,17,17,97,116,17,17); //desert sunrise
       this.context.drawImage(img, 106,108,17,17,114,116,17,17); //full tree
       this.context.drawImage(img, 122,108,17,17,131,116,17,17); //cherries
       this.context.drawImage(img, 137,108,17,17,148,116,17,17); //cheese cake
       this.context.drawImage(img, 154,108,17,17,165,116,17,17); //stamp
       this.context.drawImage(img, 171,108,17,17,182,116,17,17); //violin
       this.context.drawImage(img, 188,108,17,17,199,116,17,17); //japanese hut
       this.context.drawImage(img, 205,108,17,17,217,117,17,17); //ant
       this.context.drawImage(img, 222,108,17,17,233,117,17,17); //wolf
       this.context.drawImage(img, 238,108,17,17,260,117,17,17); //purple shirt
       this.context.drawImage(img, 254,108,17,17,277,117,17,17); //queen head
       this.context.drawImage(img, 270,108,18,17,294,117,18,17); //sparkling heart
       this.context.drawImage(img, 287,108,18,17,311,117,18,17); //boxes
       this.context.drawImage(img, 303,108,17,16,328,117,17,16); //yellow notebook
       this.context.drawImage(img, 322,108,17,17,345,117,17,17); //certificate
       this.context.drawImage(img, 337,108,17,17,362,117,17,17); //lock
       this.context.drawImage(img, 352,108,17,17,380,117,17,17); //folded paper
       this.context.drawImage(img, 370,108,17,17,401,117,17,17); //clock6
       this.context.drawImage(img, 387,108,17,17,420,117,17,17); //emoji eyes shut
       this.context.drawImage(img, 403,108,17,17,438,117,17,17); //emoji surprise2
       this.context.drawImage(img, 420,108,17,17,458,117,17,17); //helicopter
       this.context.drawImage(img, 436,108,17,17,477,117,17,17); //trolly
       this.context.drawImage(img, 453,108,17,17,491,117,17,17); //toilet
      //seventh row
      this.context.drawImage(img, 6,125,17,16,10,133,17,16); //bi-directional
      this.context.drawImage(img, 22,125,17,17,28,133,17,17); //coffee cup
      this.context.drawImage(img, 40,125,17,16,46,133,17,16); //cloudy sun
      this.context.drawImage(img, 55,125,17,16,63,133,17,16); //red exclamation
      this.context.drawImage(img, 72,125,17,16,80,133,17,16); //free
      this.context.drawImage(img, 89,125,17,16,97,133,17,16); //sunrise building
      this.context.drawImage(img, 106,125,17,16,114,133,17,16); //palm tree
      this.context.drawImage(img, 122,125,17,16,131,133,17,16); //strawberry
      this.context.drawImage(img, 136,125,18,16,148,133,18,16); //weird box
      this.context.drawImage(img, 154,125,17,16,165,133,17,16); //bag
      this.context.drawImage(img, 171,125,17,16,183,133,17,16); //g-clef
      this.context.drawImage(img, 188,125,17,16,199,134,17,16); //three towers
      this.context.drawImage(img, 205,125,17,16,216,134,17,16); //bumble bee
      this.context.drawImage(img, 222,125,16,16,233,134,16,16); //bear face
      this.context.drawImage(img, 237,125,16,16,260,134,16,16); //pink purse
      this.context.drawImage(img, 254,125,16,16,277,134,16,16); //devil face
      this.context.drawImage(img, 270,125,17,16,294,134,17,16); //three hearts
      this.context.drawImage(img, 287,125,17,16,311,134,17,16); //split dollar
      this.context.drawImage(img, 304,125,17,16,328,134,17,16); //black notebook
      this.context.drawImage(img, 321,125,17,16,341,134,17,16); //rectangle dots
      this.context.drawImage(img, 337,125,17,16,360,134,17,16); //open lock
      this.context.drawImage(img, 353,125,17,16,380,134,17,16); //sparkles
      this.context.drawImage(img, 371,125,17,16,401,134,17,16); //clock7
      this.context.drawImage(img, 387,125,17,16,420,134,17,16); //emoji aloof
      this.context.drawImage(img, 403,125,17,16,438,134,17,16); //emoji nervous
      this.context.drawImage(img, 420,125,17,16,458,134,17,16); //train
      this.context.drawImage(img, 436,125,17,16,477,134,17,16); //cable car
      this.context.drawImage(img, 453,125,17,16,491,134,17,16); //wc
    //eighth row
    this.context.drawImage(img, 6,142,17,15,10,150,17,15); //vertical arrows
    this.context.drawImage(img, 22,143,17,15,28,150,17,15); //hand up
    this.context.drawImage(img, 40,143,16,15,46,150,16,15); //weird u
    this.context.drawImage(img, 55,141,17,15,63,150,17,15); //red heart
    this.context.drawImage(img, 72,141,17,15,80,150,17,15); //ID sign
    this.context.drawImage(img, 89,141,17,15,97,150,17,15); //rainbow
    this.context.drawImage(img, 106,141,17,16,114,150,17,16); //cactus
    this.context.drawImage(img, 123,141,16,16,131,150,16,16); //cheeseburger
    this.context.drawImage(img, 138,141,17,16,148,150,17,16); //hot soup
    this.context.drawImage(img, 155,141,17,16,166,150,17,16); //grad cap
    this.context.drawImage(img, 172,141,17,16,182,150,17,16); //purple slushi
    this.context.drawImage(img, 189,141,17,16,199,150,17,16); //rat
    this.context.drawImage(img, 206,141,16,16,216,150,16,16); //lady bug
    this.context.drawImage(img, 222,141,16,16,233,150,16,16); //panda
    this.context.drawImage(img, 237,141,16,16,260,150,16,16); //purse
    this.context.drawImage(img, 254,141,16,16,277,150,16,16); //ugly mask
    this.context.drawImage(img, 269,141,18,16,294,150,18,16); //arrow heart
    this.context.drawImage(img, 287,141,18,16,313,150,18,16); //split card
    this.context.drawImage(img, 303,141,17,16,328,150,17,16); //light notebook
    this.context.drawImage(img, 320,141,17,16,341,150,17,16); //calculator
    this.context.drawImage(img, 337,141,17,16,360,150,17,16); //bell
    this.context.drawImage(img, 353,141,17,16,380,150,17,16); //white frame
    this.context.drawImage(img, 370,141,17,16,401,150,17,16); //clock8
    this.context.drawImage(img, 387,141,17,16,420,150,17,16); //emoji sad
    this.context.drawImage(img, 403,141,17,16,438,150,17,16); //emoji ghost
    this.context.drawImage(img, 420,141,17,16,458,150,17,16); //trollie2
    this.context.drawImage(img, 437,141,17,16,477,150,17,16); //cable car 2
    this.context.drawImage(img, 453,141,17,16,491,150,17,16); //shower head

    //nineth row
    this.context.drawImage(img, 6,159,17,15,10,167,17,15); //arrow up left
    this.context.drawImage(img, 22,158,17,15,28,167,17,15); //emoji blush
    this.context.drawImage(img, 40,158,17,15,46,167,17,15); //neutral
    this.context.drawImage(img, 55,158,17,15,63,167,17,15); //plus
    this.context.drawImage(img, 73,158,17,15,80,167,17,15); //new sign
    this.context.drawImage(img, 89,158,17,15,97,167,17,15); //twilight 2
    this.context.drawImage(img, 107,158,17,15,114,167,17,15); //toulip
    this.context.drawImage(img, 122,158,17,15,131,167,17,15); //pizza
    this.context.drawImage(img, 137,158,17,15,148,167,17,15); //dark magnifier
    this.context.drawImage(img, 155,158,17,15,165,167,17,15); //small horse frame
    this.context.drawImage(img, 172,158,17,15,182,167,17,15); //tennis ball
    this.context.drawImage(img, 189,158,17,15,199,167,17,15); //white mouse
    this.context.drawImage(img, 205,158,17,15,216,167,17,15); //blue fish
    this.context.drawImage(img, 222,158,17,15,233,167,17,15); //alien pink
    this.context.drawImage(img, 238,158,17,15,260,167,17,15); //bland purse
    this.context.drawImage(img, 254,158,17,15,277,167,17,15); //funny ghost
    this.context.drawImage(img, 269,158,18,15,294,167,18,15); //blue heart
    this.context.drawImage(img, 286,158,18,15,311,167,18,15); //split book 2
    this.context.drawImage(img, 304,158,17,15,328,167,17,15); //brown notebook
    this.context.drawImage(img, 321,158,17,15,344,167,17,15); //weird button
    this.context.drawImage(img, 337,158,17,15,360,167,17,15); //bell stick
    this.context.drawImage(img, 353,158,17,15,380,167,17,15); //black frame
    this.context.drawImage(img, 371,158,17,15,401,167,17,15); //clock9
    this.context.drawImage(img, 388,158,17,15,420,167,17,15); //emoji lookdown
    this.context.drawImage(img, 403,158,17,15,438,167,17,15); //emoji X
    this.context.drawImage(img, 420,158,17,15,458,167,17,15); //cockpit
    this.context.drawImage(img, 436,158,17,15,477,167,17,15); //big ship
    this.context.drawImage(img, 453,158,17,15,491,167,17,15); //tub man

    //tenth row
    this.context.drawImage(img, 6,176,17,15,10,184,17,15); //arrow up right
    this.context.drawImage(img, 22,176,17,15,28,184,17,15); //V sign
    this.context.drawImage(img, 40,174,17,15,46,184,17,15); //cathedral
    this.context.drawImage(img, 56,176,16,15,63,184,16,15); //minus
    this.context.drawImage(img, 72,176,17,15,80,184,17,15); //ng sign
    this.context.drawImage(img, 89,176,17,15,98,184,17,15); //wave
    this.context.drawImage(img, 105,173,17,16,115,184,17,16); //pink flower
    this.context.drawImage(img, 122,174,16,15,132,184,16,15); //lamb chop
    this.context.drawImage(img, 137,174,17,15,148,184,17,15); //fork knife
    this.context.drawImage(img, 154,174,17,15,165,184,17,15); //ferris wheel
    this.context.drawImage(img, 172,174,17,15,182,184,17,15); //skiis
    this.context.drawImage(img, 189,174,17,15,199,184,17,15); //cattle
    this.context.drawImage(img, 206,174,17,15,216,184,17,15); //yellow fish
    this.context.drawImage(img, 221,174,17,15,233,184,17,15); //paws
    this.context.drawImage(img, 238,174,17,15,260,184,17,15); //missle
    this.context.drawImage(img, 255,174,17,15,278,184,17,15); //baby angel
    this.context.drawImage(img, 270,174,17,15,294,184,17,15); //red heart
    this.context.drawImage(img, 287,174,17,15,311,184,17,15); //cash
    this.context.drawImage(img, 304,174,17,15,328,184,17,15); //open book
    this.context.drawImage(img, 321,174,17,15,344,184,17,15); //off sign
    this.context.drawImage(img, 338,174,17,15,360,184,17,15); //badge
    this.context.drawImage(img, 353,174,17,15,380,184,17,15); //red dot
    this.context.drawImage(img, 371,174,17,16,401,184,17,16); //clock10
    this.context.drawImage(img, 388,174,16,16,420,184,16,16); //emoji confused
    this.context.drawImage(img, 403,174,16,16,438,184,16,16); //emoji surprise3
    this.context.drawImage(img, 420,174,16,16,458,184,16,16); //airplane front
    this.context.drawImage(img, 436,174,16,16,477,184,16,16); //row boat
    this.context.drawImage(img, 453,174,17,16,491,184,17,16); //tub

    //eleventh
    this.context.drawImage(img, 6,193,17,14,10,201,17,14); //arrow down right
    this.context.drawImage(img,22,193,17,14,28,201,17,14); //necklace sign
    this.context.drawImage(img,40,193,17,14,46,201,17,14); //wedding cake
    this.context.drawImage(img,56,193,17,14,63,201,17,14); //divide
    this.context.drawImage(img,72,193,17,14,80,201,17,14); //ok sign
    this.context.drawImage(img,89,193,17,14,97,201,17,14); //volcano
    this.context.drawImage(img,105,193,17,14,115,201,17,14); //rose
    this.context.drawImage(img,122,193,17,14,132,201,17,14); //drumbstick
    this.context.drawImage(img,138,192,17,14,148,201,17,14); //hot soup2
    this.context.drawImage(img,155,193,17,15,165,201,17,15); //rollercoaster
    this.context.drawImage(img,172,191,17,15,182,201,17,15); //basketball
    this.context.drawImage(img,189,193,17,15,199,201,17,15); //black cow
    this.context.drawImage(img,204,193,17,15,216,201,17,15); //puffer fish
    this.context.drawImage(img,221,193,17,14,233,201,17,14); //googly eyes
    this.context.drawImage(img,238,192,17,15,260,201,17,15); //sneaker
    this.context.drawImage(img,255,191,17,15,277,201,17,15); //purple alien
    this.context.drawImage(img,270,191,17,15,294,201,17,15); //yellow heart
    this.context.drawImage(img,287,191,17,15,311,201,17,15); //weird chinese
    this.context.drawImage(img,304,191,17,15,328,201,17,15); //grey notebook
    this.context.drawImage(img,321,191,17,15,341,201,17,15); //phone banned
    this.context.drawImage(img,337,191,17,15,360,201,17,15); //paper clip2
    this.context.drawImage(img,353,190,17,16,380,202,17,16); //blue circle
    this.context.drawImage(img,371,190,17,16,401,202,17,16); //clock11
    this.context.drawImage(img,387,190,17,16,420,202,17,16); //emoji angry
    this.context.drawImage(img,403,190,17,16,438,202,17,16); //emoji sleep
    this.context.drawImage(img,420,190,16,16,458,202,16,16); //airplane front2
    this.context.drawImage(img,435,190,19,16,477,202,19,16); //race boat
    this.context.drawImage(img,453,190,19,16,495,202,19,16); //crossing guard

    //twelth row
    this.context.drawImage(img, 6,210,17,14,10,218,17,14); //arrow down left
    this.context.drawImage(img, 22,209,17,14,28,218,17,14); //weird symbol2
    this.context.drawImage(img, 39,209,17,14,46,218,17,14); //golf put
    this.context.drawImage(img, 56,209,17,14,64,218,17,14); //arrow right
    this.context.drawImage(img, 72,209,17,14,80,218,17,14); //SOS
    this.context.drawImage(img, 89,209,17,14,97,218,17,14); //twilight3
    this.context.drawImage(img, 105,207,17,15,115,218,17,15); //blossom
    this.context.drawImage(img, 122,207,17,15,132,218,17,15); //black square circle
    this.context.drawImage(img, 138,207,17,15,148,218,17,15); //vases
    this.context.drawImage(img, 155,207,17,15,165,218,17,15); //fish hook
    this.context.drawImage(img, 172,207,17,15,182,218,17,15); //race flag
    this.context.drawImage(img, 189,207,17,15,199,218,17,15); //milk cow
    this.context.drawImage(img, 206,207,17,15,216,218,17,15); //turtle
    this.context.drawImage(img, 220,207,17,15,233,218,17,15); //ear
    this.context.drawImage(img, 238,207,17,15,260,218,17,15); //high heel
    this.context.drawImage(img, 255,207,17,15,277,218,17,15); //arcade alien
    this.context.drawImage(img, 271,207,17,15,294,218,17,15); //purple heart
    this.context.drawImage(img, 287,207,17,15,311,218,17,15); //chair
    this.context.drawImage(img, 304,207,17,15,328,218,17,15); //purple notebook
    this.context.drawImage(img, 321,207,17,15,342,218,17,15); //chart
    this.context.drawImage(img, 338,207,17,16,360,218,17,16); //circle filled
    this.context.drawImage(img, 353,205,17,16,380,218,17,16); //yellow diamond
    this.context.drawImage(img, 371,205,17,18,401,218,17,18); //clock12
    this.context.drawImage(img, 387,205,17,18,420,218,17,18); //emoji kiss
    this.context.drawImage(img, 403,205,17,18,438,218,17,18); //emoji X2
    this.context.drawImage(img, 420,205,17,18,458,218,17,18); //train sign
    this.context.drawImage(img, 436,205,17,18,477,218,17,18); //tree dots
    this.context.drawImage(img, 453,205,17,18,493,218,17,18); //crossing guard2
     
    //thirtenth row
    this.context.drawImage(img, 6,226,17,14,10,235,17,14); //arrow curve sign
    this.context.drawImage(img, 22,226,17,14,28,235,17,14); //weird symbol3
    this.context.drawImage(img, 39,226,17,15,46,235,17,15); //sailboat
    this.context.drawImage(img, 56,226,17,15,64,235,17,15); //weird symbol4
    this.context.drawImage(img, 73,225,16,15,80,235,17,16); //up sign
    this.context.drawImage(img, 89,224,16,16,99,235,17,16); //earth
    this.context.drawImage(img, 106,224,16,16,116,235,17,16); //sunflower
    this.context.drawImage(img, 123,224,16,16,133,235,17,16); //weird mound
    this.context.drawImage(img, 137,223,16,16,148,235,17,16); //wine glass
    this.context.drawImage(img, 155,223,16,16,165,235,17,16); //microphone
    this.context.drawImage(img, 172,223,16,16,182,235,17,16); //snowboarder
    this.context.drawImage(img, 189,223,16,16,199,235,17,16); //puggy cow
    this.context.drawImage(img, 206,223,16,16,216,235,17,16); //chick
    this.context.drawImage(img, 223,223,16,16,233,235,17,16); //nose
    this.context.drawImage(img, 236,223,16,16,260,235,17,16); //high heel2
    this.context.drawImage(img, 255,223,16,16,277,235,17,16); //purple devil
    this.context.drawImage(img, 270,223,16,16,294,235,17,16); //bow heart
    this.context.drawImage(img, 287,223,16,16,311,235,17,16); //monitor
    this.context.drawImage(img, 304,223,16,16,328,235,17,16); //orange notebook
    this.context.drawImage(img, 321,223,16,16,341,235,17,16); //camera
    this.context.drawImage(img, 338,223,16,16,360,235,17,16); //back arrow
    this.context.drawImage(img, 353,223,16,16,380,235,17,16); //blue diamond
    this.context.drawImage(img, 371,223,16,16,401,235,17,16); //clock13
    this.context.drawImage(img, 388,223,16,16,420,235,17,16); //emoji kiss heart
    this.context.drawImage(img, 403,223,16,16,438,235,17,16); //emoji mum
    this.context.drawImage(img, 420,223,16,16,458,235,17,16); //train front
    this.context.drawImage(img, 437,223,16,16,477,235,17,16); //three dots vertical
    this.context.drawImage(img, 453,223,16,16,491,235,17,16); //luggage sign
   //fourteenth row
   this.context.drawImage(img, 6,243,17,14,10,252,17,14); //arrow curve right
   this.context.drawImage(img, 22,243,17,14,28,252,17,14); //weird symbol4
   this.context.drawImage(img, 39,243,17,14,46,252,17,14); //tent
   this.context.drawImage(img, 56,243,17,14,64,252,17,14); //double weird
   this.context.drawImage(img, 72,243,17,14,80,252,17,14); //vs sign
   this.context.drawImage(img, 89,241,17,15,99,252,17,15); //earth 2
   this.context.drawImage(img, 106,241,17,15,116,252,17,15); //sunflower2
   this.context.drawImage(img, 123,241,17,15,131,252,17,15); //icecream bowl
   this.context.drawImage(img, 138,241,17,15,148,252,17,15); //martini
   this.context.drawImage(img, 155,241,17,15,165,252,17,15); //videocamera
   this.context.drawImage(img, 172,241,17,15,182,252,17,15); //man running
   this.context.drawImage(img, 189,241,17,15,199,252,17,15); //puggy cow2
   this.context.drawImage(img, 205,241,17,15,216,252,17,15); //chick2
   this.context.drawImage(img, 223,241,17,15,233,252,17,15); //mouth
   this.context.drawImage(img, 238,241,17,15,260,252,17,15); //boots
   this.context.drawImage(img, 255,241,17,15,277,252,17,15); //skull
   this.context.drawImage(img, 270,241,17,15,294,252,17,15); //two pink hearts
   this.context.drawImage(img, 287,241,17,15,311,252,17,15); //black attache
   this.context.drawImage(img, 304,241,17,15,328,252,17,15); //notebook stack
   this.context.drawImage(img, 320,241,17,15,341,252,17,15); //handheld camera
   this.context.drawImage(img, 338,241,17,15,360,252,17,15); //end arrow
   this.context.drawImage(img, 353,241,17,15,380,252,17,15); //little orange diamond
   this.context.drawImage(img, 371,241,17,15,401,252,17,15); //mountain pic
   this.context.drawImage(img, 387,241,17,15,420,252,17,15); //emoji kiss2
   this.context.drawImage(img, 403,241,17,15,438,252,17,15); //emoji hush
   this.context.drawImage(img, 420,241,17,15,458,252,17,15); //train headon
   this.context.drawImage(img, 436,241,17,15,477,252,17,15); //blockade
   this.context.drawImage(img, 453,241,17,15,493,252,17,15); //key sign
   //fifteenth row
   this.context.drawImage(img, 6,257,17,15,10,269,17,15); //stopwatch
   this.context.drawImage(img, 22,257,17,15,28,269,17,15); //weird symbol5
   this.context.drawImage(img, 39,257,17,15,46,269,17,15); //gas station
   this.context.drawImage(img, 56,257,17,15,64,269,17,15); //arrow curve up
   this.context.drawImage(img, 72,257,17,15,80,269,17,15); //hebrew symbol
   this.context.drawImage(img, 89,257,17,16,99,269,17,16); //earth 3
   this.context.drawImage(img, 106,257,17,16,115,269,17,16); //banana
   this.context.drawImage(img, 124,257,17,16,131,269,17,16); //weird dish
   this.context.drawImage(img, 137,257,17,16,148,269,17,16); //margarita
   this.context.drawImage(img, 155,257,17,16,165,269,17,16); //videocamera sign
   this.context.drawImage(img, 172,257,17,16,182,269,17,16); //suffer
   this.context.drawImage(img, 189,257,17,16,199,269,17,16); //white bunny
   this.context.drawImage(img, 205,257,17,16,216,269,17,16); //chick3
   this.context.drawImage(img, 223,257,17,16,233,269,17,16); //tongue out
   this.context.drawImage(img, 238,257,17,16,260,269,17,16); //footprints
   this.context.drawImage(img, 254,257,17,16,277,269,17,16); //bland girl
   this.context.drawImage(img, 270,257,17,16,294,269,17,16); //heart sign
   this.context.drawImage(img, 287,257,17,16,311,269,17,16); //CD record
   this.context.drawImage(img, 304,257,17,16,328,269,17,16); //head spikes
   this.context.drawImage(img, 321,257,17,16,341,269,17,16); //old TV
   this.context.drawImage(img, 338,257,17,16,360,269,17,16); //bidrectional ON
   this.context.drawImage(img, 353,257,17,16,380,269,17,16); //little blue diamond
   this.context.drawImage(img, 371,257,17,16,401,269,17,16); //tower2
   this.context.drawImage(img, 388,257,17,16,420,269,17,16); //emoji kiss blush
   this.context.drawImage(img, 403,257,17,16,438,269,17,16); //emoji cat
   this.context.drawImage(img, 420,257,17,16,458,269,17,16); //train headon2
   this.context.drawImage(img, 436,257,17,16,477,269,17,16); //buzzer
   this.context.drawImage(img, 453,257,17,16,493,269,17,16); //pound sign

   //loaded from api
   //this.context.drawImage(img, data[0].x,data[0].y,data[0].width,data[0].height,data[0].canvasX,data[0].canvasY,data[0].canvasWidth,data[0].canvasHeight); //stopwatch
   

        let nonUnique: string[] = [];
        let names: string[] = [];

        this.loadObject();
        this.allEmojis.forEach(f => {
          if(!names.find( n => n === f.Name)) {
            names.push(f.name);
          } else {
            nonUnique.push(f.Name);
          }

        });
        console.log('Non uniques => ' + nonUnique);
        //nonUnique = [];
        //names = [];

        data.forEach(f => {
          if(this.context) {
            this.context.drawImage(img, f.x, f.y, f.width, f.height, f.canvasX, f.canvasY, f.canvasWidth, f.canvasHeight);
            this.loadObjectAPI(f);
            /*if(!names.find( n => n === f.name)) {
              names.push(f.name);
            } else {
              nonUnique.push(f.name);
            }*/
          }
         
        });
        this.allLoaded = true;
        //this.postData();
      }
    
    };
    imgOriginal.onload = () => {
      if(this.contextOriginal) {
        this.contextOriginal.drawImage(imgOriginal,10,10);
      }
      
    }
    img.src = '/assets/images/emoji-sheet-sm.png';
    imgOriginal.src = '/assets/images/emoji-sheet.png';
  }
  private loadObjectAPI(f: any): void {
        let lastNum= 426
        let colorArr = this.buildPixels(f.canvasX, f.canvasY, f.canvasWidth, f.canvasHeight);
        const arr: number[] = [f.x, f.y, f.width, f.height, f.canvasX, f.canvasY, f.canvasWidth, f.canvasHeight];
        const copy = this.createObj( arr, f.name, lastNum, colorArr);
        lastNum++;
        this.allEmojis.push(copy);
  }
  private loadObject(): void {
        const emojis:any[] = [];
        let colorArr = this.buildPixels(10,30,17,17);
        const copy = this.createObj([7,22,17,17,10,30,17,17], 'copyright', 1, colorArr);
        emojis.push(copy);

        colorArr = this.buildPixels(28,30,17,17);
        const dos = this.createObj([25, 22, 17, 17, 28,30, 17, 17], 'dos', 2, colorArr);
        emojis.push(dos);

        colorArr = this.buildPixels(46,30,17,16);
        const bolt = this.createObj([41, 22, 15, 16, 46,30, 17, 16], 'bolt', 3, colorArr);
        emojis.push(bolt);

        colorArr = this.buildPixels(63,30,16,18);
        const cross = this.createObj([56, 22, 16, 18, 63,30, 16, 18], 'cross', 4, colorArr);
        emojis.push(cross);

        colorArr = this.buildPixels(80,30,16,17);
        const blogger = this.createObj([73, 22, 16, 17, 80,30, 16, 17], 'blogger', 5, colorArr);
        emojis.push(blogger);

        colorArr = this.buildPixels(97,30,17,17);
        const bulb = this.createObj([90, 22, 17, 17, 97,30, 17, 17], 'bulb', 6, colorArr);
        emojis.push(bulb);

        colorArr = this.buildPixels(114,30,16,17);
        const star = this.createObj([107, 22, 16, 17, 114,30, 16, 17], 'star', 7, colorArr);
        emojis.push(star);

        colorArr = this.buildPixels(131,30,15,18);
        const pineapple = this.createObj([124, 22, 15, 18, 131,30, 15, 18], 'pineapple', 8, colorArr);
        emojis.push(pineapple);

        colorArr = this.buildPixels(148,30,18,19);
        const cigars = this.createObj([137, 22, 18, 19, 148,30, 18, 19], 'cigars', 9, colorArr);
        emojis.push(cigars);

        colorArr = this.buildPixels(165,30,17,17);
        const flags = this.createObj([155, 22, 17, 17, 165,30, 17, 17], 'flags', 10, colorArr);
        emojis.push(flags);

        colorArr = this.buildPixels(182,30,17,18);
        const notes = this.createObj([172, 22, 17, 18, 182,30, 17, 18], 'notes', 11, colorArr);
        emojis.push(notes);

        colorArr = this.buildPixels(199,30,17,18);
        const building = this.createObj([189, 22, 17, 18, 199,30, 17, 18], 'work building', 12, colorArr);
        emojis.push(building);

        colorArr = this.buildPixels(216,30,17,17);
        const boar = this.createObj([206, 22, 17, 17, 216,30, 17, 17], 'boar', 13, colorArr);
        emojis.push(boar);

        colorArr = this.buildPixels(233,30,17,18);
        const monkey = this.createObj([223, 22, 17, 18, 233,30, 17, 18], 'monkey', 14, colorArr);
        emojis.push(monkey);

        colorArr = this.buildPixels(260,30,17,18);
        const shirt = this.createObj([238, 22, 17, 18, 260,30, 17, 18], 'shirt', 15, colorArr);
        emojis.push(shirt);

        colorArr = this.buildPixels(277,30,16,18);
        const arab = this.createObj([ 255, 22, 16, 18, 277,30, 16, 18], 'arab', 16, colorArr);
        emojis.push(arab);

        colorArr = this.buildPixels(294,30,18,18);
        const couple = this.createObj([270, 22, 18, 18, 294,30, 18, 18], 'couple', 17, colorArr);
        emojis.push(couple);

        colorArr = this.buildPixels(311,30,17,17);
        const hundred = this.createObj([287, 22, 17, 17, 311,30, 17, 17], 'hundred', 18, colorArr);
        emojis.push(hundred);

        colorArr = this.buildPixels(328,30,17,17);
        const llolipop = this.createObj([304, 22, 17, 17, 328,30, 17, 17], 'llolipop', 19, colorArr);
        emojis.push(llolipop);

        colorArr = this.buildPixels(341,30,17,18);
        const mailbox = this.createObj([321, 22, 17, 18, 341,30, 17, 18], 'mailbox', 20, colorArr);
        emojis.push(mailbox);

        colorArr = this.buildPixels(360,30,16,17);
        const magnifier = this.createObj([338, 22, 16, 17, 360,30, 16, 17], 'magnifier', 21, colorArr);
        emojis.push(magnifier);

        colorArr = this.buildPixels(380,30,18,19);
        const revolver = this.createObj([353, 22, 18, 19, 380,30, 18, 19], 'revolver', 22, colorArr);
        emojis.push(revolver);

        colorArr = this.buildPixels(401,30,17,19);
        const noon = this.createObj([371, 22, 17, 19, 401,30, 17, 19], 'noon', 23, colorArr);
        emojis.push(noon);

        colorArr = this.buildPixels(420,30,16,18);
        const emojiSleep = this.createObj([388, 22, 16, 18, 420,30, 16, 18], 'emoji sleep', 24, colorArr);
        emojis.push(emojiSleep);

        colorArr = this.buildPixels(438,30,17,20);
        const emojiGross = this.createObj([403, 22, 17, 20, 438,30, 17, 20], 'emoji gross', 25, colorArr);
        emojis.push(emojiGross);

        colorArr = this.buildPixels(458,30,17,19);
        const highFive = this.createObj([420, 22, 17, 19, 458,30, 17, 19], 'high five', 26, colorArr);
        emojis.push(highFive);

        colorArr = this.buildPixels(477,30,18,18);
        const truck = this.createObj([436, 22, 18, 18, 477,30, 18, 18], 'truck', 27, colorArr);
        emojis.push(truck);
        
        colorArr = this.buildPixels(491,30,17,18);
        const crossing = this.createObj([453, 22, 17, 18, 491,30, 17, 18], 'crossing', 28, colorArr);
        emojis.push(crossing);

        colorArr = this.buildPixels(509,30,17,17);
        const italian = this.createObj([ 470, 22, 17, 17, 509,30, 17, 17], 'italian flag', 29, colorArr);
        emojis.push(italian);

     //second row
     colorArr = this.buildPixels(10,48,17,17);
     const registered = this.createObj([7,40,17,17,10,48,17,17], 'registered', 30, colorArr);
     emojis.push(registered);

     colorArr = this.buildPixels(28,48,15,17);
     const sun = this.createObj([24,40,15,17,28,48,15,17], 'sun', 31, colorArr);
     emojis.push(sun);

     colorArr = this.buildPixels(45,48,17,17);
     const circle = this.createObj([39,40,17,17,45,48,17,17], 'circle', 32, colorArr);
     emojis.push(circle);

     colorArr = this.buildPixels(63,48,16,17);
     const x = this.createObj([56,40,16,17,63,48,16,17], 'x', 33, colorArr);
     emojis.push(x);

     colorArr = this.buildPixels(80,48,17,17);
     const oh = this.createObj([ 73,40,17,17,80,48,17,17], 'oh', 34, colorArr);
     emojis.push(oh);
   
     colorArr = this.buildPixels(97,48,17,17);
     const umbrella = this.createObj([90,40,17,17,97,48,17,17], 'umbrella', 35, colorArr);
     emojis.push(umbrella);

     colorArr = this.buildPixels(114,48,16,17);
     const shooting_star = this.createObj([106,40,16,17,114,48,16,17], 'shooting star', 36, colorArr);
     emojis.push(shooting_star);

     colorArr = this.buildPixels(131,48,17,17);
     const apple = this.createObj([122,40,17,17,131,48,17,17], 'apple', 37, colorArr);
     emojis.push(apple);

     colorArr = this.buildPixels(148,48,17,17);
     const candy = this.createObj([137,40,17,17,148,48,17,17], 'candy', 38, colorArr);
     emojis.push(candy);

     colorArr = this.buildPixels(165,48,17,17);
     const candles = this.createObj([153,40,17,17,165,48,17,17], 'candles', 39, colorArr);
     emojis.push(candles);
     
     colorArr = this.buildPixels(182,48,17,16);
     const saxophone = this.createObj([172,42,17,16,182,48,17,16], 'saxophone', 40, colorArr);
     emojis.push(saxophone);

     colorArr = this.buildPixels(199,48,17,17);
     const tall_building = this.createObj([189,42,17,17,199,48,17,17], 'tall building', 41, colorArr);
     emojis.push(tall_building);

     colorArr = this.buildPixels(216,48,17,17);
     const elephant = this.createObj([205,42,17,17,216,48,17,17], 'elephant', 42, colorArr);
     emojis.push(elephant);

     colorArr = this.buildPixels(233,48,17,17);
     const puppy = this.createObj([222,42,17,17,233,48,17,17], 'puppy', 43, colorArr);
     emojis.push(puppy);

     colorArr = this.buildPixels(260,48,17,17);
     const jeans = this.createObj([238,42,17,17,260,48,17,17], 'jeans', 44, colorArr);
     emojis.push(jeans);

     colorArr = this.buildPixels(277,48,17,16);
     const girl = this.createObj([255,42,17,16,277,48,17,16], 'smiling girl', 45, colorArr);
     emojis.push(girl);

     colorArr = this.buildPixels(294,48,17,17);
     const church = this.createObj([270,42,17,17,294,48,17,17], 'church', 46, colorArr);
     emojis.push(church);

     colorArr = this.buildPixels(311,48,17,17);
     const money_bag = this.createObj([287,42,17,17,311,48,17,17], 'money bag', 47, colorArr);
     emojis.push(money_bag);

     colorArr = this.buildPixels(328,48,17,17);
     const paperclip = this.createObj([304,42,17,17,328,48,17,17], 'paperclip', 48, colorArr);
     emojis.push(paperclip);

     colorArr = this.buildPixels(341,48,17,17);
     const mailbox_open = this.createObj([321,42,17,17,341,48,17,17], 'mailbox open', 49, colorArr);
     emojis.push(mailbox_open);

     colorArr = this.buildPixels(360,48,17,17);
     const magnifier_shift = this.createObj([338,42,17,17,360,48,17,17], 'magnifier shift', 50, colorArr);
     emojis.push(magnifier_shift);

     colorArr = this.buildPixels(380,48,17,17);
     const microscope = this.createObj([353,42,17,17,380,48,17,17], 'microscope', 51, colorArr);
     emojis.push(microscope);

     colorArr = this.buildPixels(401,48,17,17);
     const clock2 = this.createObj([371,42,17,17,401,48,17,17], 'clock2', 52, colorArr);
     emojis.push(clock2);

     colorArr = this.buildPixels(420,48,17,17);
     const emoji_love = this.createObj([388,42,17,17,420,48,17,17], 'love emoji', 53, colorArr);
     emojis.push(emoji_love);

     colorArr = this.buildPixels(438,48,17,17);
     const emoji_scream = this.createObj([ 403,42,17,17,438,48,17,17], 'scream emoji', 54, colorArr);
     emojis.push(emoji_scream);

     colorArr = this.buildPixels(458,48,17,17);
     const girl_sad = this.createObj([420,42,17,17,458,48,17,17], 'girl sad', 55, colorArr);
     emojis.push(girl_sad);

     colorArr = this.buildPixels(477,48,17,17);
     const truck_brown = this.createObj([436,42,17,17,477,48,17,17], 'truck brown', 56, colorArr);
     emojis.push(truck_brown);

     colorArr = this.buildPixels(495,48,17,16);
     const sign_man = this.createObj([453,42,17,16,495,48,17,16], 'sign man', 57, colorArr);
     emojis.push(sign_man);

     
     colorArr = this.buildPixels(512,48,17,18);
     const japan = this.createObj([470,42,17,18,512,48,17,18], 'japan', 58, colorArr);
     emojis.push(japan);

     //third row
     colorArr = this.buildPixels(10,65,17,17);
     const exclamation = this.createObj([7,57,17,17,10,65,17,17], 'exclamation', 59, colorArr);
     emojis.push(exclamation);

     colorArr = this.buildPixels(28,65,16,17);
     const cloud = this.createObj([23,57,16,17,28,65,16,17], 'cloud', 60, colorArr);
     emojis.push(cloud);

     colorArr = this.buildPixels(46,65,16,17);
     const dark_circle = this.createObj([ 39,57,16,17,46,65,16,17], 'dark circle', 61, colorArr);
     emojis.push(dark_circle);

     colorArr = this.buildPixels(63,65,17,17);
     const x_box= this.createObj([56,57,17,17,63,65,17,17], 'x in box', 62, colorArr);
     emojis.push(x_box);

     colorArr = this.buildPixels(80,65,17,17);
     const blue_p = this.createObj([73,57,17,17,80,65,17,17], 'blue p', 63, colorArr);
     emojis.push(blue_p);

     colorArr = this.buildPixels(97,65,16,17);
     const twilight = this.createObj([89,57,16,17,97,65,16,17], 'twilight', 64, colorArr);
     emojis.push(twilight);

     colorArr = this.buildPixels(114,65,17,17);
     const nut = this.createObj([105,57,17,17,114,65,17,17], 'nut', 65, colorArr);
     emojis.push(nut);

     colorArr = this.buildPixels(131,65,17,17);
     const sour_apple = this.createObj([122,57,17,17,131,65,17,17], 'sour apple', 66, colorArr);
     emojis.push(sour_apple);

     colorArr = this.buildPixels(148,65,17,17);
     const spiral_lloli = this.createObj([138,57,17,17,148,65,17,17], 'spiral llolipop', 67, colorArr);
     emojis.push(spiral_lloli);

     colorArr = this.buildPixels(165,65,17,17);
     const two_women = this.createObj([155,57,17,17,165,65,17,17], 'two women', 68, colorArr);
     emojis.push(two_women);

     colorArr = this.buildPixels(182,65,17,17);
     const guitar = this.createObj([172,57,17,17,182,65,17,17], 'guitar', 69, colorArr);
     emojis.push(guitar);
     
     colorArr = this.buildPixels(199,65,16,17);
     const bland_building = this.createObj([189,57,16,17,199,65,16,17], 'bland building', 70, colorArr);
     emojis.push(bland_building);

     colorArr = this.buildPixels(216,65,17,17);
     const octopus = this.createObj([204,57,17,17,216,65,17,17], 'octopus', 71, colorArr);
     emojis.push(octopus);

     colorArr = this.buildPixels(233,65,17,17);
     const pig = this.createObj([222,57,17,17,233,65,17,17], 'pig', 72, colorArr);
     emojis.push(pig);

     colorArr = this.buildPixels(260,65,17,17);
     const dress = this.createObj([238,57,17,17,260,65,17,17], 'dresss', 73, colorArr);
     emojis.push(dress);

     colorArr = this.buildPixels(277,65,17,17);
     const sheik = this.createObj([255,57,17,17,277,65,17,17], 'sheik', 74, colorArr);
     emojis.push(sheik);

     colorArr = this.buildPixels(294,65,17,17);
     const pink_heart = this.createObj([270,57,17,17,294,65,17,17], 'pink heart', 75, colorArr);
     emojis.push(pink_heart);

     colorArr = this.buildPixels(311,65,17,17);
     const symbols = this.createObj([287,57,17,17,311,65,17,17], 'symbols', 76, colorArr);
     emojis.push(symbols);

     colorArr = this.buildPixels(328,65,17,17);
     const ruler = this.createObj([304,57,17,17,328,65,17,17], 'ruler', 77, colorArr);
     emojis.push(ruler);

     
     colorArr = this.buildPixels(341,65,17,17);
     const mailbox2 = this.createObj([321,57,17,17,341,65,17,17], 'mailbox2', 78, colorArr);
     emojis.push(mailbox2);

     colorArr = this.buildPixels(360,65,17,17);
     const lock_open = this.createObj([338,57,17,17,360,65,17,17], 'lock open', 79, colorArr);
     emojis.push(lock_open);

     colorArr = this.buildPixels(380,65,17,17);
     const telescope = this.createObj([354,57,17,17,380,65,17,17], 'telescope', 80, colorArr);
     emojis.push(telescope);

     colorArr = this.buildPixels(401,65,17,17);
     const clock3 = this.createObj([371,57,17,17,401,65,17,17], 'clock3', 81, colorArr);
     emojis.push(clock3);

     colorArr = this.buildPixels(420,65,17,17);
     const emoji_cool = this.createObj([388,57,17,17,420,65,17,17], 'emoji cool', 82, colorArr);
     emojis.push(emoji_cool);

     colorArr = this.buildPixels(438,65,17,17);
     const emoji_tense = this.createObj([403,57,17,17,438,65,17,17], 'emoji tense', 83, colorArr);
     emojis.push(emoji_tense);

     colorArr = this.buildPixels(458,65,17,17);
     const plain_girl = this.createObj([420,57,17,17,458,65,17,17], 'plain girl', 84, colorArr);
     emojis.push(plain_girl);

     colorArr = this.buildPixels(477,65,17,17);
     const tractor = this.createObj([436,57,17,17,477,65,17,17], 'tractor', 85, colorArr);
     emojis.push(tractor);

     colorArr = this.buildPixels(494,65,17,17);
     const sign_woman = this.createObj([453,57,17,17,494,65,17,17], 'sign woman', 86, colorArr);
     emojis.push(sign_woman);

     colorArr = this.buildPixels(510,65,17,17);
     const korea = this.createObj([470,57,17,17,510,65,17,17], 'korea', 87, colorArr);
     emojis.push(korea);

     //fourth row
     colorArr = this.buildPixels(10,82,16,17);
     const two_question = this.createObj([ 6,74,16,17,10,82,16,17], 'two question mark', 88, colorArr);
     emojis.push(two_question);

     colorArr = this.buildPixels(28,82,17,17);
     const old_phone  = this.createObj([22,74,17,17,28,82,17,17], 'old phone', 89, colorArr);
     emojis.push(old_phone);

     colorArr = this.buildPixels(46,82,17,17);
     const soccer_ball  = this.createObj([40,74,17,17,46,82,17,17], 'soccer ball', 90, colorArr);
     emojis.push(soccer_ball);

     colorArr = this.buildPixels(63,82,17,17);
     const question_mark  = this.createObj([55,74,17,17,63,82,17,17], 'question_mark', 91, colorArr);
     emojis.push(question_mark);

     colorArr = this.buildPixels(80,82,17,17);
     const ab  = this.createObj([72,74,17,17,80,82,17,17], 'ab', 92, colorArr);
     emojis.push(ab);

     colorArr = this.buildPixels(97,82,17,17);
     const sunrise  = this.createObj([89,74,17,17,97,82,17,17], 'sunrise', 93, colorArr);
     emojis.push(sunrise);

     colorArr = this.buildPixels(114,82,17,17);
     const plant  = this.createObj([106,74,17,17,114,82,17,17], 'plant', 94, colorArr);
     emojis.push(plant);

     colorArr = this.buildPixels(131,82,16,17);
     const pear  = this.createObj([123,74,16,17,131,82,16,17], 'pear', 95, colorArr);
     emojis.push(pear);

     colorArr = this.buildPixels(148,82,17,17);
     const flan  = this.createObj([138,74,17,17,148,82,17,17], 'flan', 96, colorArr);
     emojis.push(flan);

     colorArr = this.buildPixels(165,82,17,17);
     const weird_pole  = this.createObj([154,74,17,17,165,82,17,17], 'weird pole', 97, colorArr);
     emojis.push(weird_pole);

     colorArr = this.buildPixels(182,82,17,17);
     const keyboard  = this.createObj([171,74,17,17,182,82,17,17], 'keyboard', 98, colorArr);
     emojis.push(keyboard);

     colorArr = this.buildPixels(199,82,17,17);
     const spreadsheet  = this.createObj([188,74,17,17,199,82,17,17], 'spreadsheet', 99, colorArr);
     emojis.push(spreadsheet);

     colorArr = this.buildPixels(216,82,17,17);
     const shell  = this.createObj([205,74,17,17,216,82,17,17], 'shell', 100, colorArr);
     emojis.push(shell);

     colorArr = this.buildPixels(233,82,17,17);
     const frog  = this.createObj([222,74,17,17,233,82,17,17], 'frog', 101, colorArr);
     emojis.push(frog);

     colorArr = this.buildPixels(260,82,17,17);
     const fancy_dress  = this.createObj([237,74,17,17,260,82,17,17], 'fancy dress', 102, colorArr);
     emojis.push(fancy_dress);

     colorArr = this.buildPixels(277,82,17,17);
     const baby_face  = this.createObj([254,74,17,17,277,82,17,17], 'baby face', 103, colorArr);
     emojis.push(baby_face);

     colorArr = this.buildPixels(294,82,18,17);
     const heart_split  = this.createObj([269,74,18,17,294,82,18,17], 'heart split', 104, colorArr);
     emojis.push(heart_split);

     colorArr = this.buildPixels(311,82,17,17);
     const dollar  = this.createObj([286,74,17,17,311,82,17,17], 'dollar', 105, colorArr);
     emojis.push(dollar);

     colorArr = this.buildPixels(328,82,17,17);
     const triangle  = this.createObj([ 303,74,17,17,328,82,17,17], 'triangle', 106, colorArr);
     emojis.push(triangle);

     colorArr = this.buildPixels(343,82,17,17);
     const note  = this.createObj([320,74,17,17,343,82,17,17], 'board note', 107, colorArr);
     emojis.push(note);

     colorArr = this.buildPixels(360,82,17,17);
     const lock_key  = this.createObj([337,74,17,17,360,82,17,17], 'lock key', 108, colorArr);
     emojis.push(lock_key);

     colorArr = this.buildPixels(380,82,17,17);
     const star_globe  = this.createObj([353,74,17,17,380,82,17,17], 'star globe', 109, colorArr);
     emojis.push(star_globe);

     colorArr = this.buildPixels(401,82,17,17);
     const clock4  = this.createObj([371,74,17,17,401,82,17,17], 'clock4', 110, colorArr);
     emojis.push(clock4);

     colorArr = this.buildPixels(420,82,16,17);
     const emoji_smirk  = this.createObj([388,74,16,17,420,82,16,17], 'emoji smirk', 111, colorArr);
     emojis.push(emoji_smirk);

     colorArr = this.buildPixels(438,82,16,17);
     const emoji_cry  = this.createObj([403,74,16,17,438,82,16,17], 'emoji cry', 112, colorArr);
     emojis.push(emoji_cry);

     colorArr = this.buildPixels(458,82,16,17);
     const pray_hands  = this.createObj([420,74,16,17,458,82,16,17], 'pray hands', 113, colorArr);
     emojis.push(pray_hands);

     colorArr = this.buildPixels(477,82,16,17);
     const tram  = this.createObj([436,74,16,17,477,82,16,17], 'tram', 114, colorArr);
     emojis.push(tram);

     colorArr = this.buildPixels(493,82,17,17);
     const both_sexes  = this.createObj([453,74,17,17,493,82,17,17], 'both sexes', 115, colorArr);
     emojis.push(both_sexes);

     colorArr = this.buildPixels(510,82,17,17);
     const french  = this.createObj([470,74,17,17,510,82,17,17], 'french', 116, colorArr);
     emojis.push(french);
    
     //fifth row
     colorArr = this.buildPixels(10,99,17,17);
     const trademark  = this.createObj([6,91,17,17,10,99,17,17], 'trademark', 117, colorArr);
     emojis.push(trademark);

     colorArr = this.buildPixels(28,99,17,17);
     const checkmark  = this.createObj([23,91,17,17,28,99,17,17], 'checkmark', 118, colorArr);
     emojis.push(checkmark);

     colorArr = this.buildPixels(46,99,17,17);
     const baseball  = this.createObj([40,91,17,17,46,99,17,17], 'baseball', 119, colorArr);
     emojis.push(baseball);

     colorArr = this.buildPixels(63,99,17,17);
     const question_mark_l = this.createObj([55,91,17,17,63,99,17,17], 'question mark light', 120, colorArr);
     emojis.push(question_mark_l);
     
     colorArr = this.buildPixels(80,99,17,17);
     const cl= this.createObj([ 72,91,17,17,80,99,17,17], 'cl', 121, colorArr);
     emojis.push(cl);

     colorArr = this.buildPixels(97,99,17,17);
     const sunset = this.createObj([89,91,17,17,97,99,17,17], 'sunset', 122, colorArr);
     emojis.push(sunset);

     colorArr = this.buildPixels(114,99,17,17);
     const tree = this.createObj([105,91,17,17,114,99,17,17], 'tree', 123, colorArr);
     emojis.push(tree);

     colorArr = this.buildPixels(131,99,17,17);
     const peach = this.createObj([123,91,17,17,131,99,17,17], 'peach', 124, colorArr);
     emojis.push(peach);

     colorArr = this.buildPixels(148,99,17,17);
     const big_bowl = this.createObj([138,91,17,17,148,99,17,17], 'big bowl', 125, colorArr);
     emojis.push(big_bowl);

     colorArr = this.buildPixels(165,99,17,17);
     const blue_thing = this.createObj([154,91,17,17,165,99,17,17], 'blue thing', 126, colorArr);
     emojis.push(blue_thing);

     colorArr = this.buildPixels(182,99,17,17);
     const trumpet = this.createObj([171,91,17,17,182,99,17,17], 'trumpet', 127, colorArr);
     emojis.push(trumpet);

     colorArr = this.buildPixels(199,99,17,17);
     const urn = this.createObj([188,91,17,17,199,99,17,17], 'urn', 128, colorArr);
     emojis.push(urn);

     colorArr = this.buildPixels(216,99,17,17);
     const centipede = this.createObj([205,91,17,17,216,99,17,17], 'centipede', 128, colorArr);
     emojis.push(centipede);

     colorArr = this.buildPixels(233,99,17,17);
     const mouse_face = this.createObj([222,91,17,17,233,99,17,17], 'mouse face', 129, colorArr);
     emojis.push(mouse_face);

     colorArr = this.buildPixels(260,99,17,17);
     const bikini = this.createObj([ 238,91,17,17,260,99,17,17], 'bikini', 130, colorArr);
     emojis.push(bikini);

     colorArr = this.buildPixels(277,99,17,17);
     const monk = this.createObj([254,91,17,17,277,99,17,17], 'monk', 131, colorArr);
     emojis.push(monk);

     colorArr = this.buildPixels(294,99,17,17);
     const hearts = this.createObj([269,91,17,17,294,99,17,17], 'two hearts', 132, colorArr);
     emojis.push(hearts);

     colorArr = this.buildPixels(311,99,17,17);
     const license = this.createObj([286,91,17,17,311,99,17,17], 'license', 133, colorArr);
     emojis.push(license);

     colorArr = this.buildPixels(328,99,17,17);
     const paper = this.createObj([303,91,17,17,328,99,17,17], 'white paper', 134, colorArr);
     emojis.push(paper);

     colorArr = this.buildPixels(341,99,17,17);
     const french_horn = this.createObj([320,91,17,17,341,99,17,17], 'french horn', 135, colorArr);
     emojis.push(french_horn);

     colorArr = this.buildPixels(360,99,17,17);
     const key = this.createObj([337,91,17,17,360,99,17,17], 'key', 136, colorArr);
     emojis.push(key);

     colorArr = this.buildPixels(380,99,17,17);
     const star_david = this.createObj([352,91,17,17,380,99,17,17], 'star david', 137, colorArr);
     emojis.push(star_david);

     colorArr = this.buildPixels(401,99,17,17);
     const clock5 = this.createObj([370,91,17,17,401,99,17,17], 'clock5', 138, colorArr);
     emojis.push(clock5);

     colorArr = this.buildPixels(420,99,17,17);
     const emoji_plain = this.createObj([387,91,17,17,420,99,17,17], 'emoji plain', 139, colorArr);
     emojis.push(emoji_plain);

     colorArr = this.buildPixels(438,99,17,17);
     const emoji_surprise = this.createObj([ 403,91,17,17,438,99,17,17], 'emoji surprise', 140, colorArr);
     emojis.push(emoji_surprise);

     colorArr = this.buildPixels(458,99,17,17);
     const rocket = this.createObj([419,91,17,17,458,99,17,17], 'rocket', 141, colorArr);
     emojis.push(rocket);

     colorArr = this.buildPixels(477,99,17,17);
     const mosque = this.createObj([435,91,17,17,477,99,17,17], 'mosque', 142, colorArr);
     emojis.push(mosque);

     colorArr = this.buildPixels(493,99,17,17);
     const baby_sign = this.createObj([452,91,17,17,493,99,17,17], 'baby sign', 143, colorArr);
     emojis.push(baby_sign);

     colorArr = this.buildPixels(510,99,17,17);
     const usa = this.createObj([469,91,17,17,510,99,17,17], 'usa', 144, colorArr);
     emojis.push(usa);

     //sixth row

     colorArr = this.buildPixels(10,116,17,17);
     const italics = this.createObj([6,108,17,17,10,116,17,17], 'italics', 145, colorArr);
     emojis.push(italics);

     colorArr = this.buildPixels(28,116,17,17);
     const umbrella_rain = this.createObj([23,108,17,17,28,116,17,17], 'umbrella rain', 146, colorArr);
     emojis.push(umbrella_rain);

     colorArr = this.buildPixels(46,116,17,17);
     const snowman = this.createObj([40,108,17,17,46,116,17,17], 'snowman', 147, colorArr);
     emojis.push(snowman);

     colorArr = this.buildPixels(63,116,17,17);
     const light_exclamation = this.createObj([55,108,17,17,63,116,17,17], 'light exclamation', 148, colorArr);
     emojis.push(light_exclamation);

     colorArr = this.buildPixels(80,116,17,17);
     const cool_sign = this.createObj([72,108,17,17,80,116,17,17], 'cool sign', 149, colorArr);
     emojis.push(cool_sign);

     colorArr = this.buildPixels(97,116,17,17);
     const desert_sign = this.createObj([89,108,17,17,97,116,17,17], 'desert sign', 150, colorArr);
     emojis.push(desert_sign);

     colorArr = this.buildPixels(114,116,17,17);
     const full_tree = this.createObj([106,108,17,17,114,116,17,17], 'full tree', 151, colorArr);
     emojis.push(full_tree);

     colorArr = this.buildPixels(131,116,17,17);
     const cherries = this.createObj([122,108,17,17,131,116,17,17], 'cherries', 152, colorArr);
     emojis.push(cherries);

     colorArr = this.buildPixels(148,116,17,17);
     const cheese_cake = this.createObj([137,108,17,17,148,116,17,17], 'cheese cake', 153, colorArr);
     emojis.push(cheese_cake);

     colorArr = this.buildPixels(165,116,17,17);
     const stamp = this.createObj([154,108,17,17,165,116,17,17], 'stamp', 154, colorArr);
     emojis.push(stamp);

     colorArr = this.buildPixels(182,116,17,17);
     const violin = this.createObj([171,108,17,17,182,116,17,17], 'violin', 155, colorArr);
     emojis.push(violin);

     colorArr = this.buildPixels(199,116,17,17);
     const japanese_hut = this.createObj([188,108,17,17,199,116,17,17], 'japanese hut', 156, colorArr);
     emojis.push(japanese_hut);

     colorArr = this.buildPixels(217,117,17,17);
     const ant = this.createObj([205,108,17,17,217,117,17,17], 'ant', 157, colorArr);
     emojis.push(ant);

     colorArr = this.buildPixels(233,117,17,17);
     const wolf = this.createObj([222,108,17,17,233,117,17,17], 'wolf', 158, colorArr);
     emojis.push(wolf);

     colorArr = this.buildPixels(260,117,17,17);
     const purple_shirt = this.createObj([238,108,17,17,260,117,17,17], 'purple shirt', 159, colorArr);
     emojis.push(purple_shirt);

     colorArr = this.buildPixels(277,117,17,17);
     const queen_head = this.createObj([254,108,17,17,277,117,17,17], 'queen head', 160, colorArr);
     emojis.push(queen_head);

     colorArr = this.buildPixels(294,117,18,17);
     const sparking_heart = this.createObj([270,108,18,17,294,117,18,17], 'sparkling heart', 161, colorArr);
     emojis.push(sparking_heart);

     colorArr = this.buildPixels(311,117,18,17);
     const boxes = this.createObj([287,108,18,17,311,117,18,17], 'boxes', 162, colorArr);
     emojis.push(boxes);

     colorArr = this.buildPixels(328,117,17,16);
     const yellow = this.createObj([303,108,17,16,328,117,17,16], 'yellow notebook', 163, colorArr);
     emojis.push(yellow);

     colorArr = this.buildPixels(345,117,17,17);
     const certificate = this.createObj([322,108,17,17,345,117,17,17], 'certificate', 164, colorArr);
     emojis.push(certificate);
    
     colorArr = this.buildPixels(362,117,17,17);
     const lock = this.createObj([337,108,17,17,362,117,17,17], 'lock', 165, colorArr);
     emojis.push(lock);

     colorArr = this.buildPixels(380,117,17,17);
     const folded_paper = this.createObj([352,108,17,17,380,117,17,17], 'folded paper', 166, colorArr);
     emojis.push(folded_paper);

     colorArr = this.buildPixels(401,117,17,17);
     const clock6 = this.createObj([370,108,17,17,401,117,17,17], 'clock6', 167, colorArr);
     emojis.push(clock6);

     colorArr = this.buildPixels(420,117,17,17);
     const emoji_eyes = this.createObj([387,108,17,17,420,117,17,17], 'emoji eyes shit', 168, colorArr);
     emojis.push(emoji_eyes);

     colorArr = this.buildPixels(438,117,17,17);
     const emoji_surprise2 = this.createObj([403,108,17,17,438,117,17,17], 'emoji surprise2', 169, colorArr);
     emojis.push(emoji_surprise2);

     colorArr = this.buildPixels(458,117,17,17);
     const helicopter = this.createObj([420,108,17,17,458,117,17,17], 'helicopter', 170, colorArr);
     emojis.push(helicopter);

     colorArr = this.buildPixels(477,117,17,17);
     const trolly = this.createObj([436,108,17,17,477,117,17,17], 'trolly', 171, colorArr);
     emojis.push(trolly);

     colorArr = this.buildPixels(491,117,17,17);
     const toilet = this.createObj([453,108,17,17,491,117,17,17], 'toilet', 172, colorArr);
     emojis.push(toilet);

     //seventh row

     colorArr = this.buildPixels(10,133,17,16);
     const bi_directional = this.createObj([6,125,17,16,10,133,17,16], 'bi-directional', 173, colorArr);
     emojis.push(bi_directional);

     colorArr = this.buildPixels(28,133,17,17);
     const coffe_cup = this.createObj([22,125,17,17,28,133,17,17], 'coffee cup', 174, colorArr);
     emojis.push(coffe_cup);

     colorArr = this.buildPixels(46,133,17,16);
     const cloudy_sun = this.createObj([40,125,17,16,46,133,17,16], 'cloudy sun', 175, colorArr);
     emojis.push(cloudy_sun);

     colorArr = this.buildPixels(63,133,17,16);
     const red_exclamation = this.createObj([55,125,17,16,63,133,17,16], 'red exclamation', 176, colorArr);
     emojis.push(red_exclamation);

     
     colorArr = this.buildPixels(80,133,17,16);
     const free = this.createObj([72,125,17,16,80,133,17,16], 'free', 177, colorArr);
     emojis.push(free);

     colorArr = this.buildPixels(97,133,17,16);
     const sunrise_building = this.createObj([89,125,17,16,97,133,17,16], 'sunrise building', 178, colorArr);
     emojis.push(sunrise_building);

     colorArr = this.buildPixels(114,133,17,16);
     const palm_tree = this.createObj([106,125,17,16,114,133,17,16], 'palm tree', 179, colorArr);
     emojis.push(palm_tree);

     colorArr = this.buildPixels(131,133,17,16);
     const strawberry = this.createObj([122,125,17,16,131,133,17,16], 'strawberry', 180, colorArr);
     emojis.push(strawberry);

     colorArr = this.buildPixels(148,133,18,16);
     const weird_box = this.createObj([136,125,18,16,148,133,18,16], 'weird box', 181, colorArr);
     emojis.push(weird_box);

     colorArr = this.buildPixels(165,133,17,16);
     const bag = this.createObj([154,125,17,16,165,133,17,16], 'bag', 182, colorArr);
     emojis.push(bag);

     colorArr = this.buildPixels(183,133,17,16);
     const g_clef = this.createObj([171,125,17,16,183,133,17,16], 'g-clef', 183, colorArr);
     emojis.push(g_clef);

     colorArr = this.buildPixels(199,134,17,16);
     const three_towers = this.createObj([188,125,17,16,199,134,17,16], 'three towers', 184, colorArr);
     emojis.push(three_towers);

     colorArr = this.buildPixels(216,134,17,16);
     const bumble_bee = this.createObj([205,125,17,16,216,134,17,16], 'bumble bee', 185, colorArr);
     emojis.push(bumble_bee);

     colorArr = this.buildPixels(233,134,16,16);
     const bear_face = this.createObj([222,125,16,16,233,134,16,16], 'bear face', 186, colorArr);
     emojis.push(bear_face);

     colorArr = this.buildPixels(260,134,16,16);
     const pink_purse = this.createObj([237,125,16,16,260,134,16,16], 'pink purse', 187, colorArr);
     emojis.push(pink_purse);

     colorArr = this.buildPixels(277,134,16,16);
     const devil_face = this.createObj([254,125,16,16,277,134,16,16], 'devil face', 188, colorArr);
     emojis.push(devil_face);

     colorArr = this.buildPixels(294,134,17,16);
     const three_hearts = this.createObj([270,125,17,16,294,134,17,16], 'three hearts', 189, colorArr);
     emojis.push(three_hearts);

     colorArr = this.buildPixels(311,134,17,16);
     const split_dollar = this.createObj([287,125,17,16,311,134,17,16], 'split dollar', 190, colorArr);
     emojis.push(split_dollar);

     colorArr = this.buildPixels(328,134,17,16);
     const black_notebook = this.createObj([304,125,17,16,328,134,17,16], 'black notebook', 191, colorArr);
     emojis.push(black_notebook);

     colorArr = this.buildPixels(341,134,17,16);
     const rectangle_dots = this.createObj([321,125,17,16,341,134,17,16], 'rectangle dots', 192, colorArr);
     emojis.push(rectangle_dots);

     colorArr = this.buildPixels(360,134,17,16);
     const open_lock = this.createObj([337,125,17,16,360,134,17,16], 'open lock', 193, colorArr);
     emojis.push(open_lock);

     colorArr = this.buildPixels(380,134,17,16);
     const sparkles = this.createObj([353,125,17,16,380,134,17,16], 'sparkles', 194, colorArr);
     emojis.push(sparkles);

     colorArr = this.buildPixels(401,134,17,16);
     const clock7 = this.createObj([371,125,17,16,401,134,17,16], 'clock7', 195, colorArr);
     emojis.push(clock7);

     colorArr = this.buildPixels(420,134,17,16);
     const emoji_aloof = this.createObj([387,125,17,16,420,134,17,16], 'emoji aloof', 196, colorArr);
     emojis.push(emoji_aloof);

     colorArr = this.buildPixels(438,134,17,16);
     const emoji_nervous = this.createObj([403,125,17,16,438,134,17,16], 'emoji nervous', 197, colorArr);
     emojis.push(emoji_nervous);

     colorArr = this.buildPixels(458,134,17,16);
     const train = this.createObj([420,125,17,16,458,134,17,16], 'train', 198, colorArr);
     emojis.push(train);

     colorArr = this.buildPixels(477,134,17,16);
     const cable_car = this.createObj([436,125,17,16,477,134,17,16], 'cable car', 199, colorArr);
     emojis.push(cable_car);

     colorArr = this.buildPixels(491,134,17,16);
     const wc = this.createObj([453,125,17,16,491,134,17,16], 'wc', 200, colorArr);
     emojis.push(wc);

     //eigth row

     colorArr = this.buildPixels(10,150,17,15);
     const vertical_arrows = this.createObj([6,142,17,15,10,150,17,15], 'vertical arrows', 201, colorArr);
     emojis.push(vertical_arrows)

     colorArr = this.buildPixels(28,150,17,15);
     const hand_up = this.createObj([22,143,17,15,28,150,17,15], 'hand up', 202, colorArr);
     emojis.push(hand_up)

     colorArr = this.buildPixels(46,150,16,15);
     const weird_u = this.createObj([40,143,16,15,46,150,16,15], 'weird u', 203, colorArr);
     emojis.push(weird_u)

     colorArr = this.buildPixels(63,150,17,15);
     const red_heart = this.createObj([55,141,17,15,63,150,17,15], 'red heart', 204, colorArr);
     emojis.push(red_heart)

     colorArr = this.buildPixels(80,150,17,15);
     const id_sign = this.createObj([72,141,17,15,80,150,17,15], 'ID Sign', 205, colorArr);
     emojis.push(id_sign)

     colorArr = this.buildPixels(97,150,17,15);
     const rainbow = this.createObj([89,141,17,15,97,150,17,15], 'rainbow', 206, colorArr);
     emojis.push(rainbow)

     colorArr = this.buildPixels(114,150,17,16);
     const cactus = this.createObj([106,141,17,16,114,150,17,16], 'cactus', 207, colorArr);
     emojis.push(cactus)

     colorArr = this.buildPixels(131,150,16,16);
     const cheeseburger = this.createObj([123,141,16,16,131,150,16,16], 'cheeseburger', 208, colorArr);
     emojis.push(cheeseburger)

     colorArr = this.buildPixels(148,150,17,16);
     const hot_soup = this.createObj([138,141,17,16,148,150,17,16], 'hot soup', 209, colorArr);
     emojis.push(hot_soup)

     colorArr = this.buildPixels(166,150,17,16);
     const grad_cap = this.createObj([155,141,17,16,166,150,17,16], 'grad cap', 210, colorArr);
     emojis.push(grad_cap)

     colorArr = this.buildPixels(182,150,17,16);
     const purple_slush = this.createObj([172,141,17,16,182,150,17,16], 'purple slush', 211, colorArr);
     emojis.push(purple_slush)

     colorArr = this.buildPixels(199,150,17,16);
     const rat = this.createObj([189,141,17,16,199,150,17,16], 'rat', 212, colorArr);
     emojis.push(rat)

     colorArr = this.buildPixels(216,150,16,16);
     const lady_bug = this.createObj([206,141,16,16,216,150,16,16], 'lady bug', 213, colorArr);
     emojis.push(lady_bug)

     colorArr = this.buildPixels(233,150,16,16);
     const panda = this.createObj([222,141,16,16,233,150,16,16], 'panda', 214, colorArr);
     emojis.push(panda)

     colorArr = this.buildPixels(260,150,16,16);
     const purse = this.createObj([237,141,16,16,260,150,16,16], 'purse', 215, colorArr);
     emojis.push(purse)

     colorArr = this.buildPixels(277,150,16,16);
     const ugly_mask = this.createObj([254,141,16,16,277,150,16,16], 'ugly mask', 216, colorArr);
     emojis.push(ugly_mask)

     colorArr = this.buildPixels(294,150,18,16);
     const arrow_heart = this.createObj([269,141,18,16,294,150,18,16], 'arrow vheart', 217, colorArr);
     emojis.push(arrow_heart)

     colorArr = this.buildPixels(313,150,18,16);
     const split_card = this.createObj([287,141,18,16,313,150,18,16], 'split card', 218, colorArr);
     emojis.push(split_card)

     colorArr = this.buildPixels(328,150,17,16);
     const light_notebook = this.createObj([303,141,17,16,328,150,17,16], 'light notebook', 219, colorArr);
     emojis.push(light_notebook);

     colorArr = this.buildPixels(341,150,17,16);
     const calculator = this.createObj([320,141,17,16,341,150,17,16], 'calculator', 220, colorArr);
     emojis.push(calculator);

     colorArr = this.buildPixels(360,150,17,16);
     const bell = this.createObj([337,141,17,16,360,150,17,16], 'bell', 221, colorArr);
     emojis.push(bell);

     colorArr = this.buildPixels(380,150,17,16);
     const white_frame = this.createObj([353,141,17,16,380,150,17,16], 'white frame', 222, colorArr);
     emojis.push(white_frame);

     colorArr = this.buildPixels(401,150,17,16);
     const clock8 = this.createObj([370,141,17,16,401,150,17,16], 'clock8', 223, colorArr);
     emojis.push(clock8);

     colorArr = this.buildPixels(420,150,17,16);
     const emoji_sad = this.createObj([387,141,17,16,420,150,17,16], 'emoji sad', 224, colorArr);
     emojis.push(emoji_sad);

     colorArr = this.buildPixels(438,150,17,16);
     const emoji_ghost = this.createObj([403,141,17,16,438,150,17,16], 'emoji ghost', 225, colorArr);
     emojis.push(emoji_ghost);

     colorArr = this.buildPixels(458,150,17,16);
     const trollie2 = this.createObj([420,141,17,16,458,150,17,16], 'trollie2', 226, colorArr);
     emojis.push(trollie2);

     colorArr = this.buildPixels(477,150,17,16);
     const cable_car_2 = this.createObj([437,141,17,16,477,150,17,16], 'cable car 2', 227, colorArr);
     emojis.push(cable_car_2);

     colorArr = this.buildPixels(491,150,17,16);
     const shower_head = this.createObj([453,141,17,16,491,150,17,16], 'shower head', 228, colorArr);
     emojis.push(shower_head);

     //nineth row

    colorArr = this.buildPixels(10,167,17,15);
     const arrow_up_left = this.createObj([6,159,17,15,10,167,17,15], 'arrow up left', 229, colorArr);
     emojis.push(arrow_up_left);

     colorArr = this.buildPixels(28,167,17,15);
     const emoji_blush = this.createObj([22,158,17,15,28,167,17,15], 'emoji blush', 230, colorArr);
     emojis.push(emoji_blush);
     
     colorArr = this.buildPixels(46,167,17,15);
     const neutral = this.createObj([ 40,158,17,15,46,167,17,15], 'neutral', 231, colorArr);
     emojis.push(neutral);

     colorArr = this.buildPixels(63,167,17,15);
     const plus = this.createObj([55,158,17,15,63,167,17,15], 'plus', 232, colorArr);
     emojis.push(plus);
     
     colorArr = this.buildPixels(80,167,17,15);
     const new_sign = this.createObj([73,158,17,15,80,167,17,15], 'new sign', 233, colorArr);
     emojis.push(new_sign);

     colorArr = this.buildPixels(97,167,17,15);
     const twilight_2 = this.createObj([89,158,17,15,97,167,17,15], 'twilight 2', 234, colorArr);
     emojis.push(twilight_2);

     colorArr = this.buildPixels(114,167,17,15);
     const toulip = this.createObj([107,158,17,15,114,167,17,15], 'toulip', 235, colorArr);
     emojis.push(toulip);

     colorArr = this.buildPixels(131,167,17,15);
     const pizza = this.createObj([122,158,17,15,131,167,17,15], 'pizza', 236, colorArr);
     emojis.push(pizza);

     colorArr = this.buildPixels(148,167,17,15);
     const dark_magnifier = this.createObj([137,158,17,15,148,167,17,15], 'dark magnifier', 237, colorArr);
     emojis.push(dark_magnifier);

     colorArr = this.buildPixels(165,167,17,15);
     const small_horse = this.createObj([155,158,17,15,165,167,17,15], 'small horse frame', 238, colorArr);
     emojis.push(small_horse);
     
     colorArr = this.buildPixels(182,167,17,15);
     const tennis_ball = this.createObj([ 172,158,17,15,182,167,17,15], 'tennis ball', 239, colorArr);
     emojis.push(tennis_ball);

     colorArr = this.buildPixels(199,167,17,15);
     const white_mouse = this.createObj([189,158,17,15,199,167,17,15], 'white mouse', 240, colorArr);
     emojis.push(white_mouse);

     colorArr = this.buildPixels(216,167,17,15);
     const blue_fish = this.createObj([ 205,158,17,15,216,167,17,15], 'blue fish', 241, colorArr);
     emojis.push(blue_fish);

     colorArr = this.buildPixels(233,167,17,15);
     const alien_pink = this.createObj([222,158,17,15,233,167,17,15], 'alien_pink', 242, colorArr);
     emojis.push(alien_pink);

     colorArr = this.buildPixels(260,167,17,15);
     const bland_purse = this.createObj([238,158,17,15,260,167,17,15], 'bland purse', 243, colorArr);
     emojis.push(bland_purse);

     colorArr = this.buildPixels(277,167,17,15);
     const funny_ghost = this.createObj([254,158,17,15,277,167,17,15], 'funny ghost', 244, colorArr);
     emojis.push(funny_ghost);

     colorArr = this.buildPixels(294,167,18,15);
     const blue_heart = this.createObj([269,158,18,15,294,167,18,15], 'blue heart', 245, colorArr);
     emojis.push(blue_heart);

     colorArr = this.buildPixels(311,167,18,15);
     const split_book2 = this.createObj([286,158,18,15,311,167,18,15], 'split book 2', 246, colorArr);
     emojis.push(split_book2);

     colorArr = this.buildPixels(328,167,17,15);
     const brown_book = this.createObj([304,158,17,15,328,167,17,15], 'brown book', 247, colorArr);
     emojis.push(brown_book);

     colorArr = this.buildPixels(344,167,17,15);
     const weird_button = this.createObj([321,158,17,15,344,167,17,15], 'weird button', 248, colorArr);
     emojis.push(weird_button);

     colorArr = this.buildPixels(360,167,17,15);
     const bell_stick = this.createObj([337,158,17,15,360,167,17,15], 'bell stick', 249, colorArr);
     emojis.push(bell_stick);

     colorArr = this.buildPixels(380,167,17,15);
     const black_frame = this.createObj([353,158,17,15,380,167,17,15], 'black frame', 250, colorArr);
     emojis.push(black_frame);

     colorArr = this.buildPixels(401,167,17,15);
     const clock9 = this.createObj([371,158,17,15,401,167,17,15], 'clock9', 251, colorArr);
     emojis.push(clock9);

     colorArr = this.buildPixels(420,167,17,15);
     const emoji_lookdown = this.createObj([388,158,17,15,420,167,17,15], 'emoji lookdown', 252, colorArr);
     emojis.push(emoji_lookdown);

     colorArr = this.buildPixels(438,167,17,15)
     const emoji_X = this.createObj([403,158,17,15,438,167,17,15], 'emoji X', 253, colorArr);
     emojis.push(emoji_X);

     colorArr = this.buildPixels(458,167,17,15)
     const cockpit = this.createObj([420,158,17,15,458,167,17,15], 'cockpit', 254, colorArr);
     emojis.push(cockpit);

     colorArr = this.buildPixels(477,167,17,15)
     const big_ship = this.createObj([436,158,17,15,477,167,17,15], 'big ship', 255, colorArr);
     emojis.push(big_ship);

     colorArr = this.buildPixels(491,167,17,15)
     const tub_man = this.createObj([453,158,17,15,491,167,17,15], 'tub man', 256, colorArr);
     emojis.push(tub_man);

     //tenth row
     colorArr = this.buildPixels(10,184,17,15)
     const arrow_up_right = this.createObj([6,176,17,15,10,184,17,15], 'arrow up right', 257, colorArr);
     emojis.push(arrow_up_right);

     colorArr = this.buildPixels(28,184,17,15)
     const v_sign = this.createObj([22,176,17,15,28,184,17,15], 'V sign', 258, colorArr);
     emojis.push(v_sign);

     colorArr = this.buildPixels(46,184,17,15)
     const cathedral = this.createObj([40,174,17,15,46,184,17,15], 'cathedral', 259, colorArr);
     emojis.push(cathedral);


     colorArr = this.buildPixels(63,184,16,15)
     const minus = this.createObj([56,176,16,15,63,184,16,15], 'minus', 260, colorArr);
     emojis.push(minus);

     colorArr = this.buildPixels(80,184,17,15)
     const ng = this.createObj([72,176,17,15,80,184,17,15], 'ng sign', 261, colorArr);
     emojis.push(ng);

     colorArr = this.buildPixels(98,184,17,15)
     const wave = this.createObj([89,176,17,15,98,184,17,15], 'wave', 262, colorArr);
     emojis.push(wave);

     colorArr = this.buildPixels(115,184,17,16)
     const pink_flower = this.createObj([105,173,17,16,115,184,17,16], 'pink flower', 263, colorArr);
     emojis.push(pink_flower);

     colorArr = this.buildPixels(132,184,16,15)
     const lamb_chop = this.createObj([122,174,16,15,132,184,16,15], 'lamb chop', 264, colorArr);
     emojis.push(lamb_chop);

     colorArr = this.buildPixels(148,184,17,15)
     const fork_knife = this.createObj([137,174,17,15,148,184,17,15], 'fork knife', 265, colorArr);
     emojis.push(fork_knife);

     colorArr = this.buildPixels(165,184,17,15)
     const ferris_wheel = this.createObj([154,174,17,15,165,184,17,15], 'ferris wheel', 266, colorArr);
     emojis.push(ferris_wheel);

     colorArr = this.buildPixels(182,184,17,15)
     const skiis = this.createObj([172,174,17,15,182,184,17,15], 'skiis', 267, colorArr);
     emojis.push(skiis);

     colorArr = this.buildPixels(199,184,17,15)
     const cattle = this.createObj([189,174,17,15,199,184,17,15], 'cattle', 268, colorArr);
     emojis.push(cattle);

     colorArr = this.buildPixels(216,184,17,15)
     const yellow_fish = this.createObj([206,174,17,15,216,184,17,15], 'yellow fish', 269, colorArr);
     emojis.push(yellow_fish);

     colorArr = this.buildPixels(233,184,17,15)
     const paws = this.createObj([221,174,17,15,233,184,17,15], 'paws', 270, colorArr);
     emojis.push(paws);

     colorArr = this.buildPixels(260,184,17,15)
     const missle = this.createObj([238,174,17,15,260,184,17,15], 'missle', 271, colorArr);
     emojis.push(missle);

     colorArr = this.buildPixels(278,184,17,15)
     const baby_angel = this.createObj([255,174,17,15,278,184,17,15], 'baby angel', 272, colorArr);
     emojis.push(baby_angel);

     
     colorArr = this.buildPixels(294,184,17,15)
     const red_heart2 = this.createObj([270,174,17,15,294,184,17,15], 'red heart 2', 273, colorArr);
     emojis.push(red_heart2);

     colorArr = this.buildPixels(311,184,17,15)
     const cash = this.createObj([287,174,17,15,311,184,17,15], 'cash', 274, colorArr);
     emojis.push(cash);

     colorArr = this.buildPixels(328,184,17,15)
     const open_book = this.createObj([304,174,17,15,328,184,17,15], 'open book', 275, colorArr);
     emojis.push(open_book);

     colorArr = this.buildPixels(344,184,17,15)
     const off_sign = this.createObj([321,174,17,15,344,184,17,15], 'off sign', 276, colorArr);
     emojis.push(off_sign);

     colorArr = this.buildPixels(360,184,17,15)
     const badge = this.createObj([338,174,17,15,360,184,17,15], 'badge', 277, colorArr);
     emojis.push(badge);

     colorArr = this.buildPixels(380,184,17,15)
     const red_dot = this.createObj([353,174,17,15,380,184,17,15], 'red dot', 278, colorArr);
     emojis.push(red_dot);

     colorArr = this.buildPixels(401,184,17,16)
     const clock10 = this.createObj([371,174,17,16,401,184,17,16], 'clock10', 279, colorArr);
     emojis.push(clock10);

     colorArr = this.buildPixels(420,184,16,16)
     const emoji_confused = this.createObj([388,174,16,16,420,184,16,16], 'emoji confused', 280, colorArr);
     emojis.push(emoji_confused);

     colorArr = this.buildPixels(438,184,16,16)
     const emoji_surprise3 = this.createObj([403,174,16,16,438,184,16,16], 'emoji surprise3', 281, colorArr);
     emojis.push(emoji_surprise3);

     colorArr = this.buildPixels(458,184,16,16)
     const airplane_front = this.createObj([420,174,16,16,458,184,16,16], 'airplane front', 282, colorArr);
     emojis.push(airplane_front);

     colorArr = this.buildPixels(477,184,16,16)
     const row_boat = this.createObj([436,174,16,16,477,184,16,16], 'row boat', 283, colorArr);
     emojis.push(row_boat);

     colorArr = this.buildPixels(491,184,17,16)
     const tub = this.createObj([453,174,17,16,491,184,17,16], 'tub', 284, colorArr);
     emojis.push(tub);

     //eleventh row
     colorArr = this.buildPixels(10,201,17,14)
     const arrow_down_right = this.createObj([6,193,17,14,10,201,17,14], 'arrow down right', 285, colorArr);
     emojis.push(arrow_down_right);

     colorArr = this.buildPixels(28,201,17,14)
     const necklace_sign = this.createObj([22,193,17,14,28,201,17,14], 'necklace sign', 286, colorArr);
     emojis.push(necklace_sign);

     colorArr = this.buildPixels(46,201,17,14)
     const wedding_cake = this.createObj([40,193,17,14,46,201,17,14], 'wedding cake', 287, colorArr);
     emojis.push(wedding_cake);

     colorArr = this.buildPixels(63,201,17,14)
     const divide = this.createObj([56,193,17,14,63,201,17,14], 'divide', 288, colorArr);
     emojis.push(divide);

     colorArr = this.buildPixels(80,201,17,14)
     const ok_sign = this.createObj([72,193,17,14,80,201,17,14], 'ok sign', 289, colorArr);
     emojis.push(ok_sign);

     colorArr = this.buildPixels(97,201,17,14)
     const volcano = this.createObj([89,193,17,14,97,201,17,14], 'volcano', 291, colorArr);
     emojis.push(volcano);

     colorArr = this.buildPixels(115,201,17,14)
     const rose = this.createObj([105,193,17,14,115,201,17,14], 'rose', 292, colorArr);
     emojis.push(rose);

     colorArr = this.buildPixels(132,201,17,14)
     const drumb_stick = this.createObj([122,193,17,14,132,201,17,14], 'drumbstick', 293, colorArr);
     emojis.push(drumb_stick);

     colorArr = this.buildPixels(148,201,17,14)
     const hot_soup2 = this.createObj([138,192,17,14,148,201,17,14], 'hot soup2', 294, colorArr);
     emojis.push(hot_soup2);

     colorArr = this.buildPixels(165,201,17,15)
     const rollercoaster = this.createObj([155,193,17,15,165,201,17,15], 'rollercoaster', 295, colorArr);
     emojis.push(rollercoaster);

     colorArr = this.buildPixels(182,201,17,15)
     const basketball = this.createObj([172,191,17,15,182,201,17,15], 'basketball', 296, colorArr);
     emojis.push(basketball);

     colorArr = this.buildPixels(199,201,17,15)
     const black_cow = this.createObj([189,193,17,15,199,201,17,15], 'black cow', 297, colorArr);
     emojis.push(black_cow);

     colorArr = this.buildPixels(216,201,17,15)
     const puffer_fish = this.createObj([204,193,17,15,216,201,17,15], 'puffer fish', 298, colorArr);
     emojis.push(puffer_fish);

     colorArr = this.buildPixels(233,201,17,14)
     const googly = this.createObj([221,193,17,14,233,201,17,14], 'googly eyes', 299, colorArr);
     emojis.push(googly);

     colorArr = this.buildPixels(260,201,17,15)
     const sneaker = this.createObj([238,192,17,15,260,201,17,15], 'sneaker', 300, colorArr);
     emojis.push(sneaker);

     colorArr = this.buildPixels(277,201,17,15)
     const purple_alien = this.createObj([255,191,17,15,277,201,17,15], 'purple alien', 301, colorArr);
     emojis.push(purple_alien);

     colorArr = this.buildPixels(294,201,17,15)
     const yellow_heart = this.createObj([270,191,17,15,294,201,17,15], 'yellow heart', 302, colorArr);
     emojis.push(yellow_heart);

     colorArr = this.buildPixels(311,201,17,15)
     const weird_chinese = this.createObj([287,191,17,15,311,201,17,15], 'weird chinese', 303, colorArr);
     emojis.push(weird_chinese);

     colorArr = this.buildPixels(328,201,17,15)
     const grey_notebook = this.createObj([304,191,17,15,328,201,17,15], 'grey notebook', 304, colorArr);
     emojis.push(grey_notebook);

     colorArr = this.buildPixels(341,201,17,15)
     const phone_banned = this.createObj([21,191,17,15,341,201,17,15], 'phone banned', 305, colorArr);
     emojis.push(phone_banned);

     colorArr = this.buildPixels(360,201,17,15)
     const paper_clip2 = this.createObj([337,191,17,15,360,201,17,15], 'paper clip2', 306, colorArr);
     emojis.push(phone_banned);

     colorArr = this.buildPixels(380,202,17,16)
     const blue_circle = this.createObj([353,190,17,16,380,202,17,16], 'blue circle', 307, colorArr);
     emojis.push(blue_circle);

     colorArr = this.buildPixels(401,202,17,16)
     const clock11 = this.createObj([371,190,17,16,401,202,17,16], 'clock11', 308, colorArr);
     emojis.push(clock11);

     colorArr = this.buildPixels(420,202,17,16)
     const emoji_angry= this.createObj([387,190,17,16,420,202,17,16], 'emoji angry', 309, colorArr);
     emojis.push(emoji_angry);

     colorArr = this.buildPixels(438,202,17,16)
     const emoji_sleep= this.createObj([403,190,17,16,438,202,17,16], 'emoji sleep', 310, colorArr);
     emojis.push(emoji_sleep);

     colorArr = this.buildPixels(458,202,16,16)
     const airplane_front2= this.createObj([420,190,16,16,458,202,16,16], 'airplane front2', 311, colorArr);
     emojis.push(airplane_front2);

     colorArr = this.buildPixels(477,202,19,16)
     const race_boat= this.createObj([435,190,19,16,477,202,19,16], 'race boat', 312, colorArr);
     emojis.push(race_boat);

     colorArr = this.buildPixels(495,202,19,16)
     const crossing_guard = this.createObj([453,190,19,16,495,202,19,16], 'crossing guard', 313, colorArr);
     emojis.push(crossing_guard);

     //twelth row

     colorArr = this.buildPixels(10,218,17,14)
     const arrow_down_left = this.createObj([6,210,17,14,10,218,17,14], 'arrow down left', 314, colorArr);
     emojis.push(arrow_down_left);

     colorArr = this.buildPixels(28,218,17,14)
     const weird_symbol = this.createObj([22,209,17,14,28,218,17,14], 'weird symbol2', 315, colorArr);
     emojis.push(weird_symbol);

     colorArr = this.buildPixels(46,218,17,14)
     const golf_put = this.createObj([39,209,17,14,46,218,17,14], 'golf put', 316, colorArr);
     emojis.push(golf_put);

     colorArr = this.buildPixels(64,218,17,14)
     const arrow_right = this.createObj([56,209,17,14,64,218,17,14], 'arrow right', 317, colorArr);
     emojis.push(arrow_right);

     colorArr = this.buildPixels(80,218,17,14)
     const SOS = this.createObj([72,209,17,14,80,218,17,14], 'SOS', 318, colorArr);
     emojis.push(SOS);

     colorArr = this.buildPixels(97,218,17,14)
     const twilight3 = this.createObj([89,209,17,14,97,218,17,14], 'twilight3', 319, colorArr);
     emojis.push(twilight3);

     colorArr = this.buildPixels(115,218,17,15)
     const blossom = this.createObj([105,207,17,15,115,218,17,15], 'blossom', 320, colorArr);
     emojis.push(blossom);

     colorArr = this.buildPixels(132,218,17,15)
     const black_square = this.createObj([122,207,17,15,132,218,17,15], 'black square circle', 321, colorArr);
     emojis.push(black_square);

     colorArr = this.buildPixels(148,218,17,15)
     const vases = this.createObj([138,207,17,15,148,218,17,15], 'vases', 322, colorArr);
     emojis.push(vases);

     colorArr = this.buildPixels(165,218,17,15)
     const fish_hook = this.createObj([155,207,17,15,165,218,17,15], 'fish hook', 323, colorArr);
     emojis.push(fish_hook);

     colorArr = this.buildPixels(182,218,17,15)
     const race_flag = this.createObj([172,207,17,15,182,218,17,15], 'race flag', 324, colorArr);
     emojis.push(race_flag);

     colorArr = this.buildPixels(199,218,17,15)
     const milk_cow = this.createObj([189,207,17,15,199,218,17,15], 'milk cow', 325, colorArr);
     emojis.push(milk_cow);

     colorArr = this.buildPixels(216,218,17,15)
     const turtle = this.createObj([206,207,17,15,216,218,17,15], 'turtle', 326, colorArr);
     emojis.push(turtle);

     colorArr = this.buildPixels(233,218,17,15)
     const ear = this.createObj([220,207,17,15,233,218,17,15], 'ear', 327, colorArr);
     emojis.push(ear);

     colorArr = this.buildPixels(260,218,17,15)
     const high_heel = this.createObj([238,207,17,15,260,218,17,15], 'high heel', 328, colorArr);
     emojis.push(high_heel);


     colorArr = this.buildPixels(277,218,17,15)
     const arcade_alien = this.createObj([255,207,17,15,277,218,17,15], 'arcade alien', 329, colorArr);
     emojis.push(arcade_alien);

     colorArr = this.buildPixels(294,218,17,15)
     const purple_heart = this.createObj([271,207,17,15,294,218,17,15], 'purple heart', 330, colorArr);
     emojis.push(purple_heart);

     colorArr = this.buildPixels(311,218,17,15)
     const chair = this.createObj([287,207,17,15,311,218,17,15], 'chair', 331, colorArr);
     emojis.push(chair);

     colorArr = this.buildPixels(328,218,17,15)
     const purple_notebook = this.createObj([304,207,17,15,328,218,17,15], 'purple notebook', 332, colorArr);
     emojis.push(purple_notebook);

     colorArr = this.buildPixels(342,218,17,15)
     const chart = this.createObj([321,207,17,15,342,218,17,15], 'chart', 333, colorArr);
     emojis.push(chart);

     colorArr = this.buildPixels(360,218,17,16)
     const circle_filled = this.createObj([338,207,17,16,360,218,17,16], 'circle filled', 334, colorArr);
     emojis.push(circle_filled);

     colorArr = this.buildPixels(380,218,17,16)
     const yellow_diamond = this.createObj([353,205,17,16,380,218,17,16], 'yellow diamind', 335, colorArr);
     emojis.push(yellow_diamond);

     colorArr = this.buildPixels(401,218,17,18)
     const clock12 = this.createObj([371,205,17,18,401,218,17,18], 'clock12', 336, colorArr);
     emojis.push(yellow_diamond);

     colorArr = this.buildPixels(420,218,17,18)
     const emoji_kiss = this.createObj([387,205,17,18,420,218,17,18], 'emoji kiss', 337, colorArr);
     emojis.push(emoji_kiss);

     colorArr = this.buildPixels(438,218,17,18)
     const emoji_X2 = this.createObj([403,205,17,18,438,218,17,18], 'emoji X2', 338, colorArr);
     emojis.push(emoji_X2);

     
     colorArr = this.buildPixels(458,218,17,18)
     const train_sign = this.createObj([420,205,17,18,458,218,17,18], 'train sign', 339, colorArr);
     emojis.push(train_sign);

     colorArr = this.buildPixels(477,218,17,18)
     const tree_dots = this.createObj([436,205,17,18,477,218,17,18], 'tree dots', 340, colorArr);
     emojis.push(tree_dots);

     colorArr = this.buildPixels(493,218,17,18)
     const crossing_guard2 = this.createObj([453,205,17,18,493,218,17,18], 'crossing guard2', 341, colorArr);
     emojis.push(crossing_guard2);

    //thirtenth row

    colorArr = this.buildPixels(10,235,17,14)
    const arrow_curve_sign = this.createObj([ 6,226,17,14,10,235,17,14], 'arrow curve sign', 342, colorArr);
    emojis.push(arrow_curve_sign);

    colorArr = this.buildPixels(28,235,17,14)
    const weird_symbol3 = this.createObj([22,226,17,14,28,235,17,14], 'weird symbol3', 343, colorArr);
    emojis.push(weird_symbol3);

    colorArr = this.buildPixels(46,235,17,15)
    const sailboat = this.createObj([39,226,17,15,46,235,17,15], 'sailboat', 344, colorArr);
    emojis.push(sailboat);

    
    colorArr = this.buildPixels(64,235,17,15)
    const weird_symbol4 = this.createObj([56,226,17,15,64,235,17,15], 'weird symbol4', 345, colorArr);
    emojis.push(weird_symbol4);

    colorArr = this.buildPixels(80,235,17,16)
    const up_sign = this.createObj([73,225,16,15,80,235,17,16], 'up sign', 346, colorArr);
    emojis.push(up_sign);

    colorArr = this.buildPixels(99,235,17,16)
    const earth = this.createObj([ 89,224,16,16,99,235,17,16], 'earth', 347, colorArr);
    emojis.push(earth);

    colorArr = this.buildPixels(116,235,17,16)
    const sunflower = this.createObj([106,224,16,16,116,235,17,16], 'sunflower', 348, colorArr);
    emojis.push(sunflower);

    colorArr = this.buildPixels(133,235,17,16)
    const weird_mound = this.createObj([123,224,16,16,133,235,17,16], 'weird mound', 349, colorArr);
    emojis.push(weird_mound);

    colorArr = this.buildPixels(148,235,17,16)
    const wine_glass = this.createObj([137,223,16,16,148,235,17,16], 'wine glass', 350, colorArr);
    emojis.push(wine_glass);

    colorArr = this.buildPixels(165,235,17,16)
    const microphone = this.createObj([155,223,16,16,165,235,17,16], 'microphone', 351, colorArr);
    emojis.push(microphone);

    colorArr = this.buildPixels(182,235,17,16)
    const snowboarder = this.createObj([172,223,16,16,182,235,17,16], 'snowboarder', 352, colorArr);
    emojis.push(snowboarder);

    colorArr = this.buildPixels(199,235,17,16)
    const puggy_cow = this.createObj([189,223,16,16,199,235,17,16], 'puggy cow', 353, colorArr);
    emojis.push(puggy_cow);

    colorArr = this.buildPixels(216,235,17,16)
    const chick = this.createObj([206,223,16,16,216,235,17,16], 'chick', 354, colorArr);
    emojis.push(chick);
    
    colorArr = this.buildPixels(233,235,17,16)
    const nose = this.createObj([223,223,16,16,233,235,17,16], 'nose', 355, colorArr);
    emojis.push(nose);

    
    colorArr = this.buildPixels(260,235,17,16)
    const high_heel2 = this.createObj([236,223,16,16,260,235,17,16], 'high heel2', 356, colorArr);
    emojis.push(high_heel2)

    colorArr = this.buildPixels(277,235,17,16)
    const purple_devil = this.createObj([255,223,16,16,277,235,17,16], 'purple devil', 357, colorArr);
    emojis.push(purple_devil)

    colorArr = this.buildPixels(294,235,17,16)
    const bow_heart = this.createObj([270,223,16,16,294,235,17,16], 'bow heart', 358, colorArr);
    emojis.push(bow_heart)

    colorArr = this.buildPixels(311,235,17,16)
    const monitor = this.createObj([287,223,16,16,311,235,17,16], 'monitor', 359, colorArr);
    emojis.push(monitor)

    colorArr = this.buildPixels(328,235,17,16)
    const orange_book = this.createObj([304,223,16,16,328,235,17,16], 'orange notebook', 360, colorArr);
    emojis.push(orange_book);

    colorArr = this.buildPixels(341,235,17,16)
    const camera = this.createObj([321,223,16,16,341,235,17,16], 'camera', 361, colorArr);
    emojis.push(camera);

    colorArr = this.buildPixels(360,235,17,16)
    const back_arrow = this.createObj([338,223,16,16,360,235,17,16], 'back arrow', 362, colorArr);
    emojis.push(back_arrow);

    colorArr = this.buildPixels(380,235,17,16)
    const blue_diamond = this.createObj([353,223,16,16,380,235,17,16], 'blue diamond', 363, colorArr);
    emojis.push(blue_diamond);

    colorArr = this.buildPixels(401,235,17,16)
    const clock13 = this.createObj([371,223,16,16,401,235,17,16], 'clock13', 364, colorArr);
    emojis.push(clock13);

    colorArr = this.buildPixels(420,235,17,16)
    const emoji_kiss_heart = this.createObj([388,223,16,16,420,235,17,16], 'emoji kiss heart', 365, colorArr);
    emojis.push(emoji_kiss_heart);

    colorArr = this.buildPixels(438,235,17,16)
    const emoji_mum = this.createObj([403,223,16,16,438,235,17,16], 'emoji mum', 366, colorArr);
    emojis.push(emoji_mum);

    colorArr = this.buildPixels(458,235,17,16)
    const train_front = this.createObj([420,223,16,16,458,235,17,16], 'train front', 367, colorArr);
    emojis.push(train_front);

    colorArr = this.buildPixels(477,235,17,16)
    const three_dots_vertical = this.createObj([437,223,16,16,477,235,17,16], 'three dots vertical', 368, colorArr);
    emojis.push(three_dots_vertical);


    colorArr = this.buildPixels(491,235,17,16)
    const luggage_sign = this.createObj([453,223,16,16,491,235,17,16], 'luggage sign', 369, colorArr);
    emojis.push(luggage_sign);

    //fourteenth row
    colorArr = this.buildPixels(10,252,17,14)
    const arrow_curve_right = this.createObj([6,243,17,14,10,252,17,14], 'arrow curve right', 370, colorArr);
    emojis.push(arrow_curve_right);

    colorArr = this.buildPixels(28,252,17,14)
    const weird_symbol4_1 = this.createObj([22,243,17,14,28,252,17,14], 'weird symbol4', 371, colorArr);
    emojis.push(weird_symbol4_1);

    colorArr = this.buildPixels(46,252,17,14)
    const tent = this.createObj([39,243,17,14,46,252,17,14], 'tent', 372, colorArr);
    emojis.push(tent);

    colorArr = this.buildPixels(64,252,17,14)
    const double_weird = this.createObj([56,243,17,14,64,252,17,14], 'double weird', 373, colorArr);
    emojis.push(double_weird);

    colorArr = this.buildPixels(80,252,17,14)
    const vs_sign = this.createObj([72,243,17,14,80,252,17,14], 'vs sign', 374, colorArr);
    emojis.push(vs_sign);

    colorArr = this.buildPixels(99,252,17,15)
    const earth_2 = this.createObj([89,241,17,15,99,252,17,15], 'earth 2', 375, colorArr);
    emojis.push(earth_2);
    
    colorArr = this.buildPixels(116,252,17,15)
    const sunflower2 = this.createObj([106,241,17,15,116,252,17,15], 'sunflower2', 376, colorArr);
    emojis.push(sunflower2);

    colorArr = this.buildPixels(131,252,17,15)
    const icecream_bowl= this.createObj([123,241,17,15,131,252,17,15], 'icecream bowl', 377, colorArr);
    emojis.push(icecream_bowl);

    colorArr = this.buildPixels(148,252,17,15)
    const martini= this.createObj([138,241,17,15,148,252,17,15], 'martini', 378, colorArr);
    emojis.push(martini);

    colorArr = this.buildPixels(165,252,17,15)
    const videocamera= this.createObj([155,241,17,15,165,252,17,15], 'videocamera', 379, colorArr);
    emojis.push(videocamera);

    colorArr = this.buildPixels(182,252,17,15)
    const man_running= this.createObj([172,241,17,15,182,252,17,15], 'man running', 380, colorArr);
    emojis.push(man_running);

    colorArr = this.buildPixels(199,252,17,15)
    const puggy_cow2 = this.createObj([189,241,17,15,199,252,17,15], 'puggy cow2', 381, colorArr);
    emojis.push(puggy_cow2);

    colorArr = this.buildPixels(216,252,17,15)
    const chick2 = this.createObj([205,241,17,15,216,252,17,15], 'chick2', 382, colorArr);
    emojis.push(chick2);

    colorArr = this.buildPixels(233,252,17,15)
    const mouth = this.createObj([223,241,17,15,233,252,17,15], 'mouth', 383, colorArr);
    emojis.push(mouth);

    colorArr = this.buildPixels(260,252,17,15)
    const boots = this.createObj([238,241,17,15,260,252,17,15], 'boots', 384, colorArr);
    emojis.push(boots);

    colorArr = this.buildPixels(277,252,17,15)
    const skull = this.createObj([255,241,17,15,277,252,17,15], 'skull', 385, colorArr);
    emojis.push(skull);

    colorArr = this.buildPixels(294,252,17,15)
    const two_pink = this.createObj([270,241,17,15,294,252,17,15], 'two pink hearts', 386, colorArr);
    emojis.push(two_pink);


    colorArr = this.buildPixels(311,252,17,15)
    const black_attache = this.createObj([287,241,17,15,311,252,17,15], 'black attache', 387, colorArr);
    emojis.push(black_attache);

    colorArr = this.buildPixels(328,252,17,15)
    const notebook_stack = this.createObj([304,241,17,15,328,252,17,15], 'notebook stack', 388, colorArr);
    emojis.push(notebook_stack);

    colorArr = this.buildPixels(341,252,17,15)
    const handheld = this.createObj([320,241,17,15,341,252,17,15], 'handheld camera', 389, colorArr);
    emojis.push(handheld);

    colorArr = this.buildPixels(360,252,17,15)
    const end = this.createObj([338,241,17,15,360,252,17,15], 'end arrow', 390, colorArr);
    emojis.push(end);

    colorArr = this.buildPixels(380,252,17,15)
    const little_orange = this.createObj([353,241,17,15,380,252,17,15], 'little orange diamond', 391, colorArr);
    emojis.push(little_orange);

    colorArr = this.buildPixels(401,252,17,15)
    const mountain_pic = this.createObj([371,241,17,15,401,252,17,15], 'mountain pic', 392, colorArr);
    emojis.push(mountain_pic);

    colorArr = this.buildPixels(420,252,17,15)
    const emoji_kiss2 = this.createObj([387,241,17,15,420,252,17,15], 'emoji kiss2', 393, colorArr);
    emojis.push(emoji_kiss2);

    colorArr = this.buildPixels(438,252,17,15)
    const emoji_hush = this.createObj([403,241,17,15,438,252,17,15], 'emoji hush', 394, colorArr);
    emojis.push(emoji_hush);

    
    colorArr = this.buildPixels(458,252,17,15)
    const train_headon = this.createObj([420,241,17,15,458,252,17,15], 'train headon', 395, colorArr);
    emojis.push(train_headon);

    colorArr = this.buildPixels(477,252,17,15)
    const blockade = this.createObj([436,241,17,15,477,252,17,15], 'blockade', 396, colorArr);
    emojis.push(blockade);

    colorArr = this.buildPixels(493,252,17,15)
    const key_sign = this.createObj([453,241,17,15,493,252,17,15], 'key sign', 397, colorArr);
    emojis.push(key_sign);

    //fifteenth row
    colorArr = this.buildPixels(10,269,17,15)
    const stopwatch = this.createObj([6,257,17,15,10,269,17,15], 'stopwatch', 398, colorArr);
    emojis.push(stopwatch);

    colorArr = this.buildPixels(28,269,17,15)
    const weird_symbol5 = this.createObj([22,257,17,15,28,269,17,15], 'weird symbol5', 399, colorArr);
    emojis.push(weird_symbol5);

    colorArr = this.buildPixels(46,269,17,15)
    const gas_station = this.createObj([39,257,17,15,46,269,17,15], 'gas station', 400, colorArr);
    emojis.push(gas_station);

    colorArr = this.buildPixels(64,269,17,15)
    const arrow_curve_up = this.createObj([56,257,17,15,64,269,17,15], 'arrow curve up', 401, colorArr);
    emojis.push(arrow_curve_up);

    colorArr = this.buildPixels(80,269,17,15)
    const hebrew_symbol = this.createObj([72,257,17,15,80,269,17,15], 'hebrew symbol', 402, colorArr);
    emojis.push(hebrew_symbol);

    colorArr = this.buildPixels(99,269,17,16)
    const earth_3 = this.createObj([89,257,17,16,99,269,17,16], 'earth 3', 403, colorArr);
    emojis.push(earth_3);

    colorArr = this.buildPixels(115,269,17,16)
    const banana = this.createObj([106,257,17,16,115,269,17,16], 'banana', 404, colorArr);
    emojis.push(banana);

    colorArr = this.buildPixels(131,269,17,16)
    const weird_dish = this.createObj([124,257,17,16,131,269,17,16], 'weird dish', 405, colorArr);
    emojis.push(weird_dish);

    colorArr = this.buildPixels(148,269,17,16)
    const margarita = this.createObj([137,257,17,16,148,269,17,16], 'margarita', 406, colorArr);
    emojis.push(margarita);

    colorArr = this.buildPixels(165,269,17,16)
    const videocamera_sign = this.createObj([155,257,17,16,165,269,17,16], 'videocamera sign', 407, colorArr);
    emojis.push(videocamera_sign);

    colorArr = this.buildPixels(182,269,17,16)
    const surfer = this.createObj([172,257,17,16,182,269,17,16], 'surfer', 408, colorArr);
    emojis.push(surfer);

    colorArr = this.buildPixels(199,269,17,16)
    const white_bunny = this.createObj([189,257,17,16,199,269,17,16], 'white bunny', 409, colorArr);
    emojis.push(white_bunny);

    colorArr = this.buildPixels(216,269,17,16)
    const chick3 = this.createObj([205,257,17,16,216,269,17,16], 'chick3', 410, colorArr);
    emojis.push(chick3);

    colorArr = this.buildPixels(233,269,17,16)
    const tongue_out = this.createObj([223,257,17,16,233,269,17,16], 'tongue out', 411, colorArr);
    emojis.push(tongue_out);

    colorArr = this.buildPixels(260,269,17,16)
    const footprints = this.createObj([238,257,17,16,260,269,17,16], 'footprints', 412, colorArr);
    emojis.push(footprints);

    colorArr = this.buildPixels(277,269,17,16)
    const bland_girl = this.createObj([254,257,17,16,277,269,17,16], 'bland girl', 413, colorArr);
    emojis.push(bland_girl);

    colorArr = this.buildPixels(294,269,17,16)
    const heart_sign = this.createObj([270,257,17,16,294,269,17,16], 'heart sign', 414, colorArr);
    emojis.push(heart_sign);

    colorArr = this.buildPixels(311,269,17,16)
    const cd = this.createObj([287,257,17,16,311,269,17,16], 'CD record', 415, colorArr);
    emojis.push(cd);

    colorArr = this.buildPixels(328,269,17,16)
    const head = this.createObj([304,257,17,16,328,269,17,16], 'head spikes', 416, colorArr);
    emojis.push(head);

    colorArr = this.buildPixels(341,269,17,16)
    const old_tv = this.createObj([321,257,17,16,341,269,17,16], 'old TV', 417, colorArr);
    emojis.push(old_tv);

    colorArr = this.buildPixels(360,269,17,16)
    const bidirectional = this.createObj([338,257,17,16,360,269,17,16], 'bidirectional ON', 418, colorArr);
    emojis.push(bidirectional);

    colorArr = this.buildPixels(380,269,17,16)
    const blue_diamond2 = this.createObj([353,257,17,16,380,269,17,16], 'little blue diamond', 419, colorArr);
    emojis.push(blue_diamond2);

    colorArr = this.buildPixels(401,269,17,16)
    const tower2 = this.createObj([371,257,17,16,401,269,17,16], 'tower2', 420, colorArr);
    emojis.push(tower2);

    colorArr = this.buildPixels(420,269,17,16)
    const emoji_kiss_blush = this.createObj([388,257,17,16,420,269,17,16], 'emoji kiss blush', 421, colorArr);
    emojis.push(emoji_kiss_blush);

    colorArr = this.buildPixels(438,269,17,16)
    const emoji_cat = this.createObj([403,257,17,16,438,269,17,16], 'emoji cat', 422, colorArr);
    emojis.push(emoji_cat);

    colorArr = this.buildPixels(458,269,17,16)
    const train_headon2 = this.createObj([420,257,17,16,458,269,17,16], 'train headon2', 423, colorArr);
    emojis.push(train_headon2);

    colorArr = this.buildPixels(477,269,17,16)
    const buzzer = this.createObj([436,257,17,16,477,269,17,16], 'buzzer', 424, colorArr);
    emojis.push(buzzer);

    colorArr = this.buildPixels(493,269,17,16)
    const pound_sign = this.createObj([453,257,17,16,493,269,17,16], 'pound sign', 425, colorArr);
    emojis.push(pound_sign);

        console.log('Emoji Object => ', emojis);
        this.allEmojis = [...emojis]
    //this.postData(emojis);

  }
  getRandomArbitrary(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }
  private buildPixels(startX: number, startY:number, width: number, height: number): string[] {
    let colorCollection: string[] = [];

    for(let i=0; i < width; i++) {
      const rangeX = this.getRandomArbitrary(1, width);
      const rangeY = this.getRandomArbitrary(1, height);
      const posX = startX + rangeX;
      const posY = startY + rangeY;
      if(this.context) {
        const pixel = this.context.getImageData(posX, posY, 1, 1);
        const data = pixel.data;
        const rgba = `${data[0]}, ${data[1]}, ${data[2]}`;
        if((data[0] > 250 && data[1] > 250 && data[2] > 250) || colorCollection.includes(rgba)) {
          continue;
        }
       
        colorCollection.push(rgba);
        //console.log('Random Number => ', rangeX, rangeY, 'Colors => ',  rgba)
      }
    
    }
    return colorCollection;
    
  }
  updateEmoji(eventVal?:any[] | undefined):void {
    //debugger;
    this.formEmoji = eventVal;
  }
  public formatLastYearISODate(value: string | any[] = []): string {
    let date = moment(value).add(-365, 'd');

    if (date.isValid()) {

      return this.convertMomentToDateStr(date);
    }

    return '';
  }
  private convertMomentToDateStr(date: moment.Moment) {

    return date.format('YYYY-MM-DD');
  }
  private postData(): void {
    //const data = { username: 'example' };

    fetch('http://localhost:47503/api/emoji', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.allEmojis),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  private createObj(positions:number[], name: string, id:number, pixels:string[]): any {
    return {
      Positions: positions,
      Name: name,
      ID:id,
      Pixels: pixels //2D
    }
  }
  ngOnDestroy(): void {
   if(this.dataSub) {
     this.dataSub.unsubscribe();
   }
  }
  
}