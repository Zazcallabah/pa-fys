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
		var l = [];
		for( var i = 0; i<this.presets().length; i++ )
		{
			if( !this.presets()[i].permanent )
				l.push(this.presets()[i].jsonPrepare() );
		}
		localStorage["customPresetList"] = JSON.stringify( l );
	}
};

Model.prototype.roll = function(selectedPreset) {
	this.setCount( this.setCount()+1 );
	this.result([]);
	var dies = selectedPreset.dice();
	for( var i =0; i<dies.length; i++ )
	{
		this.result.push({
			name: ko.observable(dies[i].name()),
			roll: ko.observable(dies[i].roll())
		});
	}
};
