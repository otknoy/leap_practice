var points = [
    {x: 0, y: 10, z: 0},
    {x: 10, y: 25, z: 0},
    {x: 20, y: 40, z: 0},
    {x: 40, y: 130, z: 0},
    {x: 70, y: 10, z: 0},
    {x: 75, y: 50, z: 0},
    {x: 90, y: 160, z: 0},
    {x: 120, y: 100, z: 0}
];

var sum  = function(arr) {
    var sum = 0;
    for (var i=0,len=arr.length; i<len; ++i) {
        sum += arr[i];
    };
    return sum;
};

var lineLength = changeOfDistance(points);//座標間の距離を測って配列に入れる
var totalLength  = sum(lineLength);

var addpoint = decidePointZone(points);
var totaladdpoint  = sum(addpoint);
var checkpoint = createPoint(points);

function changeOfDistance(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(data[i+1].x - data[i].x, 2);
	var y = Math.pow(data[i+1].y - data[i].y, 2);
	var z = Math.pow(data[i+1].z - data[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}

function decidePointZone(data) {
    var n = data.length-1;
    var d = [];
    var all_point = 200;

    for (var i = 0; i < n; i++) {
	var insert = (all_point - 1) * lineLength[i]/totalLength;
	if(insert > 0){
	    d.push( parseInt(insert - 1));
	}
	console.log("no_"+i+":"+d[i]);
    }
	return d;
}

function createPoint(data){
    var n = data.length-1;
    var d = [];
    for(var i = 0; i< n; i++){
	var pointNum = addpoint[i];
	d.push({
	    x: data[i].x,
	    y: data[i].y,
	    z: data[i].z
	});
	for(var j = 0; j < pointNum; j++){
	    d.push({
		x: data[i].x + j*(data[i+1].x -data[i].x)/(pointNum + 1),
		y: data[i].y + j*(data[i+1].y -data[i].y)/(pointNum + 1),
		z: data[i].z + j*(data[i+1].z -data[i].z)/(pointNum + 1)
	    });
	}
    }
    return d;
}


var arr = [1, 2, 3, 4, 5];
console.log( sum(arr) ); // 15
console.log( sum(lineLength) );
console.log(totalLength);
console.log("addpoint");
console.log(addpoint);
console.log("totaladdpoint");
console.log(totaladdpoint);
console.log(points);
console.log(lineLength);
console.log(checkpoint);
