P('main');

P.main.view = function() {
    function lookup_course_color(subjectCode) {
        var course_name = subjectCode.toLowerCase();

        if (course_name.indexOf('cs') != -1) {
            return 'c1';
        } else if (course_name.indexOf('math') != -1) {
            return 'c2';
        } else if (course_name.indexOf('biol') != -1) {
            return 'c3';
        } else if (course_name.indexOf('chem') != -1) {
            return 'c4';
        } else if (course_name.indexOf('physics') != -1) {
            return 'c5';
        } else { 
            return '';
        }
    }


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
                        var color_class = lookup_course_color(course.subjectCode);
						html += '<li class="course ' + color_class  + '"><span>';
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
