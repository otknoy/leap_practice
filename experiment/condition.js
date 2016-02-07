var LinearInterpolation = require('../src/LinearInterpolation.js');
var Distance = require('../src/distance.js');

var Condition = {};

// baseline
// cos類似度による手法
Condition.baseline = function(ts1, ts2) {
    // linear interpolation
    // ts1 と ts2 では時系列データの要素数が異なる
    // そのため、点数ベースの線形補間を行い、要素数を揃える
    // (これにより、時間軸は無視される)
    
    // normalize

    // co-sine similarity
    // ts1` と ts2` をそれぞれベクトルとし、cos 類似度を求める

    return 0;
};

// approach1
// DTW による手法
Condition.dtw = function(ts1, ts2) {
    // normalize

    // dtw

    return 0;
};


// approach2
// DTW (temporal and spatial features) による手法
Condition.dtw_ts = function(ts1, ts2) {
    return Distance.tsDist(ts1, ts2);
};

module.exports = Condition;
