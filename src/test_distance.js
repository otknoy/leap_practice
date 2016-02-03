var Distance = require('./distance.js');

// test
var samples = require('./test/data.json');
var query = samples[0];

var ts1 = query.points;

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // temporal
    var tdist = Distance.temporalDistance(ts1, ts2);

    // spatial
    var sdist = Distance.spatialDistance(ts1, ts2);

    console.log("temporal distance: " + tdist);
    // console.log("spatial distance: {x: " + sdist.x + ", y: " + sdist.y + "}");
    console.log("spatial distance: " + sdist.x * sdist.y);
}
