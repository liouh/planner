P('main');

P.main.model = function(){
	P.main.data = {};
	
	// PRIVATE
	function _init(){
		P('main.options');
		// INIT SDK
		
		//hack
//		P.main.options.email = 'toutest1@chegg.com';
//		P.main.options.target = "http://liouh.com/planner/data.php";
//		_loadPreDefinedTemplates();
//		$('#planModal').modal('show');
		//hack
		
		Chegg.init({appName: 'planner', version: 1, domain: 'https://trunk.live.test.cheggnet.com/', redirect: '/'});
		
//		// SET options
		Chegg.Widget.survey({ type: 'user' }, function(data){
			console.log('userData: ', data);
			P.main.options.firstname = data.user.firstname;
			P.main.options.lastname = data.user.lastname;
			P.main.options.email = data.user.email;
			P.main.options.target = "http://liouh.com/planner/data.php";

			_loadPreDefinedTemplates();
		});
	}
	
	function _loadPreDefinedTemplates(){
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				action: "template-get"
			},
			dataType: 'jsonp',
			success: function(data){
				setModelData('templates', data);
				_checkUserPlans();
			}
		});
	}

	function _bindModalEvents(){
		$('.template-link').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			
			var el = $(e.target), selectedMajor = el.data('major');
			
			for(var i in P.main.data.templates){
				var template = P.main.data.templates[i];
				if(template.name == selectedMajor){
					var templateNew = template,
						newTemplateData = JSON.parse(templateNew.data);

					newTemplateData.email = P.main.options.email;

					var params = {
						email: P.main.options.email,
						name: template.name,
						data: JSON.stringify(newTemplateData)
					}

					_saveUserMajorTemplate(params);
					break;
				}
			}
		});
	}
	
	function _saveUserMajorTemplate(params){
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				action: "plan-create",
				email: params.email,
				name: params.name,
				data: params.data
			},
			dataType: 'jsonp',
			complete: function(data){
				$('#planModal').modal('hide');
				console.log('template created ...');
				_checkUserPlans();
			}
		});
	}

	function _checkUserPlans(){
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				email: P.main.options.email,
				action: "plan-get"
			},
			dataType: 'jsonp',
			success: function(data){
				if(data.length > 0){
					// IS user already registered his email
					console.log('plans found for user '+ P.main.options.email);
					P.main.planData = data;
					getUserCachedData();
				} else {
					// SHOW plans modal
					$('#planModal').modal('show');
					_bindModalEvents();
					console.log('no plans found for user '+ P.main.options.email);
				}
			}
		});
	}

	function getModelData(){
		return P.main.data;
	}
	
	function getKeyValue(key){
		return P.main.data[key] ? P.main.data[key] : null;
	}
	
	function setModelData(key, value){
		P.main.data[key] = value;
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
		if(data.classyear){
			console.log('found from cache');
			
//			setModelData('school', data.school);
			setModelData('classyear', {year:data.classyear});

			// RENDER
			P.mainView.render();
		} else {
			console.log('didnt found from cache');
//			// INIT school and then classyear widget
//			Chegg.Widget.survey({type: 'school'}, P.main.school.callbacks.success, P.main.school.callbacks.error);
			
			// INIT schoolYear widget
			Chegg.Widget.survey({type: 'classyear'}, P.main.classyear.callbacks.success, P.main.classyear.callbacks.error);
		}
	}
	
	function createUser(){
		$.ajax({
			type: "GET",
			url: P.main.options.target,
			data: {
				email: P.main.options.email, 
				action: "user-create",
//				school: P.main.data.school.name,
				school: '',
				classyear: P.main.data.classyear.year
			},
			dataType: 'jsonp',
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
		setData: function(key, value){
			setModelData(key, value);
		},
		
		getData: function(){
			return getModelData();
		},
		
		get: function(key){
			return getKeyValue(key);
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
		
		P.mainModel.setData('school', data.school);
		
		// INIT schoolYear widget
		Chegg.Widget.survey({type: 'classyear'}, P.main.classyear.callbacks.success, P.main.classyear.callbacks.error);
	},
	
	error: function(data){
		console.log('school widget failed: '+ JSON.stringify(data));
	}
}

// CLASSYEAR handler
P('main.classyear');
P.main.classyear.callbacks = {
	success: function(data){
		console.log('schoolyear widget success: '+ JSON.stringify(data));

		P.mainModel.setData('classyear', data.classyear);
		P.mainModel.saveUser();

		// RENDER
		P.mainView.render();
	},
	
	error: function(data){
		console.log('schoolyear widget failed: '+ JSON.stringify(data));
	}
}
