var Distance = require('./distance.js');

// test
var samples = require('./test/data.json');
var query = samples[0];

var ts1 = query.points;

console.log("ts1_name,ts2_name,temporal_dist,spatial_dist");

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // temporal distance
    var tdist = Distance.temporalDistance(ts1, ts2);

    // spatial distance
    var sdist = Distance.spatialDistance(ts1, ts2);

    console.log(query.name + "," + samples[i].name + "," + tdist + "," + sdist.x*sdist.y);
}
