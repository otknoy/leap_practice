var x;//x座標
var y;//y座標
var A = 100;//振幅
var p = 0.0;//初期位相
var w = 1.0;//角周波数
var t_end = 275;
var speed =24.0;//high24//slow6.0//normal12//アニメーションのスピード

for(var t = -275; t < t_end; t += speed){
    var d = [];
    var rad = -t * (Math.PI / 180);
    x = -t;
    // if(t > 0){
    //     speed = 24.0;
    // }
    y =(A*(Math.sin(w*(rad) + p))+275);
    d.push({
	"x": x,
	"y": y,
	"z": 0
    });
    console.log(d);
    if(speed > 6){
        speed --;
    }
    //	console.log(y);
}

