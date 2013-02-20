P('main');

P.main.model = function(){
	function getModelData(){
		return this.data;
	}
	
	function setModelData(data){
		this.data = data;
	}
	
	return{
		setData: function(data){
			setModelData(data);
		},
		
		getData: function(){
			return getModelData();
		}
	}
}

P.main.view = function(){
	return{
		render: function(){
			P('plannerModel');
			P.mainModel = new P.main.model();
			P.mainModel.setData(P.data);
			
			console.log(P.mainModel.getData());
		}
	}
}

// INIT
P('plannerView');
P.mainView = new P.main.view();
P.mainView.render();