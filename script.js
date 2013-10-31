/*************
Stephan Conzen
  100315309
 Trivia X Ten
*************/

// variables for counting and displaying text field information
// display current question number
var questionNum = 0;
// display point value for current question
var pointsNum = 0;
// display total score, sum of correctly answered questions' point values
var scoreNum = 0;

// array to store question, 4 possible answers, 1 correct answer for comparison and point value
var content = new Array;
content[0] = ["What are the circumstances of Obi-Wan Kenobi's death in Star Wars IV: A New Hope?", 
				"He falls to his death while turning off the power for the Death Star's tractor beam", 
				"He dies in the explosion of the Death Star", 
				"He sacrifices himself in a light-saber battle with Darth Vader", 
				"He is shot by an imperial stormtrooper", 
				"He sacrifices himself in a light-saber battle with Darth Vader", 
				10];
content[1] = ["Which of these minor 'Star Wars' characters does not die in the film 'Star Wars IV: A New Hope'?", 
				"Aunt Beru", 
				"Grand Moff Tarkin", 
				"Wedge", 
				"Uncle Owen", 
				"Wedge", 
				15];
content[2] = ["What is the name of the green reptilian-like bounty hunter that Han Solo kills in the cantina at Mos Eisley, Tatooine in 'Star Wars IV: A New Hope'?", 
				"Hammerhead", 
				"Wioslea", 
				"Hrchek Kal Fas", 
				"Greedo", 
				"Greedo", 
				5];
content[3] = ["Another minor character in 'Star Wars IV: A New Hope' is a pal of Luke Skywalker's from Tatooine who dies in the attack on the Death Star. What is this poor fellow's name?", 
				"Biggs", 
				"Ozzel", 
				"Hughes", 
				"Senesca", 
				"Biggs", 
				10];
content[4] = ["In the film 'Star Wars V: The Empire Strikes Back' Darth Vader uses his command of the force to execute one of his top commanders after the Millennium Falcon escapes his grasp. What is the name of the poor fellow that feels Vader's wrath?", 
				"Admiral Veers", 
				"Admiral Trebor", 
				"Captain Panaka", 
				"Captain Needa", 
				"Captain Needa", 
				15];
content[5] = ["What is the name of the creature that consumes Boba Fett?", 
				"Chirpa", 
				"Sarlacc", 
				"Logray", 
				"Teebo", 
				"Sarlacc", 
				10];
content[6] = ["Which character from the original trilogy performs the dirty work of killing the slug-like Jabba?", 
				"Lando", 
				"Luke", 
				"Leia", 
				"Han Solo", 
				"Leia", 
				5];
content[7] = ["On which planet does Jedi Master Yoda leave the Star Wars universe?", 
				"Hoth", 
				"Bespin", 
				"Tatooine", 
				"Dagobah", 
				"Dagobah", 
				10];
content[8] = ["'Droids don't pull people's arms out of their sockets when they lose. Wookes are known to do that'", 
				"C-3PO", 
				"Obi-Wan Kenobi", 
				"Han Solo", 
				"Luke Skywalker", 
				"Han Solo", 
				5];
content[9] = ["During a climactic battle in Return of the Jedi, which rebel leader shouted out 'It's a trap'?", 
				"Admiral Akbar", 
				"General Rieekan", 
				"General Dodonna", 
				"General Willard", 
				"Admiral Akbar", 
				15];

// onload function to add event listener click on the next question button
// to run the function "clickButton"
window.onload = function() {
	button = document.getElementById("button");
	button.addEventListener("click", clickButton);
}

