var Distance = require('../src/distance.js');

// test
var samples = require('../src/test/data.json');
var query = samples[0];

var ts1 = query.points;

console.log("ts1_name,ts2_name,score");

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    var score = Distance.tsDist(ts1, ts2);

    console.log(query.name + "," + samples[i].name + "," + score);
}
