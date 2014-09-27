var Model = function() {
	this.current = ko.observable("");
	this.customPresets = ko.observableArray([]);
	this.dice = ko.observableArray([]);
	this.result = ko.observableArray([]);
	this.loaded = false;
}
Model.prototype.load = function(obj){
	if( obj.name )
		this.current(obj.name);
	if( obj.dice )
	{
		this.result([]);
		this.dice([]);
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
	this.loaded = true;
};

Model.prototype.resetSelected = function(){
	for( var i = 0; i<this.customPresets().length; i++ )
		this.customPresets()[i].selected(false);
};

Model.prototype.addPreset = function(preset){
	var thismodel = this;
	preset.selected = ko.observable(false);
	preset.removeMe = function(){
		if( thismodel.customPresets().length === 1 )
			return;
		var list = [];
		for( var i = 0; i<thismodel.customPresets().length; i++ )
			if( thismodel.customPresets()[i].name !== preset.name )
				list.push( thismodel.customPresets()[i] );
		thismodel.customPresets(list);
		if( preset.selected() )
			thismodel.customPresets()[0].toggleSelected();
	};
	preset.toggleSelected = function(){
		if(!preset.selected())
		{
			thismodel.resetSelected();
			preset.selected(true);
			thismodel.load( preset );
			if( localStorage )
				localStorage["lastList"] = preset.name;
		}
	}
	this.customPresets.push(preset);
};

Model.prototype.preferred = function(name) {
	for( var i =0; i<this.customPresets().length; i++ )
		if( this.customPresets()[i].name === name )
		{
			this.customPresets()[i].toggleSelected();
			return;
		}
};

Model.prototype.roll = function() {
	this.result([]);
	var dies =this.dice();
	for( var i =0; i<dies.length; i++ )
	{
		this.result.push({
			name: ko.observable(dies[i].name()),
			roll: ko.observable(dies[i].roll())
		});
	}
};
