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

Model.prototype.register = function( preset ){
	this.presets.push( preset );
	if( !this.editingPreset() )
		this.editingPreset(preset);
};

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
	if( localStorage )
	{
		localStorage["customPresetList"] = JSON.stringify( this.presets()
			.filter( function(p){ return !p.permanent() } )
			.map( function(p){ return p.jsonPrepare(); } ) );
	}
};

Model.prototype.roll = function( rolled ){
	var model = this;
	model.setCount( this.setCount()+1 );
	model.result( rolled.dice().map(
		function(d){
			return {
				name: ko.observable(d.name()),
				roll: ko.observable(d.roll())
			};
		}
	));
};
