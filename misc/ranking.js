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
   // スコアでソート
   // 上位 hits 件を返す
   //  返したデータにスコアをつけとくといいかも
   //  よくわからないなら後回しで

}


// こんな感じで使う
var result = searchTimeSeries(ts, 5);


// 1位のデータの名前を表示
console.log(result[0].name);

// スコアをつけとくと、result からこんな感じでスコア取れる
//  あとから、スコアがわかる
// 1位のデータのスコアを表示
// console.log(result[0].score);
