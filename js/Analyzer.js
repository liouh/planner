P('main.Analyzer');
P.main.Analyzer.data = {};

P.Analyzer = (function(){
	//P('Analyzer.data');

	// PRIVATE
	function _initAnalyzer(){
							
		//P('Analyzer.data.gauges');
		P.main.Analyzer.data.gauges= [];
		
		P.main.Analyzer.data.gauges[0] = createNewGauge('jGaugeMoney'); // Create a new jGauge.
		P.main.Analyzer.data.gauges[1] = createNewGauge('jGaugeTime'); // Create a new jGauge.
		P.main.Analyzer.data.gauges[2] = createNewGauge('jGaugeJoy'); // Create a new jGauge.
		
		P.main.Analyzer.data.gauges[0].init(); // Put the jGauge on the page by initialising it.
	      P.main.Analyzer.data.gauges[1].init(); // Put the jGauge on the page by initialising it.
	      P.main.Analyzer.data.gauges[2].init(); // Put the jGauge on the page by initialising it.
	      
	      P.main.Analyzer.data.gauges[0].setValue(10);
	      P.main.Analyzer.data.gauges[1].setValue(10);
	      P.main.Analyzer.data.gauges[2].setValue(10);
	      
	      P.main.Analyzer.data.gauges[0].setValue(0);
	      P.main.Analyzer.data.gauges[1].setValue(0);
	      P.main.Analyzer.data.gauges[2].setValue(0);
	      
	      P.main.Analyzer.data.gauges[0].setValue(5.5);
	      P.main.Analyzer.data.gauges[1].setValue(6);
	      P.main.Analyzer.data.gauges[2].setValue(8);
	      		      
	      var ticksArr = $('.tick-label');
	      ticksArr[0].innerText = '$';
	      ticksArr[1].innerText = '$$';
	      ticksArr[2].innerText = '$$$';
	      ticksArr[3].innerHTML = "<img src='img/timer_clock_15w.png' class='timer-clock'/>";
	      ticksArr[3].style.top = "94px";
	      ticksArr[4].innerHTML = "<img src='img/timer_clock_15w.png' class='timer-clock'/><img src='img/timer_clock_15w.png' class='timer-clock'/>";
	      ticksArr[5].innerHTML = "<img src='img/timer_clock_15w.png' class='timer-clock'/><img src='img/timer_clock_15w.png' class='timer-clock'/><img src='img/timer_clock_15w.png' class='timer-clock'/>";
	      ticksArr[5].style.left = "110px";
	      ticksArr[5].style.top = "94px";
	      ticksArr[6].innerHTML = "&#9785;";
	      ticksArr[7].innerHTML = '&#9786;&#9786;';
	      ticksArr[8].innerHTML = "&#9786;&#9786;&#9786;";
	      ticksArr[8].style.left = "98px";
	      
	      
	}
	
	//PUBLIC
	function createNewGauge (id){					
		var myGauge = new jGauge();
		myGauge.id = id;
		myGauge.ticks.count = 3;
		myGauge.label.xOffset = -2000;
		return myGauge;					
	}

	function getModelData(){
		return P.main.Analyzer.data;
	}
	function getSettings(){
		return P.main.Analyzer.options;
	}
	function setModelData(k,v){
		P.main.Analyzer.data[k].setValue(v);
	}
	function updateModelData(flag) {
		
		if(flag == "reset" ) {
			resetGauges();
		} else {
		
					
	      var data = P.main.planData;
	      // data = [{"id":"2","name":"Computer Science","email":"henry@chegg.com","data":"{\"id\":\"2\",\"email\":\"henry@chegg.com\",\"name\":\"Computer Science\",\"years\":[{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]}]}","created":"2013-02-20 22:39:06"},{"id":"1","name":"Economics","email":"henry@chegg.com","data":"{\"id\":\"1\",\"email\":\"henry@chegg.com\",\"name\":\"Economics\",\"years\":[{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106B\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"106A\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"51\"}]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"52\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]},{\"terms\":[{\"name\":\"Fall\",\"courses\":[]},{\"name\":\"Spring\",\"courses\":[{\"subjectCode\":\"CS\",\"catalogNumber\":\"108\"},{\"subjectCode\":\"MATH\",\"catalogNumber\":\"53\"}]}]}]}","created":"2013-02-20 19:51:42"}]
	      // P.main.planData = data;
	      
	      if(data) {
	      	//var classyear = data.classyear.year;
	      	var classyear = 2016;
	      	var extremeFactor = 1.25;
	      

			var sid = $('.selected[data-for]').attr('data-for');
			sid=2;
			var msg="";//"selected tab:" + id +'\n';
			var courseCount=0, majorCount=0;
				for(var plan in data) {
					
					plan = data[plan];
					var planData = JSON.parse(plan.data);
					
					var className = '';
					
					
					
					msg += '\n>>plan:' + planData.id+'\n';
										
					if(planData.id == sid) {
					
						msg+=',sid:'+sid;
					
						for(var y=0;y<planData.years.length;y++){						
							year = planData.years[y];
							msg+='year:'+(classyear - y)+'\n';
							
							for(var term in year.terms) {
							
								term = year.terms[term];
								msg += 'term: '+term.name;
								courseCount=0;
								
								for(var course in term.courses) {
								
									course = term.courses[course];
									courseCount++;
									
								}										
								msg+=',courses:' + courseCount+'\n';
								majorCount += courseCount;
								
								if(courseCount>4) {
									extremeFactor = 3;
								}
							}
							
						}
					}
				}
				
				if(majorCount > 32) {
					extremeFactor = 3
				}
				msg+='\nmajorCount = ' + majorCount;
	      		// console.log(msg);
	      	
	      }
	    	      
	      P.main.Analyzer.data.gauges[0].setValue(2*extremeFactor);
	      P.main.Analyzer.data.gauges[1].setValue(.5*extremeFactor);
	      P.main.Analyzer.data.gauges[2].setValue(.5*extremeFactor);	
	      
	      					
		
		}	
	}
	
	function checkRules() {
		var count = 0,
			tooMuch = 4,
			flag = false;
		
		//iterate through data and determine true or flase
			if(flag) {
				
			} else {
				
			}
			
		}
		
		function resetGauges(){
			for(var i=0;i<P.main.Analyzer.data.gauges.length;i++) 
					P.main.Analyzer.data.gauges[i].setValue(0);	
		}
		
		_initAnalyzer();
		
		return {
	       init: function (options) {
	            $.extend(options);
	        },
	        debug: function () {
	            return {
	                settings: getSettings(),
	                data: getModelData()
	            };
	        },
	        setData: function (k, v) {
	            setModelData(k,v);
	        },
	        getData: function (){
	        	getModelData();
	        },
	        update: function (flag){
	        	updateModelData(flag);
	        }
		}
		
})();
	
	
	
   //Update analyzer
function updateAnalyzer(flag)
{
	P.Analyzer.update(flag);
}