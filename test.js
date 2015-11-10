var points = [ { x: -169.897, y: 110.723, z: 9.71903 },
              { x: -170.507, y: 111.062, z: 10.4725 },
              { x: -170.617, y: 111.308, z: 11.0072 },
              { x: -170.955, y: 111.776, z: 11.1872 },
              { x: -171.076, y: 112.004, z: 11.4294 }];

console.log(points);

for (var i = 0; i < points.length; i++) {
   points[i].z = 0;
}

console.log(points);

function zClear(data){
    var n = data.length;
    for (var i = 0; i < n; i++) {
	data[i].z = 0;
    }
}

zClear(points);
console.log(points);
