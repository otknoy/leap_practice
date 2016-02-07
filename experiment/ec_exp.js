var Condition = require('./condition.js');

// test data
var samples = require('../src/test/data.json');

// for sorting
function resultCompare(a, b) {
    return a.score - b.score;
}

// subject's query
var query = samples[0];

var ts1 = query.points;

var result = [];

console.log("ts1_name,ts2_name,score");

for (var i = 0; i < samples.length; i++) {
    var ts2 = samples[i].points;

    // var distance = Condition.baseline;
    // var distance = Condition.dtw;
    var distance = Condition.dtw_ts;

    var score = distance(ts1, ts2);

    console.log(query.name + "," + samples[i].name + "," + score);
}
