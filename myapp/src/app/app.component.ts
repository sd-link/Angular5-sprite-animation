import { Component } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  stage = null;
  rocketSprite= null;

  spriteData = {
    "rocket":{
        "framerate": 25,
        "images": [
          "assets/img/rocket.png" 
        ],
        "frames": {"regX": 0, "height": 400, "count": 32, "regY": 0, "width": 400},
        "animations": {
          "start": [0, 33, "start", 1] ,      
        }
    }
  }
 
  ngOnInit() { 
    this.playNow(); 
  }
  playNow() {
    this.stage = new createjs.Stage(document.getElementById('rocket'));
    
    var spriteSheet = new createjs.SpriteSheet(this.spriteData['rocket']);
    
    spriteSheet.on("complete", function(event) {
      console.log("Complete->", event);
    });
    spriteSheet.on("error", function(event) {
      console.log("Error->", event);
    });

    this.rocketSprite = new createjs.Sprite(spriteSheet,"start");
    console.log(this.rocketSprite)
    this.rocketSprite.x = 0;//this.stage.canvas.width / 2;
    this.rocketSprite.y = 0;
    // this.rocketSprite.shadow = new createjs.Shadow("#26232E", -5, -10, 30);
    document.getElementById("rocket").style.height=this.spriteData['rocket']['height'];
    document.getElementById("rocket").style.width=this.spriteData['rocket']['width'];
    this.stage.addChild(this.rocketSprite);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.stage);

    this.rocketSprite.on("tick", function(event) {
        //console.log("Frame", event.currentTarget.currentFrame);
    });


  }
}
