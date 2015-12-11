
  //   //scale = 1.0;
  //   normOrig[i][0]=orig[i][0]*scale;
    
  //   normOrig[i][1]=orig[i][1]*scale;//正規化
  // }

  // create line length of data points (sum up distances of two nabor points).
    lineLength= new float[orig.length];
    // 入力の座標の数だけループをまわす
    //    配列の宣言
    //　配列に各座標の距離を入れてる
    //　配列に入れた距離を全て足し合わせている
  for (int i=0; i<normOrig.length-1; i++) {
    lineLength[i] = distance(normOrig[i][0], normOrig[i][1], normOrig[i+1][0], normOrig[i+1][1]);
    totalLength+=lineLength[i];//leapで入力した点間の距離を全部足し合わせている
  }

    //
  for (int i=0; i<normOrig.length-1; i++) {
    int insertPoint = int((dotNum - 1) * lineLength[i]/totalLength);
    if (insertPoint > 0) {
      addPoint[i] =  insertPoint -1;
      println("no_"+i+":"+addPoint[i]);
    }//追加する点の数を区間ごとに決めている
  }

function decidePointZone(data) {
    var n = data.length - 1;
    var d = [];
    var all_point = 300;

    for (var i = 0; i < n; i++) {
	var insert = (all_point - 1) * lineLength[i]/totalLength;
	if(insert > 0){
	    d.push(insert - 1);
	}
    }
	return d;
}
//

    var addpoint = decidePointZone(lineLength);

  // how many points does the system insert?;
  for (int i=0; i<addPoint.length; i++) {
    totalAddPoint += addPoint[i];
  }//実際に何点分の配列を用意しないといけないかを決めている


}

    
  // finally generated a inserted data stream;//補完された分の全ての座標を生成
  data = new float[totalAddPoint + normOrig.length][2];//2次元配列を準備
  for (int i=0; i<normOrig.length-1; i++) {//
    int pointNum = addPoint[i];
    data[address][0] = normOrig[i][0];
    data[address][1] = normOrig[i][1];
    address++;

    for (int j=0; j<pointNum; j++) {
      data[address][0] = normOrig[i][0] + j*(normOrig[i+1][0]-normOrig[i][0])/(pointNum+1);     
      data[address][1] = normOrig[i][1] + j*(normOrig[i+1][1]-normOrig[i][1])/(pointNum+1);  
      address++;
    }
  }
  data[address][0]= normOrig[normOrig.length -1][0];
  data[address][1]= normOrig[normOrig.length -1][1];
}
//ここなにしてんだよ〜
//
function createMatrix(n, m, v) {
    var d = new Array(n);
    for (var i = 0; i < d.length; i++) {
	d[i] = new Array(m);
	for (var j = 0; j < d[i].length; j++) {
	    d[i][j] = v;
	}
    }
    return d;
}

var createPoint = createMatrix((totaladdpoint+lineLength.length),2,Number.POSITIVE_INFINITY);
for(var i = 0; i < lineLength.length; i++){
    var pointNum = addpoint[i];
    createPoint
}
    










\
//製作途中

var points = [
    {x: 1, y: 2, z: 0},
    {x: 5, y: 5, z: 0},
    {x: 10, y: 20, z: 0},
    {x: 14, y: 29, z: 0}   
];
    
var lineLength = changeOfDistance(points);//座標間の距離を測って配列に入れる

    var totalLength  = sum(lineLength);



var addpoint = decidePointZone(lineLength);

    var totaladdpoint  = sum(addpoint);





    var sum  = function(arr) {
	var sum = 0;
	for (var i=0,len=arr.length; i<len; ++i) {
            sum += arr[i];
	};
	return sum;
    };
    

function changeOfDistance(data) {
    var n = data.length - 1;
    var d = [];
    for (var i = 0; i < n; i++) {
	var x = Math.pow(data[i+1].x - data[i].x, 2);
	var y = Math.pow(data[i+1].y - data[i].y, 2);
	var z = Math.pow(data[i+1].z - data[i].z, 2);
	d.push(Math.sqrt(x + y + z));
    }
    return d;
}

function decidePointZone(data) {
    var n = data.length - 1;
    var d = [];
    var all_point = 300;

    for (var i = 0; i < n; i++) {
	var insert = (all_point - 1) * lineLength[i]/totalLength;
	if(insert > 0){
	    d.push(insert - 1);
	}
    }
	return d;
}
