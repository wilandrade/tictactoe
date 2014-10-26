"use strict";
var TicTacToe = function(rows,columns){
    this.totalRows = rows || 3; //total number of rows
    this.totalCols = columns || 3; //total number of columns


    this.isActive = null; //can players take turns?
    this.tiles = null; //reference to all the tiles in the board
    this.totalTurns = null; //total amount of turns taken so far
    this.currentPlayer = null; // one player is 0, other player is 1;

    //register class with EventSystem
    this.registerEvents();

    //initialize TicTacToe game
    this.initialize();

};

TicTacToe.prototype.registerEvents = function(){
    addEventSupport(this);

    //handle new_game event
    this.on('new_game', function(game){
        return function(){
            game.initialize();
        }
    }(this));
};

//Initialize will create the game tiles and configure initial game settings
TicTacToe.prototype.initialize =  function (params) {
    //allow tiles to become toggleable
    this.isActive = true;

    //create game tiles
    this.tiles = [];
    for(var row=0; row<this.totalRows; row++){
        this.tiles.push([]);
        for(var col=0; col<this.totalCols; col++){
            this.tiles[row].push(null);
        }
    }

    this.totalTurns = 0; // total game turns to keep track of tie
    this.currentPlayer = 0; // one player is 0, other player is 1;
};

//Toggle individual piece based on row and column indices
TicTacToe.prototype.togglePiece = function(rowIndex, colIndex) {

    //if game is not active, trigger a new_game event
    if(!this.isActive){
        this.trigger('new_game');
        return false;
    }

    //check if toggle is within the bounds of the board tiles
    if(rowIndex >= this.totalRows || rowIndex < 0 || colIndex >= this.totalCols || colIndex < 0){
       return false; 
    }

    //if the tile is not already taken
    if(this.tiles[rowIndex][colIndex] === null){
        //set tile with current player and check if there is a win condition
        this.tiles[rowIndex][colIndex] = this.currentPlayer;
        this.checkForWin();

        //switch current player
        this.currentPlayer = (this.currentPlayer + 1) % 2;
        return true; //move was successful
    }

    //Move was unsuccessful
    return false;
};


//Check board for win conditions
TicTacToe.prototype.checkForWin = function() {
    if(this.checkRowWins() || this.checkColWins() || this.checkDiagonalWins()){
        this.trigger('win');//trigger win event if there was a win condition
        this.isActive = false;
        return true;// win condition was found

    }else if(++this.totalTurns === (this.totalRows * this.totalCols)){
        //max amount of turns have been reached, it's a tie!
        this.trigger('tie')
        this.isActive = false;
    }

    return false;
};

/*=========================================================================
                 Win Checker Helper Functions                    
=========================================================================*/


// ROWS: Check if any rows on this board contain a win condition
//  For Example:
/*             X |   X |   X  
            -----+-----+-----
              0  |     |  0  
            -----+-----+-----
              0  |     |   
            
*/
// test if a specific row on this board contains a win condition
TicTacToe.prototype.checkRowWinAt = function(rowIndex) {
    for(var col = 0; col < this.totalCols; col++){
        if(this.tiles[rowIndex][col] !== this.currentPlayer){
            return false;
        }

    }
    return true;
};

TicTacToe.prototype.checkRowWins = function() {
    for(var row = 0; row < this.totalRows; row++){
        if(this.checkRowWinAt(row)){
            return true;
        };
    }
    return false;
};


//COLUMNS: Check if any columns on this board contain a win condition
//  For Example:
/*             X |     |   X  
            -----+-----+-----
               X |  0  |  0  
            -----+-----+-----
               X |  0  |   
            
*/
// test if a specific column on this board contains a win condition
TicTacToe.prototype.checkColWinAt = function(colIndex) {
    for(var row = 0; row < this.totalRows; row++){
        if(this.tiles[row][colIndex] !== this.currentPlayer){
            return false;
        }
    }

    return true;
};
TicTacToe.prototype.checkColWins = function() {
    for(var col = 0; col < this.totalCols; col++){
        if(this.checkColWinAt(col)){
            return true;
        };
    }
    return false;
};


//Check if positive diagonal reached win condition
//  For Example:
/*             X |     |    
            -----+-----+-----
              0  |   X |  0  
            -----+-----+-----
              0  |     |  X
            
*/
TicTacToe.prototype.checkPositiveDiagonalWin = function(){
    for(var row = 0; row < this.totalRows; row++){
        // positive diagonal rows and columns share the same index
        var col = row;
        if(this.tiles[row][col] != this.currentPlayer){
            return false;
        }
    }

    return true;
}


////Check if negative diagonal reached win condition
//  For Example:
/*               |  0  |  X  
            -----+-----+-----
              0  |   X |  0  
            -----+-----+-----
              X  |     |  X
            
*/
TicTacToe.prototype.checkNegativeDiagonalWin = function(){
    for(var row = 0; row<this.totalRows; row++){
        //negative diagonal columns are always the max rows minus the current row.
        //since indices start with 0 we subtract 1 from totalRows.
        var col = (this.totalRows - 1) - row;
        if(this.tiles[row][col] != this.currentPlayer){
            return false;
        }
    }

    return true;
}

// check if any diagonal on this board contains a win condition
TicTacToe.prototype.checkDiagonalWins = function() {
    if(this.checkPositiveDiagonalWin() || this.checkNegativeDiagonalWin()){
        return true;
    }

    return false;
};