function submitAnswers(){
	var total = 5;
	var score = 0;
	
	
	var q1 = document.forms["quizForm"]["q1"].value;
	var q2 = document.forms["quizForm"]["q2"].value;
	var q3 = document.forms["quizForm"]["q3"].value;
	var q4 = document.forms["quizForm"]["q4"].value;
	var q5 = document.forms["quizForm"]["q5"].value;
	
	
	for(i = 1; i <= total;i++){
		if(eval('q'+i) == null || eval('q'+i) == ''){
			alert('You Missed Question ' +i);
			return false;
		}
	}
	
	
	var answers = ["d","a","a","b","a"];
	
	
	if(q1 == answers[0]){
		score++;
	}
	if(q2 == answers[1]){
		score++;
	}
	if(q3 == answers[2]){
		score++;
	}
	if(q4 == answers[3]){
		score++;
	}
	if(q5 == answers[4]){
		score++;
	}
	
	var results = document.getElementById('results');
	results.innerHTML = '<p> You Scored <span>'+score+'</span> out of <span>'+total+'</span></p>';
	document.getElementById('results').style.display = 'block';
	//alert('You Scored '+ score +' out of ' + total);
	
	return false;
}