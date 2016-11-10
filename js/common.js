$(function(){
comEvent();
})
function comEvent(){
/* lnb */
	$(".lnb a.nav_dp").click(function(){
		var w= $(this).outerWidth() + 10;
		var dept1Leng = $(this).text().length;
		var array = new Array;
		var fontSize =12;
		var num =0;
		$(this).addClass('active');
		$($(this).parent().find(".navi_layer a")).each(function( idx ) {
			array[idx] = $(this).text().length
			/*if(dept1Leng <= 4 && $(this).text().length >= 6) {
				w += 20
				$(this).parent().find(".navi_layer").css({"width":w,"display":"block"});
				return false;
			}*/
		});
/*		num = array.sort().reverse();
			var s = dept1Leng > num[0] ? dept1Leng * fontSize : num[0] * fontSize;*/
		$(this).parent().find(".navi_layer").css({"display":"block"});
	});
	$(".lnb .nav_dp").mouseout(function(){
		$(this).parent().find(".navi_layer").css("display", "none");
		$(this).removeClass('active');
	});
	$(".lnb .navi_layer").mouseover(function(){
		$(this).parent().find(".navi_layer").css("display", "block");
		$(this).parent().find('.nav_dp').addClass('active')
	});
	$(".lnb .navi_layer").mouseleave(function(){
		$(this).parent().find(".navi_layer").css("display", "none");
		$(this).parent().find('.nav_dp').removeClass('active')
	});
	$('.lnb .navi_layer li:last-child').css('border-bottom','1px solid #d1d1d3');

}
/*popup 공통*/
function popComOpen(arg){
	$(".dimde").css('display','block');
	$(arg).css('display','block');
	$("body").css('overflow','hidden');
}
function popComClose(arg){
		$(".dimde").css('display','none');
		$(arg).css('display','none');
		$("body").attr('style','');
}
$(function(){
	 /*GNB 
	make : pjc
	*/
	function hGnb(obj){
		this.gnb = null;
		this.gnbEl = null;
		this.gnbList = null;
		this.deptList = null;
		this.gnbSl = '.bg_2dp';
		this.select = null;
		
		this.init(obj);
		this.eventHandle();
	
	}
	hGnb.prototype.init = function(arg){
		this.gnb = $(arg);
		this.gnbEl = this.gnb.children().children();
		this.gnbElkey = this.gnb.children().children().children();	
		this.gnbList = this.gnb.children().children();
		this.deptList = this.gnb.find('ul.dp2')
	}
	hGnb.prototype.eventHandle = function(e){
	ojbthis1 = this;
		ojbthis1.gnbEl.hover(
		  function() {
				ojbthis1.gnbShow(this);
		  }, function() {
				ojbthis1.gnbHide(this);
		  });
	
	ojbthis1.gnbEl.focusin(function( event ) {
		ojbthis1.gnbShow(this);
	
	})
	ojbthis1.gnbEl.find('ul.dp2 li.last').focusout(function( event ) {
		ojbthis1.gnbHide(this);
	
	});
	}
	hGnb.prototype.selectorPa = function(arg){
			$(ojbthis1.gnbList).removeClass("on");
			$(arg).addClass("on");
	}
	hGnb.prototype.selector = function(arg){
	
			$(ojbthis1.gnbList).removeClass("on");
			$(arg).parent().addClass("on");
	}
	hGnb.prototype.gnbShow = function(arg){
			$(arg).find('ul.dp2').show();
			if($(arg).find('ul.dp2').hasClass('dp2')){
				$(arg).find('a.dp1').addClass('active');
				$(this.gnbSl).show();
			}

	}
	hGnb.prototype.gnbHide = function(){
			$(this.gnbSl).stop().hide();
			$(ojbthis1.gnbEl).find('ul.dp2').hide();
			$(ojbthis1.gnbEl).find('a.dp1').removeClass('active')
				
	}
	var hgnb = new hGnb($('.gnb'));
	})