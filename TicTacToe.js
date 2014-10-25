"use strict";
var TicTacToe = function(){
    this.totalRows = 3; //total amount of rows
    this.totalCols = 3; //total amount of columns


    this.isActive = null; //can players take turns?
    this.tiles = null; //reference to all the tiles in the board
    this.totalTurns = null; //total amount of turns taken so far
    this.currentPlayer = null; // one player is 0, other player is 1;

    //register class with EventSystem
    this.registerEvents();
    this.initialize();

};

TicTacToe.prototype.initialize =  function (params) {
    this.isActive = true;
    this.tiles = [];
    for(var row=0; row<this.totalRows; row++){
        this.tiles.push([]);
        for(var col=0; col<3; col++){
            this.tiles[row].push(null);
        }
    }

    this.totalTurns = 0;
    this.currentPlayer = 0; // one player is 0, other player is 1;
    this.printBoard();
};

TicTacToe.prototype.registerEvents = function(){
    addEventSupport(this);

    this.on('win', function(game){
        return function(){
            game.handleWin();
        }
    }(this));

    this.on('tie', function(game){
        return function(){
            game.handleTie();
        }
    }(this));

    this.on('new_game', function(game){
        return function(){
            game.initialize();
        }
    }(this));
}

TicTacToe.prototype.printBoard = function(){
    for(var i=0; i<this.totalRows; i++){
        console.log(this.tiles[i]);
    }
}

TicTacToe.prototype.togglePiece = function(rowIndex, colIndex) {
    if(!this.isActive){
        this.trigger('new_game');
        return false;
    }

    if(rowIndex >= this.totalRows || rowIndex < 0 || colIndex >= this.totalCols || colIndex < 0){
       return false; 
    }

    if(this.tiles[rowIndex][colIndex] === null){
        this.tiles[rowIndex][colIndex] = this.currentPlayer;
        this.checkForWin();
        this.currentPlayer = (this.currentPlayer + 1) % 2
        return true; //move was successful
    }

    //Move was unsuccessful
    return false;
};

TicTacToe.prototype.checkForWin = function() {
    this.printBoard();
    if(this.checkRowWins() || this.checkColWins() || this.checkDiagonalWins()){
        this.trigger('win');
        return true;
    }else if(++this.totalTurns === (this.totalRows * this.totalCols)){
        //max amount of turns have been reached, it's a tie!
        this.trigger('tie')
    }

    return false;
};

TicTacToe.prototype.handleTie = function(){
    this.isActive = false;
}

TicTacToe.prototype.handleWin = function(){
    this.isActive = false;
}

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