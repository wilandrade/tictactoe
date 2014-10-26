"use strict";
//Game view is responsible for rendering the game.
//It should not know about the rules of the game or do any logic that is
//not related to rendering the UI.
(function (game) {

  //TileView is the class responsible for defining each tile
  //in the TicTacToe view.
  var TileView = function(row, col, parent ){
    parent = parent || document.body; //parent container to which tile will be added

    //row and column that tile is in
    this.row = row;
    this.col = col;

    //Create DOM node and apply CSS class.
    this.ele = document.createElement('div');
    this.ele.className = 'tile';

    //Register events that tile should watch for
    this.registerEvents();

    //Append node to parent.
    parent.appendChild(this.ele);
    
  };

  //Register the events to which this Tile should watch for.
  TileView.prototype.registerEvents = function(){

    //When user clicks on this tile, it should toggle that user's mark
    //on, unless it is already taken.
    this.ele.onclick = (function(tile){
      return function(){
        var player = game.currentPlayer; //keep track of current player when tile is clicked.
        if(game.togglePiece(tile.row, tile.col)){ //if game allowed toggle
          tile.toggle(player); //toggle the tile with the player's mark
        }
      }
    }(this));
  }

  //expects player to be 0 or 1
  //displays the player's mark on the tile.
  TileView.prototype.toggle = function(player){
    this.ele.innerHTML = player ? 'O' : 'X'; 
  }


  //BoardView is reponsible for setting up the view of the TicTacToe game.
  var BoardView = function(){
    //Create DOM node and apply class, then append it to document.
    this.container = document.createElement('div');
    this.container.className = 'game-board';
    document.body.appendChild(this.container);


    this.tileVisuals = null; //tile visuals start off empty until we initialize them.
    this.registerEvents(); //register events that the BoardView should know about.
    this.initialize(); //Initialize the game board.
  }

  //Register events that BoardView should know about.
  BoardView.prototype.registerEvents = function(){
    //Use global EventSystem to make this class listen to and trigger events
    addEventSupport(this);


    //On win, board should display which player won
    this.on('win', function(gameView){
        return function(){
          var player = game.currentPlayer;
          gameView.showMessage('Player '+(player+1)+' wins.')
        }
    }(this));

    //On tie, board should display that it was a tie
    this.on('tie', function(gameView){
        return function(){
            gameView.showMessage("It's a cat's game!")
        }
    }(this));

    //On new game the board should reset the tiles and the game title.
    this.on('new_game', function(gameView){
        return function(){
            gameView.resetTiles();
            gameView.showMessage("Tic Tac Toe");
        }
    }(this));
  }

  //Show message changes the 'title' node's text to the message that is passed in.
  BoardView.prototype.showMessage = function(message){
    var el = document.getElementById('title');
          if(el) {
            el.innerHTML = message; //if el exists, change its innerHTML to the message passed in.
          }
  }


  //Reset the text in the already present tiles. 
  BoardView.prototype.resetTiles = function(){
    for(var row=0; row<game.totalRows; row++){
          for(var col=0; col<game.totalCols; col++){
              this.tileVisuals[row][col].ele.innerHTML = "";
          }
    }
  };

  //Create the tiles and add them to the DOM.
  BoardView.prototype.initialize = function(){
    this.tileVisuals = []; //create array in which tileVisuals will be stored.

    //Storing tiles in a two-dimensional array so that we can reference them
    //in a cartesian style coordinate.
    for(var row=0; row<game.totalRows; row++){
          this.tileVisuals.push([]);
          for(var col=0; col<game.totalCols; col++){
              this.tileVisuals[row].push(new TileView(row,col, this.container));
          }
          //First tile in each row gets a class with a clear:left that ensures that 
          //it will be displayed in the first slot of the next row.
          this.tileVisuals[row][0].ele.className += " firstTile";
    }
  }

  //initialize BoardView
  new BoardView();

}(new TicTacToe()));