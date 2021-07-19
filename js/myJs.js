var images = [];
var bg = new Image();
var l = new Image();
var t = new Image();
//var lbp = new Image();
//var lbp2 = new Image();
var playTime = 800;//时间线
var nlb1_canvas = document.createElement('canvas');
var nlb2_canvas = document.createElement('canvas');



bg.src = "images/bg.jpg";
l.src = "images/l.png";
t.src = "images/text.jpg";
//lbp.src = "images/lb.png";
//lbp2.src = "images/lb2.png";

for(var i = 0; i < 13; i++){
    images[i] = new Image();
    images[i].src = "images/pic_"+i+".jpg";
}

function lbPic( ctx, rgb1, rgb2, rgb3, rgb4, rgb5, rgb6){
    var liLbR = 80;
    var nlb_context = ctx.getContext('2d');
    nlb_context.save();
    nlb_context.beginPath();


    ctx.width = liLbR;
    ctx.height = liLbR;
    var liLb = nlb_context.createRadialGradient(liLbR/2, liLbR/2, 4, liLbR/2, liLbR/2, liLbR/2);
    nlb_context.arc(liLbR/2, liLbR/2, liLbR, 0, 2*Math.PI);
    liLb.addColorStop(0, rgb1);
    liLb.addColorStop(0.2, rgb2);
    liLb.addColorStop(0.3, rgb3);
    liLb.addColorStop(0.35, rgb4);
    liLb.addColorStop(0.65, rgb5);
    liLb.addColorStop(1, rgb6);

    nlb_context.fillStyle = liLb;
    nlb_context.fillRect(0, 0, liLbR, liLbR);
    nlb_context.restore();

}


lbPic(nlb1_canvas, "rgba(255,255,255,1)", "rgba(155,255,253,0.9)", "rgba(155,217,241,0.8)", "rgba(109,206,243,0.7)", "rgba(109,206,243,0.25)", "rgba(155,217,241,0)");

lbPic(nlb2_canvas, "rgba(255,255,255,1)", "rgba(247,250,155,0.9)", "rgba(241,224,155,0.8)", "rgba(243,200,109,0.7)", "rgba(243,200,109,0.25)", "rgba(241,224,155,0)");

 /*颜色
lbPic(nlb1_canvas, "rgba(255,255,255,1)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0)");

lbPic(nlb2_canvas, "rgba(255,255,255,1)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0)");
*/





