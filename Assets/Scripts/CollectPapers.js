#pragma strict
 @script RequireComponent( AudioSource )

 import UnityEngine.UI;
 import UnityEngine.SceneManagement;
 var papers : int = 0;
 var papersToWin : int = 8;
 var distanceToPaper : float = 4;
 public var text : UI.Text;
 //public var paperPickup : AudioClip;
 public var paperPickup : AudioSource;
 public var winGameDisplay : GameObject;


 //var theEnemy : EnemyScript;
  
 function Start()
 {   
 	text.text = papers.ToString() + " out of " + papersToWin.ToString() + " Photographs"; 
     // find and store a reference to the enemy script (to reduce distance after each paper is collected)
     /*if ( theEnemy == null )
     {
         var nme : GameObject = GameObject.Find( "Enemy" );
         
         if ( nme )
         {
             theEnemy = nme.GetComponent( EnemyScript );
         }
     }*/
 }
  
 function Update()
 {
     //if ( Input.GetMouseButtonUp(0) ) // use E in editor as LockCursor breaks with left mouseclick
     if ( Input.GetMouseButtonDown(0) || Input.GetKeyDown(KeyCode.E) )
     {
         //var ray = Camera.main.ScreenPointToRay( Input.mousePosition ); // always cast ray from center of screen
         var ray = Camera.main.ScreenPointToRay( Vector3( Screen.width * 0.5, Screen.height * 0.5, 0.0 ) );
         var hit : RaycastHit;
         if ( Physics.Raycast( ray, hit, distanceToPaper ) )
         {
             //if ( hit.collider.gameObject.tag == "Paper" )
             if ( hit.collider.gameObject.name == "Paper" )
             {
                 papers += 1;
                 text.text = papers.ToString() + " out of " + papersToWin.ToString() + " Photographs";
                 //Debug.Log( "A paper was picked up. Total papers = " + papers );
                 //GetComponent.<AudioSource>().PlayClipAtPoint( paperPickup, transform.position );
                 Destroy( hit.collider.gameObject );
                 paperPickup.Play ();
             }
         }
     }
 }
  
  
 function OnGUI()
 {
     if ( papers < papersToWin )
     {
		GUI.Box( Rect( (Screen.width * 0.5) - 60, 10, 120, 25 ), "" + papers.ToString() + " Photographs" );
     }
     else
     {
		winGameDisplay.SetActive(true);
		Cursor.lockState = CursorLockMode.None;
		Cursor.visible = true;
		Time.timeScale = 0;
     }
 }