
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
		var obj = { name:"Custom",
		dice:[
		{name:"Action",faces:["Squats","Pushups"]}
		]};
		var m = new Model();
		var p = new Preset(m,obj);
		expect( p.name() ).toBe( "Custom" );
		expect( p.dice().length ).toBe( 1 );
		expect( p.dice()[0].name() ).toBe( "Action" );
		expect( p.dice()[0].faces().length ).toBe( 2 );
		expect( p.dice()[0].faces()[0] ).toBe( "Squats" );
		expect( p.dice()[0].faces()[1] ).toBe( "Pushups" );
		
	});

	
	describe('toggleSelected',function(){
		it('can store one preset', function(){
			var m = new Model();
			var a = new Preset(m,{name:"a",dice:[]});
			var b = new Preset(m,{name:"b",dice:[]});
			var c = new Preset(m,{name:"c",dice:[]});
			
			a.toggleSelected();
			
			expect( localStorage["lastList"] ).toBe( "a" );
		});
		
		it('can store two presets', function(){
			var m = new Model();
			var a = new Preset(m,{name:"a",dice:[]});
			var b = new Preset(m,{name:"b",dice:[]});
			var c = new Preset(m,{name:"c",dice:[]});
			
			c.toggleSelected();
			a.toggleSelected();
			
			expect( localStorage["lastList"] ).toBe( "a;c" );
		});
	});
	
	it('can be removed', function(){
		var m = new Model();
		new Preset(m,{name:"a",dice:[]});
		var p = new Preset(m,{name:"a",dice:[{name:"a"}]});
		
		p.removeMe();
		
		expect( m.presets().length ).toBe( 1 );
		expect( m.presets()[0].name() ).toBe( "a" );
		expect( m.presets()[0].dice().length ).toBe( 0 );
	});

});
