var Model = function() {
	this.presets = ko.observableArray([]);
	this.editingPreset = ko.observable();
	this.result = ko.observableArray([]);
	this.groups = ko.observable(1);
	this.setCount = ko.observable(0);
	this.sets = ko.computed( function(){
		return Math.max( 0, (this.setCount() - this.groups()) );
	}, this);
}

Model.prototype.addGroup = function(){
	this.groups( this.groups()+1 );
};

Model.prototype.resetSets = function(){
	this.setCount( 0 );
};

Model.prototype.removeGroup = function(){
	if( this.groups() > 1 )
		this.groups( this.groups()-1 );
};

Model.prototype.save = function(){
	if( localStorage)
	{
		var converted = [];
		this.presets().forEach( function(p){
			if( !p.permanent() )
				converted.push( p.jsonPrepare() );
		});
		localStorage["customPresetList"] = JSON.stringify( converted );
	}
};

Model.prototype.roll = function(selectedPreset){
	var model = this;
	model.setCount( this.setCount()+1 );
	model.result([]);
	selectedPreset.dice().forEach( function(d){
		model.result.push({
			name: ko.observable(d.name()),
			roll: ko.observable(d.roll())
		});
	});
};
