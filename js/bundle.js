(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Sketch = require('./sketch.js');

var sketch = new Sketch('sketch', false);
 sketch.drawCircle(x, y);
 sketch.clear();

},{"./sketch.js":2}],2:[function(require,module,exports){
var Sketch = function(id, enableMouseDrag) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');

    this.mousePressed = false;
    this.mouseX = 0;
    this.mouseY = 0;

    if (enableMouseDrag) {
	this.enableMouseDrag();
    }
};

Sketch.prototype.drawCircle =  function(x, y) {
    this.context.beginPath();
    this.context.strokeStyle = '#6DD900';
    this.context.arc(x, y, 12, 0, Math.PI*2, false);
    this.context.stroke();
};

Sketch.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


Sketch.prototype.enableMouseDrag = function() {
    var sketch = this;
    var canvas = sketch.canvas;

    canvas.addEventListener('mousedown', function(e) {
    	sketch.clear();
	sketch.mousePressed = true;
    });

    canvas.addEventListener('mouseup', function(e) {
	sketch.mousePressed = false;
    });

    canvas.addEventListener('mousemove', function(e) {
	if (sketch.mousePressed) {
    	    var rect = e.target.getBoundingClientRect();
    	    sketch.mouseX = e.clientX - rect.left;
    	    sketch.mouseY = e.clientY - rect.top;
    	    sketch.drawCircle(sketch.mouseX, sketch.mouseY);
	}
    }, false);
};

module.exports = Sketch;

},{}]},{},[1]);
