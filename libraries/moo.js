;(function ( global, $ ) {

    var Moo = function( /* constructor arguments */ ) {
        return new Moo.init( /* constructor arguments */ );
    }

    /* private properties (in the closure) */

    Moo.prototype = {

        /* public properties */

        /* public methods */
        
    };

    Moo.init = function( /* constructor arguments */ ) {

        var self = this;

        self.name = "Moo Library";
        self.version = "0.0.0.0";
        /* initialize member variables */

        /* initialization code */
    }

    Moo.init.prototype = Moo.prototype;

    global.Moo = global.M$ = Moo;

}( window, jQuery ));