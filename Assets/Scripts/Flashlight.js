
 #pragma strict

//variables
//A borismediaprods invention
var flight : Light; //Creates a light object in our script
@script RequireComponent(AudioSource); //Checks for an audio-source

function Start () {
//.....useless
}

function Update () {

    if(Input.GetKeyDown("f") || Input.GetMouseButtonDown(1)){ //What happens when we press "f" or when we click the left mouse button
	GetComponent.<AudioSource>().Play();//Plys the audiosource sound
		
        if(flight.enabled){ //And if we clicked the left mouse button or pressed f and light is already on
		
		flight.enabled = false; //Light turns off
		GetComponent.<AudioSource>().Play(); //The sound plays again, because we turned it off
		}
	else{ //otherwise if none of these above are true
	flight.enabled = true;
		}//Light will be set to trur
	}
}

//DO NOT FORGET TO SUBSCRIBE, COMMENTED SO YOU GUYS CAN UNDERSTAND
