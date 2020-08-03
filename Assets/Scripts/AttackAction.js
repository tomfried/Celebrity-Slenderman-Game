#pragma strict

public var dodecahedron : GameObject;
public var thePlayer : Transform;
private var Distance = 100;
public var animator : Animator;
private var midSwing = false;
private var timer = 0;
public var angle = 10;
private var dot = 0.0;
private var waiting = false;
var dirFromAtoB : Vector3;
//public var agent : NavMeshAgent;
public var loseGameDisplay : GameObject;
public var hurtDisplay : GameObject;
private var died = false;

function Start () {
    //animator.Play("Walk");
    //animator = dodecahedron.GetComponent<Animator>();
    //agent = GetComponent.<NavMeshAgent>();
}

function Update () {
	//agent.SetDestination (thePlayer.position);
	//dot = Vector3.Dot(thePlayer.transform.forward, (transform.position - dodecahedron.transform.position));
	dirFromAtoB = (dodecahedron.transform.position - thePlayer.transform.position).normalized;
    dot = Vector3.Dot(dirFromAtoB, thePlayer.transform.forward);

	//Distance = Vector3.Distance(theEnemy.position - thePlayer.position);
	Distance = Vector3.Distance(thePlayer.position, transform.position);
	//GetComponent<Rigidbody>().freezeRotation = true;
	//Debug.Log("dot: " + dot + " for: " + dodecahedron);

	//if in attack range and player is facing a celebrity
	/*if(Distance < 4 && dot >= .8) {
	    if(!midSwing) {
	    	animator.Play("Attack-Swipe", 0);
	    	midSwing = true;
	    	waiting = false;
	    }
	}*/
	if(Distance < 4) {
	    if(!midSwing) {
	    	animator.Play("Attack-Swipe", 0);
	    	hurt();
	    	midSwing = true;
	    	//waiting = false;
	    	if(!died) {
	    		deathDelay();
	    		died = true;
	    	}
	    }
	}
	//else if player was in attack range while he didn't notice the celebrity snuck up behind him
	//him and start waiting and you just now turned to face him/her
	/*else if(waiting && dot >= .8) {
	    animator.Play("Attack-Swipe", 0);
	    midSwing = true;
	    waiting = false;
	}
	//else if player is in attack range but the player wasn't looking at the celebrity
	else if(Distance < 4 && !waiting && !midSwing) {
	    waiting = true;
	    animator.Play("Idle", 0);
	}*/
	//else if player is in range but player has not noticed the celebrity (player hasn't turned around yet)
	/*else if(Distance < 4 && !midSwing) {
	   animator.Play("Idle", 0);
	}*/
	//else if player is in the process of performing an attack animation
	else if(midSwing) {
	    //waiting = false;
		if(timer > 4) {
	    	midSwing = false;
	    	timer = 0;
	    }
	    else
	    	timer++;
	}
	//else if player is within looking distance (flashlight view) of the celebrity
	else if(Distance < 70 && !midSwing) {
	    //animator.runtimeAnimatorController = Resources.Load("Jog") as RuntimeAnimatorController;
	    animator.Play("Walk", 0);
	}
	else
		animator.Play("Idle", 0);

    	/*if(Distance < 4) {
	    //animator.runtimeAnimatorController = Resources.Load("Attack-SlashChop") as RuntimeAnimatorController;
	    if(!midSwing) {
	    	animator.Play("Attack-Swipe", 0);
	    	midSwing = true;
	    }
	    else if(timer < 2) {
	    	midSwing = false;
	    	timer = 0;
	    }
	    else
	    	timer++;
	    //animator.CrossFade(string stateName, float transitionDuration, int layer = -1, float normalizedTime = float.NegativeInfinity);

	}*/
    //animator.Play("Attack");
	//animator.runtimeAnimatorController = Resources.Load("Attack") as RuntimeAnimatorController;
	//dodecahedron = GetComponent("Animator").StringToHash("Attack");
	//Distance = Vector3.Distance(Target.position, transform.position);
	//Distance = (theEnemy.position - thePlayer.position).normalized;
	//Distance = Vector3.Distance(theEnemy.transform.position - thePlayer.transform.position);
	/*if(Distance > Damping) {
	    dodecahedron.animation.CrossFade(animation);
	}*/
	/*if (Distance > chaseRange)
	{
		idle ();
	}

	if (Distance < attackRange)
	{
		attack ();
	}
	if (Distance < chaseRange)
	{
		run ();    
	}*/
}
function hurt () {
		hurtDisplay.SetActive(true);
		yield WaitForSeconds(.5);
		hurtDisplay.SetActive(false);
}

function deathDelay () {
	yield WaitForSeconds(1);
	if(Vector3.Distance(thePlayer.position, transform.position) <= 4) {
		Cursor.lockState = CursorLockMode.None;
		Cursor.visible = true;
		Time.timeScale = 0;
		loseGameDisplay.SetActive(true);
	}
	else
		died = false;
}


/*function idle ()
{
	animation.CrossFade ("idle");
}

function attack ()
{
	animation.CrossFade ("attack");
}

function run ()
{
	animation.CrossFade ("run");
}*/

 /*var target : Transform;
 var dodecahedron : GameObject;
 var detectRange: float = 30;
 public var animation = "";
 
 function Update() {
	 var tgtDirection = target.position - transform.position;  
	 var tgtDistance = tgtDirection.magnitude;
	 if (tgtDistance <= detectRange) {
		 dodecahedron.animation.Play(animation);
	 }
 }*/