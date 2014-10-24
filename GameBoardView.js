"user strict";

(function (game) {
  var UI_Tile = function(row, col){
    this.row = row;
    this.col = col;
    this.ele = document.createElement('div');
    this.ele.className = 'tile';
    this.ele.onclick = (function(curRow, curCol){
      return function(){
        console.log(curRow +","+curCol+ " was clicked.");
      }
    }(this.row, this.col));

    document.body.appendChild(this.ele);
    
  };

  var UI_Board = function(){
    this.tilesVisuals = null;
    this.model = game;
    this.initialize();
  }

  UI_Board.prototype.initialize = function(){
    this.tileVisuals = [];
    for(var row=0; row<3; row++){
          this.tileVisuals.push([]);
          for(var col=0; col<3; col++){
              this.tileVisuals[row].push(new UI_Tile(row,col));
          }
          this.tileVisuals[row][0].ele.className += " firstTile";
    }
  }

  new UI_Board();

}(new GameBoard()));