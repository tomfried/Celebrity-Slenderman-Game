using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class MyUnitySingleton : MonoBehaviour {

	private static MyUnitySingleton instance = null;

	public static MyUnitySingleton Instance {
		get { return instance; }
	}

	void Awake() {
		if (instance != null && instance != this) {
			Destroy(this.gameObject);
			return;
		} 
		else
		{
			instance = this;
		}
		DontDestroyOnLoad(this.gameObject);
	}

	void Update(){
		//if (Application.loadedLevelName == "play") {
		if (SceneManager.GetActiveScene().name == "gamemode") {	
			if(this.gameObject == instance.gameObject)
				Destroy (this.gameObject);
		}
	}

}
