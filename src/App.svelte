

<main>
	 <h1>pi: {#if pi}{pi}{/if}</h1>
	 {#if pi}
	 <p style="color:red;">Error: {error}%</p>
	 <p style="color:green;">Total points: {totalPoints}<p>
	 {/if}
	 <button type="button" on:click="{toggleFunction}">{toggleText}</button>

    <div class="slidecontainer">
		<label>Speed: {speed}</label>
      <input type="range" min="1" max="1000" class="slider"  id="myRange" bind:value={speed}>
    </div>
	
	<div class="square" bind:this={canvasSquare}>
		<div class="content">
		    <canvas style="border: 3px red solid;width:100%;height:100%;" id="myCanvas"></canvas>
		</div>
	</div>
</main>

<script>
	import { onMount } from 'svelte';
	let pi;
	let startStopToggle = false;
	let toggleText = "Start calculation";
	var totalPoints = 0;
	var pointsInCircle = 0;
	var x, y;
	var ctx;
	let sleepTime = 10;
	let myInterval;
	let speed = 10;
	let error; 
	let height,width;
	let canvasSquare;
	$: error = (Math.abs((Math.PI/pi)-1)*100).toFixed(5);
	$: speed, changeSpeed();

	
	function changeSpeed(){
		if(startStopToggle==true){
			console.log(myInterval)
			clearInterval(myInterval);
			myInterval = setInterval(calculatePi, (1/speed) *1000);   
		}
		
	}

	function toggleFunction(){
		console.log("toggle");
		if(startStopToggle==false){
			startStopToggle = true;
			myInterval = setInterval(calculatePi, (1/speed) *1000);
			toggleText = "Pause calculation"     
		}
		else{
			startStopToggle = false;
			clearInterval(myInterval);   
			toggleText = "Resume calculation";
		}
		
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	

	async function calculatePi(){
			totalPoints += 1;    
			ctx.moveTo(0, 0);
			//ctx.lineTo(, Math.random()*100);
			x = Math.random()*width;
			y = Math.random()*width;
			if(Math.pow(Math.pow(x-(width/2),2)+Math.pow(y-(width/2),2),0.5)<=width/2){
				pointsInCircle += 1
				ctx.fillStyle = "green";
			}
			else{
				ctx.fillStyle = "red";
			}

			ctx.fillRect(x,y,5,5);
			ctx.stroke(); 
			pi = (4*(pointsInCircle/totalPoints)).toFixed(5);
		
	}

	onMount(() => {
		var c = document.getElementById("myCanvas");
		console.log(canvasSquare.clientHeight,window.innerHeight)
		if(canvasSquare.clientHeight>window.innerHeight){
			console.log("huge")
			canvasSquare.style.width = String(window.innerHeight - 0.25 * window.innerHeight)+"px";
		}

		height = c.height = c.clientWidth;
		width = c.width = c.clientHeight;
		ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(width/2, width/2, width/2, 0, 2 * Math.PI);
		
		//myInterval = setInterval(calculatePi, 1);     
   
	});
</script>

<style>
	.square {
  position: relative;
  width: 100%;
   margin: auto;
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
}
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>