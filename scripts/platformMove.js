#pragma strict

public var moveSpeed : float;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * moveSpeed);
}

function OnTriggerEnter(hit : Collider) {
	if(hit.gameObject.tag == "waypoint") {
		//Debug.Log('Hello');
		transform.Rotate(0, 180, 0);
	}
}