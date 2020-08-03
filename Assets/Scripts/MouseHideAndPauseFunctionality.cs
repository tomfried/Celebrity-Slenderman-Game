using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class MouseHideAndPauseFunctionality : MonoBehaviour {

	private bool mouseVisible = false;
	public GameObject[] pauseObjects;

	//Hides mouse cursor
	void Start () {
		Cursor.lockState = CursorLockMode.Locked;
		Cursor.visible = false;
	}
	
	/*If user hits "ESC" it will either show the pause menu game while stopping the game or it will resume
	and thus hide the pause menu and once again make the mouse cursor disappear. */
	void Update () {
		if (Input.GetKeyUp(KeyCode.Escape)) {
			mouseVisible = !mouseVisible;
			if (mouseVisible) {
				Cursor.lockState = CursorLockMode.None;
				Cursor.visible = true;
				Time.timeScale = 0;
				showPaused ();
			} 
			else {
				Cursor.lockState = CursorLockMode.Locked;
				Cursor.visible = false;
				Time.timeScale = 1;
				hidePaused ();
			}
		}
	}

	//Shows the pause game Menu Options & reveals mouse cursor
	public void showPaused(){
		foreach(GameObject g in pauseObjects){
			g.SetActive(true);
		}
	}

	//Hides the pause game Menu Options & hides mouse cursor
	public void hidePaused(){
		foreach(GameObject g in pauseObjects){
			g.SetActive(false);
		}
		//is the act of resuming the game by hitting the "Resume" button
		if (Cursor.visible == true) {
			mouseVisible = !mouseVisible;
			Cursor.lockState = CursorLockMode.Locked;
			Cursor.visible = false;
			Time.timeScale = 1;
		}
	}

	//Return to main
	public void Return_To_Main_Menu(){
		mouseVisible = !mouseVisible;
		Cursor.lockState = CursorLockMode.None;
		Cursor.visible = true;
		Time.timeScale = 1;
	}
}
