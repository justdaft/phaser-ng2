/// <reference path="../../../typings/tsd.d.ts" />

import {Component} from 'angular2/core';

import {phaser} from 'phaser';


@Component({
  selector: 'greeting',
  templateUrl: 'app/greeting/greeting.html',
  styleUrls: ['app/greeting/greeting.css'],
})
export default class Greeting  {
  greeting = 'Hello World';
  game: any;
  constructor() {

    this.game = new SimpleGame();

  }
}

class SimpleGame {
  tileGrid: any;
  activeTile1: any;
  activeTile2: any;
  score: number;
  tileLetters: any;
  tileColors: any;
  tileWidth: number = 150;
  tileHeight: number = 150;
  addTile: any;
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;

    preload() {
        // this.game.load.image('logo', 'part5.png');
    }

    initTiles () {
      let me = this;

      // loop through each column in the grid
      for ( let i = 0; i < me.tileGrid.length; i++) {

          // loop through each position in a specific column, starting from the top
          for ( let j = 0; j < me.tileGrid.length; j++) {

          // add the tile to the game at this grid position
          let tile = me.addTile(i, j);

          // keep a track of the tiles position in our tileGrid
          me.tileGrid[i][j] = tile;
        }
      }
    };

    addTile (x, y) {
      let me = this;

      // choose a random tile to add
      let tileLetter = me.tileLetters[me.random.integerInRange(0, me.tileLetters.length - 1)];
      let tileColor = me.tileColors[me.random.integerInRange(0, me.tileColors.length - 1)];
      let tileToAdd = me.createTile(tileLetter, tileColor);

      // add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
      let tile = me.tiles.create(me.leftBuffer + (x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);

      // animate the tile into the correct vertical position
      me.game.add.tween(tile).to({y:me.topBuffer + (y*me.tileHeight+(me.tileHeight/2))}, 500, Phaser.Easing.Linear.In, true)

      // set the tiles anchor point to the center
      tile.anchor.setTo(0.5, 0.5);

      // keep track of the type of tile that was added
      tile.tileLetter = tileLetter;

      return tile;
};

createTile ( letter: any, color: any) {
  let me = this;
  let tile = me.game.add.bitmapData(me.tileWidth, me.tileHeight);

  tile.ctx.rect(5, 5, me.tileWidth - 5, me.tileHeight - 5);
  tile.ctx.fillStyle = color;
  tile.ctx.fill();

  tile.ctx.font = '30px Arial';
  tile.ctx.textAlign = 'center';
  tile.ctx.textBaseline = 'middle';
  tile.ctx.fillStyle = '#fff';
  if ( color === '#ffffff') {
    tile.ctx.fillStyle = '#000000';
  }
  tile.ctx.fillText(letter, me.tileWidth / 2, me.tileHeight / 2);
  return tile;
};


    create() {
        let me = this;
        // let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        // logo.anchor.setTo(0.5, 0.5);
        this.tileGrid  = [
          [null, null, null, null, null, null, null, 1],
          [null, null, null, null, null, null, null, 0],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
        ];
        this.tileLetters = [
          'a', 'b', 'c', 'd', 'e', 'f',
          'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
          'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        ];
        console.log(this.tileLetters);
        this.tileColors = [
          '#ffffff'
        ];


        me.boardWidth = me.tileGrid[0].length * me.tileWidth;
        me.boardHeight = me.tileGrid.length  * me.tileHeight;

        //We want to keep a buffer on the left and top so that the grid
        //can be centered
        me.leftBuffer = (me.game.width - me.boardWidth) / 2;
        me.topBuffer = (me.game.height - me.boardHeight) / 2;
        this.score = 0;
        this.activeTile1 = null;
        this.activeTile2 = null;

        console.log(this.tileGrid);

        this.game.stage.backgroundColor = "34495f";
        this.initTiles();

        this.game.state.start("Main");
    }

}
