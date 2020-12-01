var images = new Array; 
var totalFrames = 99; // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)
var xPosition = 0;
var frame = 0;
var texts = new Array;

window.requestAnimFrame = (function(){ // reduce CPU consumption, improve performance and make this possible
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

(function animloop(){ // the smoothest animation loop possible
  requestAnimFrame(animloop);
  length = images.length;

  console.log(xPosition);
  frame = Math.round(countFrame(xPosition));
  changeFrame();
})();

function countFrame(x) {
  x_step = window.innerWidth / length;
  return x / x_step;

}

function changeFrame() {
	if(images.length > 0 && images[frame]) {
		if(images[frame].complete) { 
			if($('#video').attr('src') != images[frame].src) { 
				$('#video').attr('src',images[frame].src); 
			}
		}
	}
}

function initialize() { 
  let body = document.getElementById('body');
  body.addEventListener("mousemove", updateX);
  let back = document.getElementById('back');
  back.addEventListener('click', (e) => {
    window.location = 'index.html';
  })

	var image_width   = $('#video').css('width').replace('px','');
	var image_height  = $('#video').css('height').replace('px','');
	var height_ratio  = image_height / document.body.clientHeight;
	var width_ratio   = image_width / document.body.clientWidth;
	if (height_ratio < width_ratio) {
		$('#video').css('top',0); 
		var difference = parseInt(image_width-document.body.clientWidth);
		$('#video').css('width','auto');
		$('#video').css('height','40%'); 
		if(document.body.clientWidth<image_width) {
			$('#video').css('left',(difference/2)*-1);
		}else{
			$('#video').css('left',0);
		}
	}else{
		$('#video').css('left',0);
		var difference = parseInt(image_height-document.body.clientHeight); 
		if(document.body.clientHeight<image_height) {
			$('#video').css('top',(difference/2)*-1);
		}else{
			$('#video').css('top',0);
		}
		$('#video').css('width','40%'); 
		$('#video').css('height','auto');
  }
}

function updateX(e) {
  xPosition = e.pageX;
  console.log("frame= " + frame);
  updateText();
}

function updateText() {
  texts.forEach(item => {
    if (item.frame < frame) {
      let h2 = document.getElementById("text");
      h2.innerHTML = item.text;      
    }
  })
}

function pad(number, length) {
	var str = '' + number; while (str.length < length) { str = '0' + str; } return str;
}