// function to be run when button is clicked
function clickButton() {
	// remove event listener to prevent skipping of question
	button.removeEventListener("click", clickButton);
	// remove all answers
	if (document.body.lastChild.tagName == "OL") {
		document.body.removeChild(document.body.lastChild);
	}
	// remove question
	if (document.body.lastChild.tagName == "P") {
		document.body.removeChild(document.body.lastChild);
	}
	
	// creating question paragraph
	questionPara = document.createElement("p");
	questionPara.setAttribute('class', 'question');
	
	// if 10 questions have been passed, display message and final score
	if (questionNum > 9) {
	
		// create the end game text with total score retreived from the 
		// scoreNum textfield and then appended to the question paragraph
		questionText = document.createTextNode("Thanks for playing TRIVIA X TEN! " + 
		"Your score in this round was " + document.getElementById("scoreNum").value);
		questionPara.appendChild(questionText);
		document.body.appendChild(questionPara);
	}
	
	// otherwise post next question
	else {
	
		// passes the question string from array to questionText
		questionText = document.createTextNode(content[questionNum][0]);
		// adds the question string to the question paragraph
		questionPara.appendChild(questionText);
		// adds the question paragraph to the body of the document
		document.body.appendChild(questionPara);
		
		// creates the ol ordered list element
		answerOlist = document.createElement("ol");
		// for loop to cycle through the following process 4 times, creating 4 li's
		for (var i = 1; i <= 4; i++) {
			// creates the li list element and passes it to "answerList"
			answerList = document.createElement("li");
			// sets the class of the li to regular
			answerList.setAttribute('class', 'regular');
			// sets the id of the li to id plus the counter, giving each created li a unique id ie. id1, id2, etc...
			answerList.setAttribute('id', 'id'+ i);
			// passes the string of the first possible answer to "answerText"
			answerText = document.createTextNode(content[questionNum][i]);
			// adds the answer string to the li
			answerList.appendChild(answerText);
			// adds the li to the ol
			answerOlist.appendChild(answerList);
			// adds the ol to the body of the document
			document.body.appendChild(answerOlist);
			// adds the mouseover event listener to the li to highlight the answer when hovering over with the cursor (see function highLight())
			document.getElementById("id" + i).addEventListener("mouseover",highLight);
			// adds the mouseout event listener to restore the class name, removing the highlighting effect when cursor moves away (see function restore())
			document.getElementById("id" + i).addEventListener("mouseout",restore);
			// adds the click event listener to allow the user to create a selection (see function selection())
			document.getElementById("id" + i).addEventListener("click", selection);
		}
		// displays the current question number in the textfield questionNum
		// offset by +1 to adjust for array numbering
		document.getElementById("questionNum").value = questionNum+1;
		// displays the current questions' point value in the textfield pointsNum
		document.getElementById("pointsNum").value = content[questionNum][6];
	}
}	

// function to change className of answer the user is hovering over (mouseover)
function highLight() {
	this.className = 'special';
}

// function to restore the className of answer user was hovering over but has moved away from (mouseout)
function restore() {
	this.className = 'regular';
}

// function to highlight the users selected answer
function selection() {
	// the text content of the selected li is passed to "userInput"
	userInput = this.textContent;
	answerLi = document.getElementsByTagName("LI");
	// if statement to compare the user input to the correct answer stored in the array "content"
	// if the answer is correct...
	if (userInput == content[questionNum][5]) {
		// the selected answer is highlighted green by changing the class name to "win"
		this.className = 'win';
		// and the score is updated with correctly answered questions point value
		document.getElementById("scoreNum").value = parseInt(document.getElementById("scoreNum").value) + parseInt(content[questionNum][6]);
	}
	
	// otherwise...
	else {
		// the selected wrong answer is highlighted red by changing the class name to "lose"
		this.className = 'fail';
		// and in order to find the correct answer, the for loop cycles through the possible li elements
		// and compares it to the correct answer in the array "content"
		// and then highlights the correct answer green, by changing the class name to "win"
		// however the score is not updated
		for (var k = 1; k <=4; k++) {
			if (answerLi[k-1].textContent == content[questionNum][5]) {
				document.getElementById("id" + k).className = 'win';
			}
		}
	}
	
	// for loop to cycle through the li elements and remove all event listeners so the user can not make any further selections
	for (var j = 0; j <=3; j++) {
		answerLi[j].removeEventListener("click", selection);
		answerLi[j].removeEventListener("mouseout",restore);
		answerLi[j].removeEventListener("mouseover",highLight);
	}
	
	// counts up the questionNum variable to display the next question when the button is pushed
	questionNum++;
	// adds the event listener back to the button once the question has been answered so user can proceed
	button.addEventListener("click", clickButton);
	
}
