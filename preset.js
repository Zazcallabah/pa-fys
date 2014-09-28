var Preset = function(model,initobj) {

	this.dice = ko.observableArray([]);
	this.name = ko.observable("");

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
	this.id = Math.floor(Math.random()*100000000);
	this.selected = ko.observable(false);
	model.customPresets.push(this);
};

Preset.prototype.removeMe = function() {
	if( this.model.customPresets().length === 1 )
		return;
	var list = [];
	for( var i = 0; i<this.model.customPresets().length; i++ )
		if( this.model.customPresets()[i].id !== preset.id )
			list.push( this.model.customPresets()[i] );
	this.model.customPresets(list);
	if( preset.selected() )
		this.model.customPresets()[0].toggleSelected();
};

Preset.prototype.toggleSelected = function() {
	if(!this.selected())
	{
		this.model.resetSelected();
		this.selected(true);
		this.model.selectedPreset(this);
		this.model.result([]);
		if( localStorage )
			localStorage["lastList"] = this.name();
	}
}