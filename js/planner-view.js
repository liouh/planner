P('main');
P.main.view = function() {
	return{
		render: function() {
			console.log(P.data);
			
			var data = P.data;
			var classyear = 2013;
			
//			var data = P.main.planData;
//			var classyear = P.main.data.classyear.year;
			
			for(var plan in data) {
				
				plan = data[plan];
				$('#tabs').append('<li>' + plan.name + '</li>');
				
				var planData = JSON.parse(plan.data);
				
				for(var year in planData.years) {
					
					var html = '<div class="year"><div class="year-label">' + (classyear - (planData.years.length - 1 - year)) + "</div>";
					year = planData.years[year];
					
					for(var term in year.terms) {
					
						term = year.terms[term];
						html += '<div class="term"><div class="term-label">' + term.name + '</div>';
						
						for(var course in term.courses) {
						
							course = term.courses[course];
							html += '<div class="course">';
							html += course.subjectCode + ' ' + course.catalogNumber;
							html += '</div>';
						}
						
						html += '</div>';
					}
					
					html += '</div>';
					
					$('#years').append(html);
				}
			}
		},
		
		load: function(){
			P.mainModel = new P.main.model();
		}
	}
}
