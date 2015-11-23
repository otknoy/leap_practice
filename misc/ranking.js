// 時系列データのフォーマット
var ts = {
   "name": "1",
   "points": [{x: 1, y: 2, z:3}, {x: 1, y: 2, z:3}, {x: 1, y: 2, z:3}]
};

// 検索対象の全データ
// ts のフォーマットの配列
// var db = [ts0, ts1, ts2, ts3, ts4];

// function searchTimeSeries(tsQuery, hits) {
//    // スコアの計算
//     // 全データ (db) との類似度を求める
//     var n = samples.length;
//     for (var i = 0; i < n; i++){
// 	zClear(tsQuery);
// 	zClear(samples[i]);
// 	var ts_Q = changeOfPosition(tsQuery);
// 	var ts_S = changeOfPosition(samples[i]);
// 	var d = DTW.distance(ts_Q, ts_S, distance);
//     }
//    // スコアでソート
//    // 上位 hits 件を返す
//    //  返したデータにスコアをつけとくといいかも
//    //  よくわからないなら後回しで
//     return d;
// };


var fruits = [
    {name:"apple",price:100,cost:20000},
   {name:"orange",price:98,cost:4000},
   {name:"banana",price:50,cost:500000},
   {name:"melon",price:500,cost:10},
   {name:"mango",price:398,cost:300}
]

// score.sort(function(a,b){
//     if(a.price<b.price) return -1;
//     if(a.price > b.price) return 1;
//     return 0;
// });
// console.log(fruits)

// for (var keyString in fruits) {
//     console.log( fruits[keyString] );
//     fruits.sort(function(a,b){
//     if(a.price<b.price) return -1;
//     if(a.price > b.price) return 1;
//     return 0;
// });
// };
var minXts_Q = Math.min.apply(null,fruits.map(function(o){return o.price;}));
console.log(minXts_Q);
var minYts_Q = Math.min.apply(null,fruits.map(function(o){return o.cost;}));
console.log(minYts_Q);

var test = Math.apply(null,fruits.map(function(o){return o.price;}));
console.log(test);

function minSubtraction(data, minX, minY){
    var n = data.length;
    for (var i = 0; i < n; i++) {
	data[i].price= data[i].price - minX;
	data[i].cost = data[i].cost - minY;
    }    
}

minSubtraction(fruits,minXts_Q,minYts_Q);
console.log(fruits);
var maxts_Q = Math.max.apply(null,fruits.map(function(o){return o.price;}));
console.log(maxts_Q);


// var maxX_ts_Q = Math.max.apply(null,tsQuery.map(function(o){return o.x;}));
//     console.log(maxX_ts_Q);

// こんな感じで使う
// var result = searchTimeSeries(ts, 5);


// 1位のデータの名前を表示
// console.log(result[0].name);

// スコアをつけとくと、result からこんな感じでスコア取れる
//  あとから、スコアがわかる
// 1位のデータのスコアを表示
// console.log(result[0].score);
