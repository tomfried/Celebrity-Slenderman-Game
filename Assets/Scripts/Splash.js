#pragma strict

import UnityEngine.SceneManagement;
public var jumper : GameObject;
public var player : Transform;
public var speed = 0.0;
private var ready = false;
private var Distance : int;

function Start () {
	//do nothing
}

function Update () {
	if(!ready) {
		Distance = Vector3.Distance(player.position, transform.position);
		transform.Translate (0, 0, (speed * Time.deltaTime));
		if(Distance < 5.5) {
			SceneManager.LoadScene("main");
		}
		speed++;
		//transform.Translate (0, 0, -10 * Time.deltaTime);
		//transform.position += transform.forward * speed * Time.deltaTime;
	}
}