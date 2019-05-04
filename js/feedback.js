function submitFeedback() {

	var user = document.getElementById("userName").value //initial user input
	var feedback = document.getElementById("feedbackHere").value //user feedback in form
	
	var userName = document.createTextNode(user + " says...")  
	var comment = document.createTextNode(feedback)

	var userContent = document.createElement("h4")
	userContent.appendChild(userName)
	var commentBody = document.createElement("p")
	commentBody.appendChild(comment)

	var divWrapper = document.createElement("div") 

	var listUsers = document.createElement("li")
	
	listUsers.className = "userlist"
	divWrapper.className= "well well-lg"


	divWrapper.appendChild(userContent) 
	divWrapper.appendChild(commentBody) 
	listUsers.appendChild(divWrapper) /
	document.getElementById("listAll").appendChild(listUsers)	


}