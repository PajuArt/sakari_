var points = 0;
var state = "start";	// State can be either 'start', 'main', 'loss', 'victory' or 'after'

$(document).ready( function()
{
	// Bind all button clicks to a corresponding function
	document.getElementById("submit_score").onclick = SubmitScore;
	document.getElementById("save").onclick = Save;
	document.getElementById("load").onclick = Load;
	document.getElementById("start").onclick = toMainWindow;
	document.getElementById("yes").onclick = toVictoryWindow;
	document.getElementById("no").onclick = toLossWindow;
	document.getElementById("continue").onclick = toAfterGameWindow;
	
	// Request the service to set the resolution of the iframe correspondingly
	var msg =  
	{
		messageType: "SETTING",
		options: 
		{
			"width": 640, //Integer
			"height": 320 //Integer
		}
	};	
	window.parent.postMessage(msg, "*");
	
	// Call toStartWindow to start the game in a correct state
	toStartWindow();
});

// Listens to incoming messages.
window.addEventListener("message", function(event) 
{
	// If the messageType is LOAD then the game score and state will be loaded.
	if(event.data.messageType === "LOAD") 
	{
		// Check whether the 'score' member of gameState can be found before accessing the member
		if (event.data.gameState.score)
		{
			points = event.data.gameState.score;
			document.getElementById("score").innerHTML = points; // Set the html label "score" to right amount
		}
		else
		{
			points = 0;
		}
		
		// Check whether the 'state' member of gameState can be found before accessing the member
		if (event.data.gameState.state)
		{
			var loadedState = event.data.gameState.state

			// Add functionality for all of the expected states and default to toStartWindow()-function in case the state is something different
			switch(loadedState)
			{
				case "start":
					toStartWindow();
					break;
				case "main":
					toMainWindow();
					break;
				case "loss":
					toLossWindow();
					break;
				case "victory":
					toVictoryWindow();
					break;
				case "after":
					toAfterGameWindow();
					break;
				default:
					toStartWindow();
			}
		}
		else
		{
			toStartWindow;
		}
	} 
	// If the messageType is ERROR, then the game will display an error message as an alert.  
	else if (event.data.messageType === "ERROR") 
	{
		alert(event.data.info);
	}
});

// Sends this game's score to the service.
function SubmitScore() 
{
	var msg = 
	{
		"messageType": "SCORE",
		"score": points 
	};
	window.parent.postMessage(msg, "*");
}

// Sends this game's state to the service.
function Save()
{
	var msg = 
	{
		"messageType": "SAVE",
		"gameState": 
		{
			"state": state,
			"score": points
		}
	};
	window.parent.postMessage(msg, "*");
}

// Sends a request to the service for a state to be sent, if there is one.
function Load()
{
	var msg = 
	{
		"messageType": "LOAD_REQUEST",
	};
	window.parent.postMessage(msg, "*");
}

// Sets the state to 'main' and hides unneeded buttons and paragraphs
function toMainWindow()
{
	state = "main";
	document.body.style.backgroundImage = "url('sakari.png')";
	document.getElementById("submit_score").style.visibility = 'visible';
	document.getElementById("save").style.visibility = 'visible';
	document.getElementById("load").style.visibility = 'visible';
	document.getElementById("start").style.visibility = 'hidden';
	document.getElementById("yes").style.visibility = 'visible';
	document.getElementById("no").style.visibility = 'visible';
	document.getElementById("continue").style.visibility = 'hidden';
	document.getElementById("points").style.visibility = 'visible';
	document.getElementById("score").style.visibility = 'visible';
	document.getElementById("greeting").style.visibility = 'hidden';
	document.getElementById("main").style.visibility = 'visible';
	document.getElementById("victory").style.visibility = 'hidden';
	document.getElementById("loss").style.visibility = 'hidden';
}

// Sets the state to 'loss' and hides unneeded buttons and paragraphs
function toLossWindow()
{
	state = "loss";
	document.body.style.backgroundImage = "url('sakari-fail.png')";
	document.getElementById("submit_score").style.visibility = 'visible';
	document.getElementById("save").style.visibility = 'visible';
	document.getElementById("load").style.visibility = 'visible';
	document.getElementById("start").style.visibility = 'hidden';
	document.getElementById("yes").style.visibility = 'hidden';
	document.getElementById("no").style.visibility = 'hidden';
	document.getElementById("continue").style.visibility = 'visible';
	document.getElementById("points").style.visibility = 'visible';
	document.getElementById("score").style.visibility = 'visible';
	document.getElementById("greeting").style.visibility = 'hidden';
	document.getElementById("main").style.visibility = 'hidden';
	document.getElementById("victory").style.visibility = 'hidden';
	document.getElementById("loss").style.visibility = 'visible';
}

// Sets the state to 'victory' and hides unneeded buttons and paragraphs
function toVictoryWindow()
{
	state = "victory";
	document.body.style.backgroundImage = "url('sakari-success.png')";
	document.getElementById("submit_score").style.visibility = 'visible';
	document.getElementById("save").style.visibility = 'visible';
	document.getElementById("load").style.visibility = 'visible';
	document.getElementById("start").style.visibility = 'hidden';
	document.getElementById("yes").style.visibility = 'hidden';
	document.getElementById("no").style.visibility = 'hidden';
	document.getElementById("continue").style.visibility = 'visible';
	points = points+1;
	document.getElementById("score").innerHTML = points;
	document.getElementById("points").style.visibility = 'visible';
	document.getElementById("score").style.visibility = 'visible';
	document.getElementById("greeting").style.visibility = 'hidden';
	document.getElementById("main").style.visibility = 'hidden';
	document.getElementById("victory").style.visibility = 'visible';
	document.getElementById("loss").style.visibility = 'hidden';
}

// Sets the state to 'start' and hides unneeded buttons and paragraphs
function toStartWindow()
{
	state = "start";
	document.body.style.backgroundImage = "url('sakari.png')";
	document.getElementById("submit_score").style.visibility = 'hidden';
	document.getElementById("save").style.visibility = 'hidden';
	document.getElementById("load").style.visibility = 'hidden';
	document.getElementById("start").style.visibility = 'visible';
	document.getElementById("yes").style.visibility = 'hidden';
	document.getElementById("no").style.visibility = 'hidden';
	document.getElementById("continue").style.visibility = 'hidden';
	document.getElementById("points").style.visibility = 'hidden';
	document.getElementById("score").style.visibility = 'hidden';
	document.getElementById("greeting").style.visibility = 'visible';
	document.getElementById("main").style.visibility = 'hidden';
	document.getElementById("victory").style.visibility = 'hidden';
	document.getElementById("loss").style.visibility = 'hidden';
}

// Sets the state to 'after' and hides unneeded buttons and paragraphs
function toAfterGameWindow()
{
	state = "after";
	document.body.style.backgroundImage = "url('sakari.png')";
	document.getElementById("submit_score").style.visibility = 'visible';
	document.getElementById("save").style.visibility = 'visible';
	document.getElementById("load").style.visibility = 'visible';
	document.getElementById("start").style.visibility = 'visible';
	document.getElementById("yes").style.visibility = 'hidden';
	document.getElementById("no").style.visibility = 'hidden';
	document.getElementById("continue").style.visibility = 'hidden';
	document.getElementById("points").style.visibility = 'visible';
	document.getElementById("score").style.visibility = 'visible';
	document.getElementById("greeting").style.visibility = 'visible';
	document.getElementById("main").style.visibility = 'hidden';
	document.getElementById("victory").style.visibility = 'hidden';
	document.getElementById("loss").style.visibility = 'hidden';
}