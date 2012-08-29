/**
* Standalone cross-fading photo gallery script by Allen Zhu.
* Degrades into a single picture.
*/

window.addEventListener?window.addEventListener("load",fade_init,false):window.attachEvent("onload",fade_init);

var speed = 5000, current = 0, imgs = null;

function fade_init(){
//    document.body.getElementsByTagName('h1')[0].
    imgs = document.getElementById('gallery').getElementsByTagName('img');
    imgs[0].style.opacity = 1;
    for(i=1;i<imgs.length;i++) imgs[i].style.opacity = 0; // show only first
    setTimeout("fade.init()", speed);
}

var fade=function(){
    return{
        init:function(){
            this.alpha = 100;
            this.nxt = (current + 1) % imgs.length;
            imgs[this.nxt].className="current";
            this.si = setInterval(function(){fade.tween()}, 20);
        },
        tween:function(){
            if(this.alpha == 0){
                imgs[current].className="";
                clearInterval(this.si);
                current = (current + 1) % imgs.length;
                setTimeout("fade.init()", speed);
            }else{
                this.alpha -= 5;
                imgs[current].style.opacity = this.alpha/100.0;
                imgs[this.nxt].style.opacity = (100.0 - this.alpha)/100;
                imgs[current].style.filter = "alpha(opacity=" + this.alpha + ")";
                imgs[this.nxt].style.filter = "alpha(opacity=" + (100-this.alpha) + ")";
            }
        }
    }
}();