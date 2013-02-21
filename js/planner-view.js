P('main');
P.main.view = function() {
	return{
		render: function() {
			var data = P.main.planData;
			var classyear = P.main.data.classyear.year;
			
//			var data = P.data;
//			var classyear = 2013;
			
			var first = true;
			for(var plan in data) {
				
				plan = data[plan];
				var planData = JSON.parse(plan.data);
				
				var className = '';
				if(first) {
					className = 'selected';
				}
				$('#tabs').append('<li class="' + className + '" data-for="' + planData.id + '">' + plan.name + '</li>');
				
				className = ' hidden';
				if(first) {
					first = false;
					className = '';
				}
				
				var html = '<div class="plan' + className + '" data-plan="' + planData.id + '">';
				
				for(var year in planData.years) {
					
					html += '<div class="year"><div class="year-label">' + (classyear - (planData.years.length - 1 - year)) + "</div>";
					year = planData.years[year];
					
					for(var term in year.terms) {
					
						term = year.terms[term];
						html += '<div class="term"><div class="term-label">' + term.name + '</div>';
						html += '<ul class="course-list">';
						
						for(var course in term.courses) {
						
							course = term.courses[course];
							html += '<li class="course"><div class="delete">x</div><span>';
							html += course.subjectCode + ' ' + course.catalogNumber;
							html += '</span></li>';
						}
						
						html += '</ul>';
						html += '<div class="add-course">+</div>';
						html += '</div>';
					}
					
					html += '</div>';
				}
				
				html += '</div>';
				
				$('#years').append(html);
			}
			
			$('#share').on('click', function(e) {
				var id = $('.selected[data-for]').attr('data-for');
				window.open('share.html?id=' + id + '&classyear=' + classyear);
			});
			
			$('#tabs li').on('click', function(e) {
				var target = $(e.target);
				$('#tabs li').removeClass('selected');
				target.addClass('selected');
				
				var id = target.attr('data-for');
				$('[data-plan]').hide();
				$('[data-plan=' + id + ']').show();
			});
			
			$('#planner').on('click', '.course .delete', function(e) {
				var target = $(e.target);
				target.parent().remove();
			});
			
			$('.add-course').on('click', function(e) {
				Chegg.Widget.survey({type: 'course'}, function(data) {
					var target = $(e.currentTarget);
					if(data && data.course) {
						for(var course in data.course) {
							course = data.course[course];
							
							var html = '<li class="course"><div class="delete">x</div><span>';
							html += course.subjectCode + ' ' + course.catalogNumber;
							html += '</span></li>';
							
							target.parent().find('.course-list').append(html);
						}
					}
				});
			});
			
			$('.course-list').sortable({ connectWith: '.course-list' });
			
			Chegg.Canvas.resize();
		},
		
		load: function(){
			P.mainModel = new P.main.model();
		}
	}
}
