﻿#pragma strict

public var speed : int = 4.0;
public var jumpheight : int = 6;
public var gravity : int = 15;
public var airTime : int = 10;
public var moveAnimName : String;
public var idleAnimName : String;
public var attackAnimName : String;
public var jumpAnimName : String;
private var canjump = true;
private var canrun = true;
private var attack = false;
private var idle = true;
private var jumpAmount : int = 0;
private var speedPot : int = 8.0;

function Start () {
	//anim = GetComponent.<Animation>();
	GetComponent.<Rigidbody>().useGravity = false;
}

function FixedUpdate () {
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	if(Input.GetKey('right')) {
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
		transform.eulerAngles = Vector3(0, 90, 0);

		if(canrun) {
			GetComponent.<Animation>().Play(moveAnimName);
		}

		if(Input.GetKey('space') && canjump) {
			jumpAnim();
		}

		/*if(Input.GetKey('down')) {
			crouchAnim();
		}*/

	}else if(Input.GetKey('left')) {
		transform.eulerAngles = Vector3(0, 270, 0);
		transform.Translate(Vector3.forward * speed * Time.deltaTime);

		if(canrun) {
			GetComponent.<Animation>().Play(moveAnimName);
		}

		if(Input.GetKey('space') && canjump) {
			jumpAnim();
		}

	}else if(Input.GetKey('space') && canjump) {
        jumpAnim();
    }else if(Input.GetKey('a')) {
    	attackAnim();
    }else if(idle) {
    	GetComponent.<Animation>().Play(idleAnimName);
    }

      /*var fwd = transform.TransformDirection(Vector3.forward);

      if(Physics.Raycast(transform.position, fwd, hit, 2) && hit.collider.gameObject.CompareTag("test")) {
		Debug.Log("spacedoor");
	}

	//Draw ray works different, requres direction and length in one variable.
	var forward : Vector3 = transform.TransformDirection(Vector3.forward) * 5;
	Debug.DrawRay(transform.position, forward, Color.red);*/
}


/*function crouchAnim() {
	idle = false;
	GetComponent.<Animation>().Play('MM_Sneaking');
	idle = true;
}*/ 

function attackAnim() {
	idle = false;
	GetComponent.<Animation>().Play(attackAnimName);
	yield WaitForSeconds(1.25);
	idle = true;
} 

function jumpAnim() {
	if(jumpAmount <= airTime) {
		jumpAmount++;
		canrun = false;
		idle = false;
		GetComponent.<Animation>().Play(jumpAnimName);
		this.GetComponent.<Rigidbody>().velocity.y = jumpheight;
		//this.GetComponent.<Rigidbody>().velocity.x = jumpwidth;
		yield WaitForSeconds(0.85);
		idle = true;
		canrun = true;
	}else {
		canjump = false;
		//jumpAmount = 0;
	}
}

function OnCollisionEnter(other : Collision) { 
      if(other.transform.tag == 'Ground') {
      	canjump = true;
      	jumpAmount = 0;
      }

      if(other.transform.tag == "health") {
		Destroy(other.gameObject);
	}

	if(other.transform.tag == "strength") {
		Destroy(other.gameObject);
	}
	
	if(other.transform.tag == "speed") {
		Destroy(other.gameObject);
		transform.Translate(Vector3.forward * speedPot * Time.deltaTime);
		GetComponent.<Animation>().Play(moveAnimName);
	}

	if(other.transform.tag == "life") {
		Destroy(other.gameObject);
	}
	
 }
