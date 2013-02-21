P('main');
P.main.view = function() {
	return{
		render: function() {
			
			var data = P.data;
			var classyear = new Date().getFullYear();
			if(params.classyear) {
				classyear = params.classyear;
			}
			
			data = JSON.parse(data.data);
			
			for(var year in data.years) {
				
				var html = '<div class="year"><div class="year-label">' + (classyear - (data.years.length - 1 - year)) + "</div>";
				year = data.years[year];
				
				for(var term in year.terms) {
				
					term = year.terms[term];
					html += '<div class="term"><div class="term-label">' + term.name + '</div>';
					html += '<ul class="course-list">';
					
					for(var course in term.courses) {
					
						course = term.courses[course];
						html += '<li class="course"><span>';
						html += course.subjectCode + ' ' + course.catalogNumber;
						html += '</span></li>';
					}
					
					html += '</ul>';
					html += '</div>';
				}
				
				html += '</div>';
				
				$('#years').append(html);
			}
		},
		
		load: function(){
			P.mainModel = new P.main.model();
		}
	}
}
