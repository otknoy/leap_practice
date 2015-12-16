var x;//x座標
var y;//y座標
var speed =24.0;//high24//slow6.0//normal12//アニメーションのスピード
var R = 137;
 
 
//   //アニメーションの場合////////////////////////////////
//   float theta = radians(angle);  //thetaは角度（angle）をラディアン値に直したもの
//   x = R*cos(theta);
//   y = -R*sin(theta);    //processingは数学の座標とはy方向が反対になるので、-にする
//   ellipse(x + width/2, y + height/2, 10, 10);  //画面中央を中心にして円上に点を描画
 
//   angle ++;
//   if (angle >= 360) angle = 0;  //もしangleが360以上になったら0にする。
// }
for(var t = 0; t < 550; t += speed){
    var d = [];
    var theta = t * (Math.PI / 180) ;
    x = R*Math.cos(theta);
    y = R*Math.sin(theta)+275;
    d.push({
	"\"x\"": x,
	"\"y\"": y,
	"\"z\"": 0
    });
    console.log(d);
}
