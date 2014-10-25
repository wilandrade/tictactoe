var eventSystem = {
    trigger: function(e){
        //if there are listeners set to this triggered event, call each 
        //callback stored for this event.
        var args = Array.prototype.slice.call(arguments,1 );
        if(this.listeners[e]){
            for(var i=0; i<this.listeners[e].length; i++){
                this.listeners[e][i].apply(null,args);
            }
        }
    },
    on: function(e, callback){
        if(!this.listeners[e]){
            this.listeners[e] = [];
        }

        this.listeners[e].push(callback);
    },
    listeners: {}
}
var addEventSupport = function(obj) {
    for(var key in eventSystem){
        obj[key] = eventSystem[key];
    }
    return obj;
};