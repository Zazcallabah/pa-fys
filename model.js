var Model = function() {
	this.customPresets = ko.observableArray([]);
	this.selectedPreset = ko.observable();
	this.result = ko.observableArray([]);
}

Model.prototype.resetSelected = function(){
	for( var i = 0; i<this.customPresets().length; i++ )
		this.customPresets()[i].selected(false);
};

Model.prototype.roll = function() {
	this.result([]);
	var dies =this.selectedPreset().dice();
	for( var i =0; i<dies.length; i++ )
	{
		this.result.push({
			name: ko.observable(dies[i].name()),
			roll: ko.observable(dies[i].roll())
		});
	}
};
