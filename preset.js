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
	this.selected = ko.observable(false);
	model.customPresets.push(this);
};

Preset.prototype.jsonPrepare = function(){
	var data ={};
	data.name = this.name();
	data.dice = [];
	for( var i = 0; i<this.dice().length; i++ )
	{
		var dice = this.dice()[i];
		var f = [];
		for( var j = 0; j<dice.faces().length; j++ )
			f.push( dice.faces()[j] );
		data.dice.push({name:dice.name(),faces:f});
	}
	return data;
};

Preset.prototype.removeMe = function() {
	if( this.model.customPresets().length === 1 )
		return;
	this.removalmark = true;
	var list = [];
	for( var i = 0; i<this.model.customPresets().length; i++ )
		if( !this.model.customPresets()[i].removalmark )
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