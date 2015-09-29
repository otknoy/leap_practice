var Sketch = require('./sketch.js');

var sketch = new Sketch('sketch');


var isDrawing = false;
var canvas = sketch.canvas;

// マウス押したとき
canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
});

// マウス離したとき
canvas.addEventListener('mouseup', function(e) {
    isDrawing = false;
});

// マウス動かしたとき
canvas.addEventListener('mousemove', function(e) {
    var rect = e.target.getBoundingClientRect();
    sketch.mouseX = e.clientX - rect.left;
    sketch.mouseY = e.clientY - rect.top;

    if (isDrawing) {
	sketch.setStrokeStyle('#ff0000');
    } else {
	sketch.setStrokeStyle('#000000');
    }
    sketch.drawCircle(sketch.mouseX, sketch.mouseY);
}, false);
