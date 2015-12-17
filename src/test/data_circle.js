var x;//x座標
var y;//y座標
var speed =24.0;//high24//slow6.0//normal12//アニメーションのスピード
var R = 137;
 

for(var t = 0; t < 550; t += speed){
    var d = [];
     // if(t > 275){
     //     speed = 6.0;
     // }
    var theta = t * (Math.PI / 180) *360/550;
    x = R*Math.cos(theta);
    y = (-R*Math.sin(theta)+275);
    d.push({
	"\"x\"": x,
	"\"y\"": y,
	"\"z\"": 0
    });
    console.log(d);
    if(speed > 6){
	speed --;
    }
 }
