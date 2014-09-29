var Dice = function( n, f ) {
	this.name = ko.observable( n || "" );
	this.faces = ko.observableArray( f || [] );
}

Dice.prototype.lastFace = function(){
	if( this.faces().length === 0 )
		return "";
	return this.faces()[this.faces().length-1];
};

Dice.prototype.addFace = function(){ this.faces.push(this.lastFace()); };

Dice.prototype.removeFace = function(){ if( this.faces().length > 1 ) this.faces.pop(); };

Dice.prototype.roll = function(){ return this.faces()[Math.floor(Math.random() * this.faces().length )] };
