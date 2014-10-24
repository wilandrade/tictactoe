"user strict";

(function (game) {
  var Tile = function(num){
    this.name = num;
    this.ele = document.createElement('div');
    this.ele.className = 'tile';
    this.ele.onclick = (function(tileName){
      return function(){
        console.log(tileName + " was clicked.");
      }
    }(this.name));

    document.body.appendChild(this.ele);
    
  };

  for(var i=0; i<3; i++){
    new Tile(i);
  };
}(new GameBoard()));