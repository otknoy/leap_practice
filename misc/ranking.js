// 時系列データのフォーマット
var ts = {
   "name": "1",
   "points": [{x: 1, y: 2, z:3}, {x: 1, y: 2, z:3}, {x: 1, y: 2, z:3}]
};

// 検索対象の全データ
// ts のフォーマットの配列
var db = [ts0, ts1, ts2, ts3, ts4];

function searchTimeSeries(tsQuery, hits) {
   // スコアの計算
    // 全データ (db) との類似度を求める
    var n = samples.length;
    for (var i = 0; i < n; i++){
	zClear(tsQuery);
	zClear(samples[i]);
	var ts_Q = changeOfPosition(tsQuery);
	var ts_S = changeOfPosition(samples[i]);
	var d = DTW.distance(ts_Q, ts_S, distance);
    }
   // スコアでソート
   // 上位 hits 件を返す
   //  返したデータにスコアをつけとくといいかも
   //  よくわからないなら後回しで
    return d;
};


var fruits = [
   {name:"apple",price:100},
   {name:"orange",price:98},
   {name:"banana",price:50},
   {name:"melon",price:500},
   {name:"mango",price:398}
]

score.sort(function(a,b){
    if(a.price<b.price) return -1;
    if(a.price > b.price) return 1;
    return 0;
});
console.log(fruits)


// こんな感じで使う
var result = searchTimeSeries(ts, 5);


// 1位のデータの名前を表示
console.log(result[0].name);

// スコアをつけとくと、result からこんな感じでスコア取れる
//  あとから、スコアがわかる
// 1位のデータのスコアを表示
// console.log(result[0].score);
