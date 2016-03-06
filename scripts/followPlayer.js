#pragma strict

private var target : GameObject;

function Start() {

	target = GameObject.Find("Player");
}

function Update() {
	// This Scripts ties to the camera and follow our player
	transform.position.x = target.transform.position.x+1;
	transform.position.y = target.transform.position.y+.5;
}