window.onload = function(){
    var loading = document.getElementById("login");
//    for(var i = 1; i >= 0; i-=0.001){
//        if(i <= 0){
//            loading.style.display = "none";
//        } else{
//            loading.style.opacity = i;
//        }
//        console.log(i)
//    };

    var loadA = 1;
    var loadAni = setInterval(function(){
        loading.style.opacity = loadA;
        loadA -= 0.2;
        loadA = loadA.toFixed(2);
        if(loadA <= 0){
            loading.style.display = 'none';
            clearInterval(loadAni);
        }
    },80);
/*
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);  //禁用页面滑动

    window.addEventListener('resize', function(){
        console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight,document.documentElement.scrollHeight <= document.documentElement.clientHeight)
        if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
            bodyTag = document.getElementsByTagName('body')[0];
            bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
        }
        setTimeout(function() {
            window.scrollTo(0, 1)
        }, 0);
    });
*/



    var bodyTag = document.getElementsByTagName('body')[0];
        window.addEventListener('resize', function(){
//    bodyTag.css("height",window.innerHeight+2);  //强制让内容超过
        bodyTag.style.height = window.innerHeight + 2 + "px";  //强制让内容超过
console.log(window.innerHeight+2)
        window.scrollTo(0, 1);

//    bodyTag.css("height",window.innerHeight);  //重置成新高度
//        bodyTag.style.height = window.innerHeight + "px";  //强制让内容超过

//        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    });

    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

//    canvas.width = 940;
//    canvas.height = 500;

    /*固定值*/
    var imgW = 404;//原图片宽度
    var imgH = 292;//原图片高度
    var m = 0.21;//缩小倍数
    var deg = Math.PI/180;//度
    var arrPic = [];
    var arrlb = [];
    var lbMax = 60;
    var replay = document.getElementById("m_r");

    for(var i = 0; i < images.length; i++){
        arrPic[i] = images[i];
        arrPic[i].time = 100;
        arrPic[i].strTime = playTime - i * 30;

    }
    function random(min, max){
        return Math.random() * (max - min) + min;
    }

    var lb = function() {
        this.init= function(){
            this.x = random(0, canvas.width);
            this.y = -random(10, 50);
//            this.y = 160;
            this.r = 3;
            this.R = 80;
            this.g = 0.01;
            if(this.x < canvas.width/2){
                this.vx = this.x/canvas.width;
            }else{
                this.vx = (canvas.width/2 - (this.x - canvas.width/2))/canvas.width;
            }
            this.vy = random(1, 1.3);
            this.ey = random(416, 490);
            this.vr = random(0.988, 0.993);
            this.a = 1;
        };
        this.draw= function (){
            context.beginPath();
            context.save();

            context.globalAlpha =this.a;
            if(this.x < canvas.width/2){
                context.drawImage(nlb1_canvas, this.x-this.R/2, this.y-this.R/2, this.R, this.R);
            } else{
                context.drawImage(nlb2_canvas, this.x-this.R/2, this.y-this.R/2, this.R, this.R);
            }

            /*
            if(this.x < canvas.width/2){
                context.drawImage(lbp, this.x, this.y, this.R, this.R);
            } else{
                context.drawImage(lbp2, this.x, this.y, this.R, this.R);
            }
             */
            /*
            var linearLB = context.createRadialGradient(this.x, this.y, this.r, this.x, this.y, this.R);
            context.arc(this.x, this.y,this.R, 0, 2*Math.PI);

            if(this.x < canvas.width/2){//光球模型
                linearLB.addColorStop(0, "rgba(255,255,255,1)");
                linearLB.addColorStop(0.2, "rgba(155,255,253,0.9)");
                linearLB.addColorStop(0.3, "rgba(155,217,241,0.8)");
                linearLB.addColorStop(0.35, "rgba(109,206,243,0.7)");
                linearLB.addColorStop(0.65, "rgba(109,206,243,0.25)");
                linearLB.addColorStop(1, "rgba(155,217,241,0)");
            } else{
                linearLB.addColorStop(0, "rgba(255,255,255,1)");
                linearLB.addColorStop(0.2, "rgba(247,250,155,0.9)");
                linearLB.addColorStop(0.3, "rgba(241,224,155,0.8)");
                linearLB.addColorStop(0.35, "rgba(243,200,109,0.7)");
                linearLB.addColorStop(0.65, "rgba(243,200,109,0.25)");
                linearLB.addColorStop(1, "rgba(241,224,155,0)");
            }

            context.fillStyle = linearLB;
            */

//            context.fill();

            context.restore();

            this.update();
        };
        /*
        this.shadow= function(){
            context.beginPath();
            context.save();

            var linearS = context.createRadialGradient(this.x-80, this.y, 0, this.x-80, this.y, this.sR);
            context.arc(this.x-80, this.y,this.sR, 0, 2*Math.PI);
            linearS.addColorStop(0, "rgba(109,206,243,1)");
            //            linearS.addColorStop(0.5, "rgba(109,206,243,0.65)");
            linearS.addColorStop(1, "rgba(155,217,241,0)");
            context.globalAlpha =this.sa;
            context.fillStyle = linearS;

            context.fill();
            context.restore();
        };
        */

        this.update= function(){
//            if(this.R > 3){
            if(this.y < this.ey){
                this.y += this.vy;
                if(this.x < canvas.width/2){
                    this.x -= this.vx * 2.3;
                } else{
                    this.x += this.vx * 2.3;

                }
                this.R *= this.vr;
                this.vy += this.g;
            } else{
                if(this.a > 0.1){
                    this.R -= 0.15;
                    this.a -= 0.03;
                } else{
                    this.init();
                }
            }
        };
        return this;
    };

    l.time_1 = 100;
    l.time_2 = 100;
    l.v = true;
    l.strTime = arrPic[arrPic.length-1].strTime - arrPic[arrPic.length-1].time;

    t.time = 100;


    function setup(){
        for(var lb_i = 0; lb_i < lbMax; lb_i++){
            var newLb = new lb();
            newLb.init();
            arrlb.push(newLb);
        }
    }
    setup();


    funStart();


    function funStart(){
        for(var i = 0; i < images.length; i++){
            arrPic[i].isStr = playTime <= arrPic[i].strTime;
        }

        l.isStr = playTime <= l.strTime;

        t.isStr = playTime <= l.strTime - 50;

        context.clearRect(0, 0, canvas.width, canvas.width);

        context.drawImage(bg, 0, 0);//bg


        if(t.isStr){
            drawT(context, t);
        }

        if(l.isStr){
            drawRadial(context, l);
        }

        if(arrPic[0].isStr){
            drawPic(context, arrPic[0], 4.5, 45, 45, -4.5, 426, 338, 426, 338, -90, 8, 3, 5, 7, 0.4);
        }

        if(arrPic[1].isStr){
            drawPic(context, arrPic[1], -4, 45, 45, 4, 468, 284, 508, 184, -90, 19.6, 2, 1, 2, 0.3);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[2].isStr){
            drawPic(context, arrPic[2], -3.5, 45, 45, 3.5, 340, 332, 320, 300, -90, -15.1, 3, 5, 7, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[3].isStr){
            drawPic(context, arrPic[3], 0.5, 40, -30, 2.5, 510, 339, 490, 315, 30, -15.9, 3, 5, 7, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[4].isStr){
            drawPic(context, arrPic[4], 2.5, 20, 10, 2.5, 588, 331, 568, 307, -50, 16.2, 3, 5, 7, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[5].isStr){
            drawPic(context, arrPic[5], 2.5, 20, 10, 2.5, 405, 224, 419, 248, -50, 9.9, -1, 1, 2, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[6].isStr){
            drawPic(context, arrPic[6], 2.5, 20, 10, 2.5, 524, 223, 538, 237, -50, 26.6, 1, 1, 1, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[7].isStr){
            drawPic(context, arrPic[7], 2.5, 20, 10, 2.5, 376, 279, 390, 294, -50, -16.6, -3, 2, 9, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[8].isStr){
            drawPic(context, arrPic[8], -2.3, 40, -30, 2.5, 545, 279, 569, 294, -30, -6.5, 8, 3, 7, 0.08);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[9].isStr){
            drawPic(context, arrPic[9], 2.3, 40, -30, 2.5, 495, 172, 519, 187, -50, -26.65, 1, 1, 1, 0.04);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[10].isStr){
            drawPic(context, arrPic[10], -2.3, 40, -30, 2.5, 433, 173, 458, 188, -30, 20.75, -1, -1, 1, 0.6);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[11].isStr){
            drawPic(context, arrPic[11], 0.5, 40, -30, 2.5, 474, 225, 499, 240, -50, -6, 1, 1, 1, 0.4);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(arrPic[12].isStr){
            drawPic(context, arrPic[12], 2.5, 40, -30, 2.5, 466, 115, 476, 132, 3.28, 3.28, 0, 1, 1, 0.3);
        }   //canvas画布，  相片对象 ,X大小,X斜移,Y斜移,X大小, 结束坐标X,Y, 开始坐标X,Y,开始旋转度，结束旋转度, 阴影(x,y,r,a)

        if(l.isStr){
            drawL(context, l);
        }

//        if(t.isStr){
//            drawT(context, t);
//        }

        if(l.isStr){
            for(var n in arrlb){
                arrlb[n].draw();
                context.fill();

            }
        }

        playTime = playTime - 1.2;

        requestAnimationFrame(funStart);
    }



    function drawPic(ctx, obj, scx, skx, sky, scy, etx, ety, stx, sty, rotA, rotB, sax, say, sar, saa){

        var str = obj.time, end = 100;
        if(obj.time > 0){obj.time = obj.time - 1.2}
        var EEI = Tween.Expo.easeIn(str, 0, 100, end);
        var EEO = Tween.Expo.easeOut(str, 0, 100, end);
        var CEI = Tween.Cubic.easeIn(str, 0, 100, end);



        ctx.save();

        ctx.transform(m + scx * EEI/100, Math.tan(skx * deg) * EEI/100, Math.tan(sky * deg) * EEI/100, m + scy * EEI/100, etx + (stx - etx) * CEI/100, ety + (sty - ety) * EEI/100);
        ctx.rotate(rotB * deg + rotA * deg * CEI/100);
//        ctx.shadowOffsetX=sax * (1-EEO/100);
//        ctx.shadowOffsetY=say * (1-EEO/100);
//        ctx.shadowBlur=sar * (1-EEO/100);
//        ctx.shadowColor="rgba(0,0,0,"+saa*(1-EEO/100)+")";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 10;

        ctx.drawImage(obj, -imgW/2, -imgH/2, imgW, imgH);
        ctx.strokeRect(-imgW/2, -imgH/2, imgW, imgH);

        ctx.restore();
    }

    function drawL(ctx, obj){//顶点光

        if(obj.time_1 > 0) obj.time_1 = obj.time_1 - 2;
        var ElEO_1 = Tween.Cubic.easeOut(100-obj.time_1, 0, 100, 100);



        var ElEO_2 = Tween.Cubic.easeOut(100-obj.time_1, 0, 100, 100);

        if(obj.time_1 == 0){
            if(obj.time_2 == 0 || obj.time_2 == 100) obj.v = !obj.v;
            obj.v ? obj.time_2++ : obj.time_2--;

            ElEO_2 = Tween.Sine.easeIn(obj.time_2, 0, 100, 100);
        }


        ctx.save();

        ctx.globalAlpha =0.8 * ElEO_1/100;
        ctx.globalCompositeOperation="source-over";

        ctx.drawImage(obj, 278, -138, 401, 380);
//        ctx.drawImage(obj, 278, -138, 401, 380);

        ctx.globalAlpha =1 * ElEO_2/100;
        ctx.drawImage(obj, 278, -138, 401, 380);


        ctx.restore();
    }

    function drawRadial(ctx, obj){//照亮层
        if(obj.time_1 > 0) obj.time_1 = obj.time_1 - 2;
        var ElEO_1 = Tween.Cubic.easeOut(100-obj.time_1, 0, 100, 100);

        ctx.save();

        var linear = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.height/2*0.7, canvas.width/2, canvas.height/2, canvas.width/2);

        linear.addColorStop(0, "rgba(255,255,255,"+0.03*ElEO_1/100+")");
        linear.addColorStop(1, "rgba(255,255,255,"+0.15*ElEO_1/100+")");
        ctx.fillStyle = linear;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.restore();
    }

    function drawT(ctx, obj){//txt

        if(obj.time > 0) obj.time = obj.time - 1;
        var EEQ = Tween.Elastic.easeOut(100-obj.time, 0, 100, 100);

        ctx.save();

        ctx.globalAlpha =1;

        ctx.drawImage(obj, 160, 423, 630 * EEQ/100, 68);


        ctx.restore();
    }

    replay.onclick = function (){
        /*
         var oldjs = null;
         var t = null;
         var oldjs = document.getElementById(id);
         if(oldjs) oldjs.parentNode.removeChild(oldjs);
         drawPic = null;
         delete drawPic;
         var scriptObj = document.createElement("script");
         scriptObj.src = newJS;
         scriptObj.type = "text/javascript";
         scriptObj.id   = id;
         document.getElementsByTagName("head")[0].appendChild(scriptObj);
         */
        playTime = 800;
        for(var i = 0; i < images.length; i++){
            arrPic[i].time = 100;
        }
        arrlb = [];
        setup();
    }



};