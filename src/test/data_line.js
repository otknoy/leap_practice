var x;//x座標
var y;//y座標
var speed =6.0;//high24//slow6.0//normal12//アニメーションのスピード


for(var t = 0; t < 550; t += speed){
    var d = [];
     if(t > 275){
         speed = 24.0;
     }

    x = 0;
    y = 550-t;
    d.push({
	"\"x\"": x,
	"\"y\"": y,
	"\"z\"": 0
    });
    console.log(d);
    
 }
