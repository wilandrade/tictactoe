"use strict";

var GameBoard = function(){
    this.totalRows = 3; //total amount of rows
    this.totalCols = 3; //total amount of columns
    this.tiles = null;
    this.totalTurns = null;
    this.currentPlayer = null; // one player is 0, other player is 1;
    this.initialize();

};

GameBoard.prototype.initialize =  function (params) {
    this.tiles = [];
    for(var row=0; row<this.totalRows; row++){
        this.tiles.push([]);
        for(var col=0; col<3; col++){
            this.tiles[row].push(null);
        }
    }

    this.totalTurns = 0;
    this.currentPlayer = 0; // one player is 0, other player is 1;
    console.log(this.tiles);
};

GameBoard.prototype.printBoard = function(){
    for(var i=0; i<this.totalRows; i++){
        console.log(this.tiles[i]);
    }
}

GameBoard.prototype.togglePiece = function(rowIndex, colIndex) {
    if(rowIndex >= this.totalRows || rowIndex < 0 || colIndex >= this.totalCols || colIndex < 0){
       return; 
    }

    if(!this.tiles[rowIndex][colIndex]){
        this.tiles[rowIndex][colIndex] = this.currentPlayer;
        this.checkForWin();
        this.currentPlayer = (this.currentPlayer + 1) % 2
    }
};

GameBoard.prototype.checkForWin = function() {
    this.printBoard();
    if(this.checkRowWins() || this.checkColWins() || this.checkDiagonalWins()){
        this.handleWin();
    }else if(++this.totalTurns === (this.totalRows * this.totalCols)){
        //max amount of turns have been reached, it's a tie!
        this.handleTie();
    }

    return false;
};

GameBoard.prototype.handleTie = function(){
    console.log("It's a tie!")
    this.initialize();
}

GameBoard.prototype.handleWin = function(){
    console.log("Player "+ (this.currentPlayer+1) + " Wins!!!")
    this.initialize();
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
GameBoard.prototype.checkRowWinAt = function(rowIndex) {
    for(var col = 0; col < this.totalCols; col++){
        if(this.tiles[rowIndex][col] !== this.currentPlayer){
            return false;
        }

    }
    return true;
};
GameBoard.prototype.checkRowWins = function() {
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
GameBoard.prototype.checkColWinAt = function(colIndex) {
    for(var row = 0; row < this.totalRows; row++){
        if(this.tiles[row][colIndex] !== this.currentPlayer){
            return false;
        }
    }

    return true;
};
GameBoard.prototype.checkColWins = function() {
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
GameBoard.prototype.checkPositiveDiagonalWin = function(){
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
GameBoard.prototype.checkNegativeDiagonalWin = function(){
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
GameBoard.prototype.checkDiagonalWins = function() {
    if(this.checkPositiveDiagonalWin() || this.checkNegativeDiagonalWin()){
        return true;
    }

    return false;
};