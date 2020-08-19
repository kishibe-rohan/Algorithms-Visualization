let values = [];
let loops;
let swaps;
let cycles = 1;
let bars = 250;
let selector, inpNum;
let button;
let sorted = false;


function setup() {
	selector = createSelect();
	selector.position(10, 10);
	selector.option('Bubble');
	selector.option('Selection');

	inpNum = createInput('250');
	inpNum.position(10, 30);
	inpNum.input(function () {
		bars = inpNum.value();
		resetArray();
	});

	button = createButton('Restart');
	button.position(10, 50);
	button.mousePressed(resetArray);

	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, height);
	resetArray();
}

function draw() {
	background(0);

	if (!sorted) {
		switch (selector.value()) {
			case 'Bubble':
				bubbleSort();
				break;
			case 'Selection':
				selectionSort();
				break;
	
			default:
				bubbleSort();
				break;
		}
	} else {
		console.log("done sorting!");
		noLoop();
	}

	for (i = 0; i < values.length; i++) {
		let col = color(values[i], height, height);
		let location = map(i, 0, values.length, 0, width);
				stroke(col);
				fill(col);
                colorMode(HSB, height);
                rect(location, height - values[i], width / bars, height);
		}
		

	}


swap = function (arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

bubbleSort = function () {
	if (swaps < values.length - loops - 1) {

		if (bars >= 50) cycles = 10;
		else if (bars >= 200) cycles = 50;
		else if (bars >= 500) cycles = 100;

		for (i = 0; i < cycles; i++) {
			let a = values[swaps];
			let b = values[swaps + 1];
			if (a > b) {
				swap(values, swaps, swaps + 1);
			}
			swaps++;
		}
	} else {
		swaps = 0;
		loops++;
	}
	if (loops == values.length) sorted = true;
}

selectionSort = function () {
	for (j = 0; j < values.length - loops - 1; j++) {
		let a = values[j];
		let b = values[j + 1];
		if (a > b) {
			swap(values, j, j + 1);
		}
	}
	if (loops == values.length) sorted = true;
}


resetArray = function () {
	console.log('resetting')
	values = [];
	for (i = 0; i < bars; i++) {
		values[i] = random(height);
	}
	loops = 0;
	swaps = 0;
	sorted = false;
	loop();
}