P('main');
P('callbacks');

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
			console.log(P.mainModel.getData());
			
			// RENDER main widget now
			
		},
		
		load: function(){
			P('plannerModel');
			P.mainModel = new P.main.model();
			P.mainModel.setData(P.data);

			// INIT SDK
			Chegg.init({appName: 'planner', version: 1, domain: 'https://test3.live.cheggnet.com/'});
			
			// INIT school widget
			Chegg.Widget.survey({type: 'school'}, P.main.school.callbacks.success, P.main.school.callbacks.error);
		}
	}
}

// SCHOOL handler
P('main.school');
P.main.school.callbacks = {
	success: function(data){
		console.log('school widget success: '+ JSON.stringify(data));
		
		var model = P.mainModel, newData = model.getData();
		newData.school = data;
		model.setData(newData);
		
		// INIT schoolYear widget
		Chegg.Widget.survey({type: 'classyear'}, P.main.schoolyear.callbacks.success, P.main.schoolyear.callbacks.error);
	},
	
	error: function(data){
		console.log('school widget failed: '+ JSON.stringify(data));
	}
}

// CLASSYEAR handler
P('main.classYear');
P.main.classYear.callbacks = {
	success: function(data){
		console.log('schoolyear widget success: '+ JSON.stringify(data));
		var model = P.mainModel, view = P.mainView, newData = model.getData();
		newData.classYear = data;
		model.setData(newData);
		
		// RENDER
		view.render();
	},
	
	error: function(data){
		console.log('schoolyear widget failed: '+ JSON.stringify(data));
	}
}


// INIT
P('plannerView');
P.mainView = new P.main.view();
P.mainView.load();