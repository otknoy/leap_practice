function sketchProc(processing) {
    processing.setup = function(){
	processing.size(600, 600, processing.P3D);
	processing.fill(255);
	processing.stroke(255);
    };

    processing.draw = function() {
	drawPoint(point);
    };

    function drawPoint(point){
	processing.pushMatrix();
	processing.translate(point.x, point.y, point.z);
	processing.sphere(12);
	processing.popMatrix();
    }
}

var canvas = document.getElementById("sketch");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
