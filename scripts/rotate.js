﻿#pragma strict

public var rotate : float = 15.0;


function Update() {
	var rotateDelta : float = rotate*Time.deltaTime;
	transform.Rotate(0, rotateDelta, 0);
}
