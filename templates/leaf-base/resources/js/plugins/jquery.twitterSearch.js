// Utility
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function ( $, Client, document, undefined ) {

    "use strict";

    Client.Twitter = {
        init: function( config, elem ) {
            var self = this;

            self.elem = elem;
            self.$elem = $(elem);

            self.url = 'https://api.twitter.com/1.1/search/tweets.json?q=';

            if (typeof config === 'string') {
                self.search = config;
            } else {
                // object was passed
                self.search = config.search;
                self.config = $.extend( {}, $.fn.queryTwitter.config, config );
                console.log(self.config);
            }

            self.cycle();
        },

        cycle: function() {
            var self = this;

            self.fetch().done(function( results ) {
                self.buildFrag( results );
                self.display();
            });
        },

        fetch: function() {
            return $.ajax({
                url: this.url,
                data: { q: this.search },
                dataType: 'jsonp'
            });
        },

        buildFrag: function() {
            var self = this;

            self.tweets = $.map( results.results, function( obj, i) {
                console.log(obj);
            });
        },

        display: function() {
            this.$elem.html( self.tweets );
        }
    };


    // add method to the prototype
    $.fn.queryTwitter = function( config ) {
        return this.each( function() {
            
            var twitter = Object.create( Client.Twitter );
            twitter.init( config, this );

        });
    };

    $.fn.queryTwitter.config = {
        search: 'tutspremium'
    };

}( jQuery, window.Client = window.Client || {}, document ));
