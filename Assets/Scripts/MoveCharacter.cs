using UnityEngine;
using System.Collections;

public class MoveCharacter : MonoBehaviour {
	public float speed_x = 6f;
	public float speed_z = 7f;

	// Use this for initialization
	void Start () {
	}

	// Update is called once per frame
	void Update() {
		float translation_z = Input.GetAxis("Vertical") * speed_z;
		float translation_x = Input.GetAxis("Horizontal") * speed_x;
		translation_z *= Time.deltaTime;
		translation_x *= Time.deltaTime;
		transform.Translate(translation_x, 0, translation_z);
	}
}