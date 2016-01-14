/**
 * Created by sandy on 2016/1/11.
 */
window.onload = function () {
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var curIndex = 0;
    var isAnimated = false;
    var timer;
    var intevalOfTimer = 2000;

    play();

    container.onmouseover = stop;
    container.onmouseout = play;

    next.onclick = function () {
        if(isAnimated){
            return;
        }
        if(curIndex==4){
            curIndex = 0;
        }else{
            curIndex ++;
        }
        animate(-600);
        showButton()
    }

    prev.onclick = function () {
        if(isAnimated){
            return;
        }
        if (curIndex==0) {
            curIndex = 4;
        } else {
            curIndex --;
        }
        animate(600);
        showButton();
    }
    
    for(var i=0; i<buttons.length; i++){
        buttons[i].onclick = function () {
            if(isAnimated){
                return;
            }
            var oldIndex = curIndex;
            curIndex = this.getAttribute("index");
            var offset = (curIndex-oldIndex)*(-600);
            animate(offset);
            showButton();
        }
    }

    function animate(offset){
        isAnimated = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 500;
        var interval = 10;
        var speed = Math.floor(offset/(time/interval));

        var go = function() {
            if ((offset < 0 && parseInt(list.style.left) > newLeft) || (offset > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + "px";
                setTimeout(go, interval);
            }
            else {
                list.style.left = newLeft + "px";
                console.log(list.style.left);
                if(newLeft<-3000){
                    list.style.left = "-600px";
                }
                if(newLeft>-600){
                    list.style.left = "-3000px";
                }
                isAnimated = false;
            }
        }
        go();
    }

    function showButton(){
        if(curIndex==5){
            curIndex = 0;
        }
        if(curIndex==-1){
            curIndex = 4;
        }
        for(var i=0; i<buttons.length; i++){
            if(buttons[i].className == "on"){
                buttons[i].className = "";
            }
        }
        buttons[curIndex].className = "on";
    }

    function play(){
        timer = setTimeout(function(){
            next.onclick();
            play();
        }, intevalOfTimer);
    }

    function stop(){
        clearTimeout(timer);
    }
}