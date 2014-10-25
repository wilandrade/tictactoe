"use strict";

(function (game) {
  var UI_Tile = function(row, col, parent ){
    parent = parent || document.body;
    this.row = row;
    this.col = col;
    this.ele = document.createElement('div');
    this.ele.className = 'tile';
    var text = document.createTextNode('');
    this.ele.appendChild(text);
    this.ele.onclick = (function(tile){
      return function(){
        var player = game.currentPlayer;
        if(game.togglePiece(tile.row, tile.col)){
          tile.toggle(player);
        }
      }
    }(this));

    parent.appendChild(this.ele);
    
  };

  UI_Tile.prototype.toggle = function(player){
    console.log(this.row +","+this.col+ " was clicked by "+ player);
    this.ele.innerHTML = player ? 'X' : 'O'; //player is always 0 or 1
  }

  var UI_Board = function(){
    this.container = document.createElement('div');
    this.container.className = 'game-board';
    document.body.appendChild(this.container);
    this.tilesVisuals = null;
    this.model = game;
    this.initialize();
  }

  UI_Board.prototype.initialize = function(){
    this.tileVisuals = [];
    for(var row=0; row<3; row++){
          this.tileVisuals.push([]);
          for(var col=0; col<3; col++){
              this.tileVisuals[row].push(new UI_Tile(row,col, this.container));
          }
          this.tileVisuals[row][0].ele.className += " firstTile";
    }
  }

  new UI_Board();

}(new GameBoard()));