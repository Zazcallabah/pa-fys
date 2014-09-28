

describe('a preset', function(){
	it('can be empty', function(){
		var m = new Model();
		var p = new Preset(m);
		
		expect( p.name() ).toBe( "" );
		expect( p.dice().length ).toBe( 0 );
	});
	
	
	it('can be from json', function(){
		var json = "{\"name\":\"Custom\",\"dice\":[{\"name\":\"Action\",\"faces\":[\"Squats\",\"Pushups\"]}]}";
		var m = new Model();
		var p = new Preset(m,json);
		expect( p.name() ).toBe( "Custom" );
		expect( p.dice().length ).toBe( 1 );
		expect( p.dice()[0].name() ).toBe( "Action" );
		expect( p.dice()[0].faces().length ).toBe( 2 );
		expect( p.dice()[0].faces()[0] ).toBe( "Squats" );
		expect( p.dice()[0].faces()[1] ).toBe( "Pushups" );
		
	});
	
	it('can be from object', function(){
		var obj = {name:"Custom",dice:[{name:"Action",faces:["Squats","Pushups"]}]}";
		var m = new Model();
		var p = new Preset(m,obj);
		expect( p.name() ).toBe( "Custom" );
		expect( p.dice().length ).toBe( 1 );
		expect( p.dice()[0].name() ).toBe( "Action" );
		expect( p.dice()[0].faces().length ).toBe( 2 );
		expect( p.dice()[0].faces()[0] ).toBe( "Squats" );
		expect( p.dice()[0].faces()[1] ).toBe( "Pushups" );
		
	});
});
