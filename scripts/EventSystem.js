//Event system used to connect model layers with view layers.
var EventSystem = {
    trigger: function(e){
        //if there are listeners set to this triggered event, call each 
        //callback stored for it
        var args = Array.prototype.slice.call(arguments,1 );
        if(this.listeners[e]){
            for(var i=0; i<this.listeners[e].length; i++){
                this.listeners[e][i].apply(null,args);
            }
        }
    },
    //register callbacks for events
    on: function(e, callback){
        if(!this.listeners[e]){
            this.listeners[e] = [];
        }

        this.listeners[e].push(callback);
    },
    listeners: {}
};

//Register object into event system
var addEventSupport = function(obj) {
    for(var key in EventSystem){
        obj[key] = EventSystem[key];
    }
    return obj;
};