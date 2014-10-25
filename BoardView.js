"use strict";

(function (game) {
  var TileView = function(row, col, parent ){
    parent = parent || document.body;
    this.row = row;
    this.col = col;
    this.ele = document.createElement('div');
    this.ele.className = 'tile';
    var text = document.createTextNode('');
    this.ele.appendChild(text);
    this.registerEvents();

    parent.appendChild(this.ele);
    
  };

  TileView.prototype.registerEvents = function(){
    this.ele.onclick = (function(tile){
      return function(){
        var player = game.currentPlayer;
        if(game.togglePiece(tile.row, tile.col)){
          tile.toggle(player);
        }
      }
    }(this));
  }

  //expects player to be 0 or 1
  TileView.prototype.toggle = function(player){
    this.ele.innerHTML = player ? 'O' : 'X'; 
  }


  var BoardView = function(){
    this.container = document.createElement('div');
    this.container.className = 'game-board';
    document.body.appendChild(this.container);
    this.tileVisuals = null;
    this.registerEvents()
    this.initialize();
  }

  BoardView.prototype.registerEvents = function(){
    addEventSupport(this);

    this.on('win', function(gameView){
        return function(){
          var player = game.currentPlayer;
          gameView.showMessage('Player '+(player+1)+' wins.')
        }
    }(this));

    this.on('tie', function(gameView){
        return function(){
            gameView.showMessage("It's a cat's game!")
        }
    }(this));

    this.on('new_game', function(gameView){
        return function(){
            gameView.resetTiles();
            gameView.showMessage("Tic Tac Toe");
        }
    }(this));
  }

  BoardView.prototype.showMessage = function(message){
    var el = document.getElementById('title');
          if(el) {
            el.innerHTML = message;
          }
  }

  BoardView.prototype.resetTiles = function(){
    for(var row=0; row<3; row++){
          for(var col=0; col<3; col++){
              this.tileVisuals[row][col].ele.innerHTML = "";
          }
    }
  };

  BoardView.prototype.initialize = function(){
    this.tileVisuals = [];
    for(var row=0; row<3; row++){
          this.tileVisuals.push([]);
          for(var col=0; col<3; col++){
              this.tileVisuals[row].push(new TileView(row,col, this.container));
          }
          this.tileVisuals[row][0].ele.className += " firstTile";
    }
  }

  new BoardView();

}(new TicTacToe()));