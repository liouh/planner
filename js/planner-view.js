P('main');
P.main.view = function(){
	return{
		render: function(){
			console.log(P.mainModel.getData());
			// RENDER main widget now
		},
		
		load: function(){
			P.mainModel = new P.main.model();
		//	P.mainModel.setData(P.data);
		}
	}
}
