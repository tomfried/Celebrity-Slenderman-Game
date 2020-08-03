using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class ChangeScene : MonoBehaviour {

	public void ChangeToScene(string scene) {
		SceneManager.LoadScene(scene);
	}

	public void Quit() {
		Application.Quit();
	}
}