/**
 * name : JYS animation slider
 * make : parkjonghcan
 * version : 0.1
 * license : jys
 * date : 2016.10.20
 * e-mail:idpjc1@gamil.com //korea
 *
 */
function jysSlider(selector){
    this.Slider = null;
    this.$img = null;
    this.$txtlist = null;
    this.currentIndex =-1;
    this.imageWidth = 0;
    this.$body = null;
    this.$indexItems = null;
    this.init(selector);
    this.initImages();
    this.inittxtlist();
    this.initEvent();
    this.showList(0);
    this.timerID = 0;
    
    this.autoPlay= 5000;
    this.play();
}
jysSlider.prototype.init=function(selector){
    this.Slider = $(selector);
    this.$img = this.Slider.find(".image_list li");
    this.$body=this.Slider.find(".slider_body");
    this.imageWidth=this.Slider.find(".slider_body").width();
    this.$indexItems = this.Slider.find(".thumb li a");
    this.$txtlist = this.Slider.find('.txt_list li');
    this.timerID1 = 2;
    objtxr = this;

}
jysSlider.prototype.initImages=function(selector){
    this.$img.each(function(){
        $(this).css({
            opacity:0.0
        })
    }) 
}
jysSlider.prototype.inittxtlist=function(selector){
    this.$txtlist.each(function(){
        $(this).css({
            opacity:0.0
        })
    }) 
}
jysSlider.prototype.onresize=function(selector){
   var h = $(window).height();
     if(h < 950){
        objtxr.$body.css('height','950px');  
     }else{
        objtxr.$body.css('height',h);     
     }
}
jysSlider.prototype.resize=function(selector){
   var h = $(window).height();
   if (h > 950){
     objtxr.$body.css('height',h);
    }else{
        return;
    }
}

jysSlider.prototype.initEvent=function(){
    var objThis = this;
    this.Slider.find(".slider-btn.prev").on("click", function(){
     objThis.prevImage();
    })
    this.Slider.find(".slider-btn.next").on("click", function(){
        objThis.nextImage();
    })
    this.$indexItems.on("mouseover", function(e){
    	e.preventDefault();
        var index = objThis.$indexItems.index(this);
        objThis.stop();
        objThis.overAniclear();
        objThis.overAni(index);
        if(objThis.currentIndex>index){
            objThis.showList(index,"prev");
        }
        else {
            objThis.showList(index,"next");
        }
    })
    this.$indexItems.on("mouseout", function(e){
        e.preventDefault();
         objThis.play();
    })    
}
jysSlider.prototype.prevImage=function(){

    this.showList(this.currentIndex-1, "prev");
}
jysSlider.prototype.nextImage=function(){

    this.showList(this.currentIndex+1, "next");
}
jysSlider.prototype.showList=function(index, direction){
    if(index<0)
        index = this.$img.length-1;
    if(index>=this.$img.length)
        index = 0;
    var $currentImage = this.$img.eq(this.currentIndex);
    var $newImage = this.$img.eq(index);
    var $crTxt = this.$txtlist.eq(this.currentIndex);
    var $newTxt = this.$txtlist.eq(index); 
    if(direction=="prev" || direction=="next"){
        var currentEndLeft=130;
        var nextStartLeft =-130;
    
        if(direction=="next"){
            currentEndLeft= -130;
            nextStartLeft=130;  
        }
        $currentImage.stop().animate({
            left:currentEndLeft,
            opacity:0
        },1000, "easeOutQuint");
        $crTxt.stop().animate({
            left:currentEndLeft,
            opacity:0
        },1000, "easeOutQuint");        
        $newImage.css({
            left:nextStartLeft,
            opacity:0
        });
        $newTxt.css({
            left:nextStartLeft,
            opacity:0
        });        
        $newImage.stop().animate({
        left:0,
        opacity:1
        },1000, "easeOutQuint");
        $newTxt.stop().animate({
        left:0,
        opacity:1
        },1000, "easeOutQuint");        
    }else {
        $currentImage.css({
        opacity:0
        });
        $crTxt.css({
        opacity:0
        });        
        $newImage.css({
            left:0,
            opacity:1
        })
        $newTxt.css({
            left:0,
            opacity:1
        })        
    }
    this.selectIndexAt(index);
    this.currentIndex = index;
}
jysSlider.prototype.selectIndexAt=function(index){

    if(this.currentIndex!=-1) {    
        this.$indexItems.eq(this.currentIndex).removeClass("active"); 
        this.overAniclear();
    }
    this.$indexItems.eq(index).addClass("active");
    this.overAni(index);
}
jysSlider.prototype.play=function(){
    if(this.timerID==0){
        this.timerID= setInterval($.proxy(function(){
            this.nextImage();
        }, this), this.autoPlay);              
    }
}
jysSlider.prototype.stop=function(){
    if(this.timerID!=0){
        clearInterval(this.timerID);
        this.timerID=0;
    }
}
jysSlider.prototype.overAni = function(idx){
        this.timerID1 = setInterval($.proxy(function(){
                this.playimg(idx);
        }, this), 50);
}
jysSlider.prototype.overAniclear = function(){
        clearInterval(this.timerID1);  
}
jysSlider.prototype.playimg = function(idx){
    var list = $('.thumb li');
    var mTop = parseInt($(list).eq(idx).find(".fire img").css('margin-top'))
    if(mTop > -1818) {
        $(list).eq(idx).find(".fire img").css({
            "margin-top": "-="+"303px"
        });
    } else if(mTop == -1818){
        $(list).eq(idx).find(".fire img").css({"margin-top":"0"});
    } 
}


$(function(){
var sld = new jysSlider("#main_sl");

$(window).on('resize', sld.resize);
sld.onresize();
})