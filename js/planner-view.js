P('main');
P.main.view = function() {
	
	function isDebug() {
		return false;
	}
	
	function update() {
	
		$('#saving').show();
		
		var id = $('.selected[data-for]').attr('data-for');
		var name = $('.selected[data-for]').text();
		var plan = $('[data-plan=' + id + ']');
		var data = {};
		
		data.years = [];
		
		plan.find('.year').each(function(i, el) {
			
			var year = {};
			year.terms = [];
			
			$(el).find('.term').each(function(i, el) {
			
				var term = {};
				term.name = $(el).find('.term-label').text();
				term.courses = [];
				
				$(el).find('.course').each(function(i, el) {
					
					var courseName = $(el).find('span').text();
					
					var course = {};
					course.subjectCode = courseName.split(' ')[0];
					course.catalogNumber = courseName.split(' ')[1];
					
					term.courses.push(course);
				});
				
				year.terms.push(term);
			});
			
			data.years.push(year);
		});
		
		$.ajax({
			type: "GET",
			url: 'http://liouh.com/planner/data.php',
			data: {
				id: id, 
				name: name,
				data: JSON.stringify(data),
				action: "plan-update"
			},
			dataType: 'jsonp',
			complete: function() {
			//	console.log('Saved');
				$('#saving').fadeOut();
			}
		});
	}
	
	return {
		render: function() {
			
			var data = P.data;
			var classyear = 2015;
			if(!isDebug()) {
				data = P.main.planData;
				classyear = P.main.data.classyear.year;
			}
			
			var first = true;
			for(var plan in data) {
				
				plan = data[plan];
				var planData = JSON.parse(plan.data);
				
				var className = '';
				if(first) {
					className = 'selected';
				}
				$('#tabs').append('<li class="' + className + '" data-for="' + plan.id + '">' + plan.name + '</li>');
				
				className = ' hidden';
				if(first) {
					first = false;
					className = '';
				}
				
				var html = '<div class="plan' + className + '" data-plan="' + plan.id + '">';
				
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
				
				update();
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
							
							update();
						}
					}
				});
			});
			
			$('.course-list').sortable({
				connectWith: '.course-list',
				stop: function(e) {
					update();
				}
			});
			
			Chegg.Canvas.resize();
		},
		
		load: function(){
			P.mainModel = new P.main.model();
		}
	}
}
