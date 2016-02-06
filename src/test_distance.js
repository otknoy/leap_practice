var Distance = require('./distance.js');

// test
var samples = require('./test/data.json');
var query = samples[0];

var ts1 = query.points;

console.log("ts1_name,ts2_name,score,score_s,score_t");

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // temporal distance
    var tdist = Distance.temporalDistance(ts1, ts2);

    // spatial distance
    var sdist = Distance.spatialDistance(ts1, ts2);

    var score = tdist * sdist.x * sdist.y;
    var score_s = sdist.x * sdist.y;
    var score_t = tdist;

    console.log(query.name + "," + samples[i].name + "," + score + "," + score_s + "," + score_t);
}
