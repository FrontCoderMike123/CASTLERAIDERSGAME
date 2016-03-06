#pragma strict

var waypoint : Transform[]; //empty array of transforms will hold all of our waypoints
public var enemySpeed : int = 3.0;
private var currentWaypoint : int;
public var moveAnimName : String;
public var idleAnimName : String;
public var attackAnimName : String;
private var attack = false;
private var canrun = true;
private var idle = true;

function Update() {
    if(currentWaypoint < waypoint.length) {
        var target : Vector3 = waypoint[currentWaypoint].position; //holds position of current waypoint
        var moveDirection : Vector3 = target - transform.position; //target is current waypoint pos - enemy pos
        var velocity = moveDirection.normalized * enemySpeed;
        var rotation = Quaternion.LookRotation(moveDirection);
        transform.rotation = rotation;

        if(moveDirection.magnitude < 1) {
            currentWaypoint++;
            GetComponent.<Animation>().Play(moveAnimName);
        }
    }else{
        currentWaypoint = 0;//play with this and others to make it NOT TRIANGLE search
    }
    
    if(enemySpeed == 0){
    GetComponent.<Animation>().Play(idleAnimName);
    }
    
    GetComponent.<Rigidbody>().velocity = velocity;
}