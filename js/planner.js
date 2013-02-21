P('main');

P.main.model = function(){
	
	// PRIVATE
	function _init(){
		P('main.options');
		// INIT SDK
		Chegg.init({appName: 'planner', version: 1, domain: 'https://test3.live.cheggnet.com/'});
		
		// SET options
		Chegg.Widget.survey({ type: 'user' }, function(data){
			console.log('userData: ', data);
			P.main.options.firstname = data.user.firstname;
			P.main.options.lastname = data.user.lastname;
			P.main.options.email = data.user.email;
			P.main.options.target = "http://liouh.com/planner/data.php";
			
			// IS data alrady cached
			P.mainModel.getUserData();
		});
	}
	
	function getModelData(){
		return this.data;
	}
	
	function setModelData(data){
		this.data = data;
	}
	
	function getUserCachedData(){
		console.log('calling '+P.main.options.target);
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				email: P.main.options.email, 
				action: "user-get"
			},
			dataType: 'jsonp',
			success: function(r){
				userHandler(r);
			},
			error: function(e){
				console.log('ajax getUser error '+JSON.stringify(e));
			}
		});
	}
	
	// CALLBACK for getUser
	function userHandler(data){
		// IF found from cache
		if(data.school && data.classyear){
			console.log('found from cache');
			var model = P.mainModel, view = P.mainView, newData = model.getData();
			newData.school = data.school;
			newData.classYear = data.classyear;
			model.setData(newData);

			// RENDER
			view.render();
		} else {
			console.log('didnt found from cache');
			// INIT school and then classYear widget
			Chegg.Widget.survey({type: 'school'}, P.main.school.callbacks.success, P.main.school.callbacks.error);
		}
	}
	
	function createUser(){
		var modelData = getModelData();
		
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				email: P.main.options.email, 
				action: "user-create",
				school: modelData.school.school.name,
				classyear: modelData.classyear.classyear.year
			},
			success: function(r){
				console.log('user created');
			},
			error: function(e){
				console.log('user failed to create');
			}
		});
	}

	_init();

	// PUPLIC
	return{
		setData: function(data){
			setModelData(data);
		},
		
		getData: function(){
			return getModelData();
		},
		
		getUserData: function(){
			getUserCachedData();
		},
		
		saveUser: function(){
			createUser();
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
		Chegg.Widget.survey({type: 'classyear'}, P.main.classYear.callbacks.success, P.main.classYear.callbacks.error);
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
		newData.classyear = data;
		model.setData(newData);
		
		model.saveUser();
		// RENDER
		view.render();
	},
	
	error: function(data){
		console.log('schoolyear widget failed: '+ JSON.stringify(data));
	}
}
