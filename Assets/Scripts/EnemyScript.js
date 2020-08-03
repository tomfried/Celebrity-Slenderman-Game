 #pragma strict
 //@script RequireComponent( AudioSource )

 public var thePlayer : Transform;
 private var theEnemy : Transform;

 public var speed : float = 8.0;

 var isOffScreen : boolean = false;
 public var offscreenDotRange : float = 0.7;

 var isVisible : boolean = false;
 public var visibleDotRange : float = 0.8; // ** between 0.75 and 0.85 (originally 0.8172719)

 var isInRange : boolean = false;

 public var followDistance : float = 20.0;
 public var maxVisibleDistance : float = 20.0;

 public var startingDistance : float = 2000.0;
 private var firstPaperDistance : float = 24.0;

 private var sqrDist : float = 0.0;

 public var health : float = 100.0;
 public var damage : float = 20.0;

 public var enemySightedSFX : AudioClip;

 private var hasPlayedSeenSound : boolean = false;
 var animator: Animator;

 private var colDist : float = 5.0; // raycast distance in front of enemy when checking for obstacles


 function Start()
 {
     if ( thePlayer == null )
     {
         thePlayer = GameObject.Find( "Player" ).transform;
     }

     theEnemy = transform;

     firstPaperDistance = followDistance;
     followDistance = startingDistance;

     InvokeRepeating( "TeleportEnemy", 1, 10 );
 }

 function Update()
 {
     // Movement : check if out-of-view, then move
     CheckIfOffScreen();

     // if is Off Screen, move
     if ( isOffScreen )
     {
         MoveEnemy();
     }
     else
     {
         // check if Player is seen
         //CheckIfVisible();

         if ( isVisible )
         {
             // stop moving
             StopEnemy();
         }
         else
         {
             // check max range
             CheckMaxVisibleRange();

             // if far away then move, else stop
             if ( !isInRange )
             {
                 MoveEnemy();
             }
             else
             {
                 StopEnemy();
             }
         }
     }

 }

 function CheckIfOffScreen()
 {
     var fwd : Vector3 = thePlayer.forward.normalized;
     var other : Vector3 = (theEnemy.position - thePlayer.position).normalized;

     var theProduct : float = Vector3.Dot( fwd, other );

     if ( theProduct < offscreenDotRange )
     {
         isOffScreen = true;
     }
     else
     {
         isOffScreen = false;
     }
 }


 function MoveEnemy()
 {
     // Check the Follow Distance
     CheckDistance();

     // if not too close, move
     if ( !isInRange )
     {
         GetComponent.<Rigidbody>().velocity = Vector3( 0, GetComponent.<Rigidbody>().velocity.y, 0 ); // maintain gravity

         // --
         // Old Movement
         //transform.LookAt( thePlayer );
         //transform.position += transform.forward * speed * Time.deltaTime;
         // --

         // New Movement - with obstacle avoidance
         var dir : Vector3 = ( thePlayer.position - theEnemy.position ).normalized;
         var hit : RaycastHit;

         if ( Physics.Raycast( theEnemy.position, theEnemy.forward, hit, colDist ) )
         {
             //Debug.Log( " obstacle ray hit " + hit.collider.gameObject.name );
             if ( hit.collider.gameObject.name != "Player" && hit.collider.gameObject.name != "Terrain" )
             {
                 dir += hit.normal * 20;
             }
         }

         var rot : Quaternion = Quaternion.LookRotation( dir );

         theEnemy.rotation = Quaternion.Slerp( theEnemy.rotation, rot, Time.deltaTime );
         theEnemy.position += theEnemy.forward * speed * Time.deltaTime;
         //navMeshAgent agent
         //agent.setDesination(target.position);
     }
     else
     {
         StopEnemy();
     }
 }


 function StopEnemy()
 {
     transform.LookAt( thePlayer );
     GetComponent.<Rigidbody>().velocity = Vector3.zero;
 }


 /*function CheckIfVisible()
 {
     var fwd : Vector3 = thePlayer.forward.normalized;
     var other : Vector3 = ( theEnemy.position - thePlayer.position ).normalized;

     var theProduct : float = Vector3.Dot( fwd, other );

     if ( theProduct > visibleDotRange )
     {
         // Check the Max Distance
         CheckMaxVisibleRange();

         if ( isInRange )
         {
             // Linecast to check for occlusion
             var hit : RaycastHit;

             if ( Physics.Linecast( theEnemy.position + (Vector3.up * 1.75) + theEnemy.forward, thePlayer.position, hit ) )
             {
                 Debug.Log( "Enemy sees " + hit.collider.gameObject.name );

                 if ( hit.collider.gameObject.name == "Main Camera" )
                 {
                     isVisible = true;
                 }
                 /*else if ( hit.collider.gameObject.name != "Main Camera" )
                 {
                     animator.runtimeAnimatorController = Resources.Load("Attack") as RuntimeAnimatorController;
                 }
             }
         }
         else
         {
             isVisible = false;
         }
     }
     else
     {
         isVisible = false;
     }
 }*/


 function CheckDistance()
 {
     var sqrDist : float = (theEnemy.position - thePlayer.position).sqrMagnitude;
     var sqrFollowDist : float = followDistance * followDistance;

     if ( sqrDist < sqrFollowDist )
     {
         isInRange = true;
     }
     else
     {
         isInRange = false;
     }
 }


 function CheckMaxVisibleRange()
 {
     var sqrDist : float = (theEnemy.position - thePlayer.position).sqrMagnitude;
     var sqrMaxDist : float = maxVisibleDistance * maxVisibleDistance;

     if ( sqrDist < sqrMaxDist )
     {
         isInRange = true;
     }
     else
     {
         isInRange = false;
     }
 }


 function SetFirstPaperDistance()
 {
     followDistance = firstPaperDistance;
 }


 function TeleportEnemy()
 {
     // Movement : check if out-of-view, then move
     CheckIfOffScreen();

     // if is Off Screen, check for Teleport
     if ( isOffScreen )
     {
        // Check the Follow Distance
        CheckDistance();

        // if not too close, Teleport
        if ( !isInRange )
        {
          // determine a position to teleport to
          var teleportDistance : float = 50.0; // teleport 50 units to the right of the player (thePlayer.right)

          var rndPos : int = -1;

          if ( Random.Range( 0, 2 ) == 1 )
          {
              rndPos = 1;
          }
          
          var newPos : Vector3 = thePlayer.position + ( rndPos * thePlayer.right * teleportDistance );

          newPos.y = 1000.0;

          // raycast to that position
          var hit : RaycastHit;

          if ( Physics.Raycast( newPos, -Vector3.up, hit, 1000.0 ) )
          {
           // check if it hit the terrain
           if ( hit.collider.gameObject.name == "Terrain" )
           {
               // move the enemy to the new position (add a little to the y so it doesn't fall through)
               theEnemy.position = hit.point + ( Vector3.up * 0.5 );
               theEnemy.LookAt( thePlayer );
           }
          }
        }
     }
 }