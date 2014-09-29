var Preset = function(model,initobj,permanent) {

	this.dice = ko.observableArray([]);
	this.name = ko.observable("");
	this.permanent = ko.observable(permanent || false);

	if( initobj )
	{
		var obj = initobj;
		if( typeof initobj === 'string' )
			obj = JSON.parse( initobj );
			
		if( obj.name )
			this.name( obj.name );
			
		if( obj.dice )
		{
			for( var i = 0; i<obj.dice.length; i++ )
			{
				var d = new Dice();
				d.name(obj.dice[i].name);
				if( obj.dice[i].faces )
					for( var j = 0; j<obj.dice[i].faces.length; j++ )
						d.faces.push( obj.dice[i].faces[j] );
				this.dice.push( d );
			}
		}
	}
	this.model = model;
	this.selected = ko.observable(false);
	model.presets.push(this);
	if( model.editingPreset() === undefined )
		model.editingPreset(this);
};

Preset.prototype.roll = function(){
	this.model.roll( this );
};

Preset.prototype.jsonPrepare = function(){
	return {
		name: this.name(),
		dice: this.dice().map(function(d){
			return {name:d.name(),faces:d.faces()};
		})
	};
};

Preset.prototype.editMe = function() {
	this.model.editingPreset(this);
	$(':mobile-pagecontainer').pagecontainer('change', '#editPreset' );
};

Preset.prototype.removeMe = function() {
	if( this.model.presets().length === 1 )
		return;
	this.removalmark = true;
	this.model.presets( this.model.presets().filter( function(p){ return !p.removalmark; } ) );
	this.model.save();
};

Preset.prototype.toggleSelected = function() {
	this.selected( !this.selected() );
	this.model.result([]);
	if( localStorage )
	{
		localStorage["lastList"] = this.model.presets()
			.filter( function(p){ return p.selected() })
			.map( function(p){ return p.name(); } )
			.join(";");
	}
}