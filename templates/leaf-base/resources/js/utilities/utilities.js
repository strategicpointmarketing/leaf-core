/*

Polyfill - Object.create

Description:
For browsers that don't support Object.create this gets close to duplicating it

*/
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F(){}
        F.prototype = obj;
        return new F();
    };
}