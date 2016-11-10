$(function(){
albumEvent();
dateJs();
action_event();
searchCheckJs();
defaultEv();
var dt = new Date();
	var y = dt.getFullYear();
	var m = dt.getMonth()+4;
	var d = dt.getDate()+1;
	var nY = y+1;

	mindt = y+"-"+m+"1";
	maxdt = y+"-"+m+"30";
	mindt = y+"-6-10";
	maxdt = y+"-9-30";

    $( "#drive_date" ).datepicker({showOn: "both",changeMonth: true,changeYear: true,yearRange: y+':'+ nY,buttonText:''});
    $( "#drive_date1" ).datepicker({showOn: "both",changeMonth: true,changeYear: true,yearRange: y+':'+nY,buttonText:''});			
})
function defaultEv() {
	/*입찰페이지 체크박스*/
	$('.bidding_box01 .check_box label').on('click',function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active')
			$(this).parent().find("input:checkbox").prop('checked', true);			
		}else{
			$(this).removeClass('active')
			$(this).parent().find("input:checkbox").prop('checked', false);				
		}
	});
	/*공고열람 체크박스*/
	$('.pop_caropen .check_box label').on('click',function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active')
			$(this).parent().find("input:checkbox").prop('checked', true);			
		}else{
			$(this).removeClass('active')
			$(this).parent().find("input:checkbox").prop('checked', false);				
		}
	});	
	/*car radio*/
	var radioLabel = $('.bidding_box01 .radio_box.r01 label');
	var radioLabel2 = $('.bidding_box01 .radio_box.r02 label');
	$(radioLabel).on('click',function(){
		var radioList = $(this).parent().find("input[type='radio']");
		$(radioLabel).removeClass('active');

		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}
	})
	/*car radio2*/
	$(radioLabel2).on('click',function(){
		var radioList = $(this).parent().find("input[type='radio']");
		$(radioLabel2).removeClass('active');

		if(!$(this).hasClass('active')){
			$(this).addClass('active');
		}
	})	

	$('.action_box01 .btn_colortable').hover(
		function() {
			$(this).children().addClass("active");
		}, function() {
			$(this).children().removeClass("active");
		}
	);
	$('.action_box01 .btn_detal').on('click',function(e){
		e.preventDefault();
		//$(this).addClass('active')
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$(this).text('상세검색 닫기');
			$(this).animate({'bottom':'-226px'});
			$('.action_box01 .cont_box02').animate({'height':'201'},function(){
				$('.action_box01 .cont_box02').css({'overflow':'visible'});
			})			
		}else{
			$(this).removeClass('active');
			$(this).text('상세검색 열기');
			$(this).removeClass('active');
			$('.action_box01 .cont_box02').css({'overflow':'hidden'});
			$(this).animate({'bottom':'-24px'});
			$('.action_box01 .cont_box02').animate({'height':'0'});					
		}
	})

}

function albumEvent() {
var list = $('.album_list li');
$('.album_list li .album_a').on("click", function() { /*앨범a*/
	var obj = $(list).children();
	if(obj.hasClass('active')){
		obj.removeClass('active');
	}
	$(this).addClass('active');
	$('.list_album').removeClass('active');
	$('.gallery_album').removeClass('active');


});
$('.album_list li .album_b').on("click", function() {/*앨범b*/

	var obj = $(list).children();
	if(obj.hasClass('active')){
		obj.removeClass('active');
	}
	$(this).addClass('active');
	$('.list_album').addClass('active');
	$('.gallery_album').addClass('active');

});
} 
var action_event = function(){
	dept1 = $('.action_box01 .dep1 li'),
	dept2 = $('.action_box01 .dep2 li'),
	dept3 = $('.action_box01 .dep3 li'),
	dept4 = $('.action_box01 .dep4 li');	

	$(dept1).bind('click',function(e){
		e.preventDefault();
		var idx = $(dept1).index(this),
		obj = this;
		$(dept1).removeClass('on');
		action_listOn(obj,idx); //리스트 ON
		callAjax(1,'dep1',idx);	// call 아작스 인자(뎁스넘버, 카테명, 서브메뉴 인덱스 값) 
		secNumber = secNum(obj);
		selectInit(secNumber);
	})

	$(dept2).bind('click',function(e){
		e.preventDefault();
		var idx = $(dept2).index(this),
		obj = this;

		$(dept2).removeClass('on');
		action_listOn(obj,idx); //리스트 ON
		callAjax(2,'dep2',idx);	// call 아작스 인자 2뎁스
		secNumber = secNum(obj);
		selectInit(secNumber);
	})
	$(dept3).bind('click',function(e){
		e.preventDefault();
		var idx = $(dept3).index(this),
		obj = this;

		$(dept3).removeClass('on');
		action_listOn(obj,idx); //리스트 ON
		callAjax(3,'dep3',idx);	// call 아작스 인자 3뎁스
		secNumber = secNum(obj);
		selectInit(secNumber);

	})
	$(dept4).bind('click',function(e){
		e.preventDefault();
		var idx = $(dept4).index(this),
		obj = this;

		$(dept4).removeClass('on');
		action_listOn(obj,idx); //리스트 ON
		callAjax(4,'dep4',idx);	// call 아작스 인자 3뎁스
		secNumber = secNum(obj);
		selectInit(secNumber);
	})	
}
$(function(){
cuidx=function(){
	var cuidx=2;
	var backCnt =0;
	function initB(){
		backCnt =0;
	}
	return{
		pl:function(a){
			cuidx=a;
		},
		cIdx:function(a){
			return cuidx;
		},
		backCount:function(){
			backCnt +=1
		},
		backInit:function(){
			initB();
		},
		init:function(a){
			inits();
		},
		backval:function(){
			return backCnt;
		}
	}
}();
});
function unbindEvent(obj){
	$(obj).unbind('click');	
}
function action_listOn(obj,idx) {
	$(obj).addClass("on");
}
function secNum(obj){
	secNumber = $(obj).parent().attr('class').split('dep');
	if(typeof(secNumber[1])){
		secNumber = parseInt(secNumber[1])
	}
	return secNumber;
}
function actionListGo(idx,cate){
	switch(cate) {
	    case 'dep1':
			$('.action_box01 .dep2').parent().find('.description').removeClass('active');
			$('.action_box01 .dep2').addClass('active');

			$('.action_box01 .dep3').parent().find('.description').addClass('active');
			$('.action_box01 .dep3').removeClass('active');
			$('.action_box01 .dep4').parent().find('.description').addClass('active');
			$('.action_box01 .dep4').removeClass('active');					
	        break;
	    case 'dep2':
			$('.action_box01 .dep3').parent().find('.description').removeClass('active');
			$('.action_box01 .dep3').addClass('active');
			$('.action_box01 .dep4').parent().find('.description').addClass('active');
			$('.action_box01 .dep4').removeClass('active');					
	        break;
	    case 'dep3':
			$('.action_box01 .dep4').parent().find('.description').removeClass('active');
			$('.action_box01 .dep4').addClass('active'); 
	        break;
	    case 'dep4':
	        break;	        
	       
	}	
}
function actionListback(idx,cate) {
	switch(cate) {
	    case 'dep1':
			$('.action_box01 .dep2').parent().find('.description').removeClass('active');
			$('.action_box01 .dep2').addClass('active');	
			$('.action_box01 .dep3').removeClass('active');
			$('.action_box01 .dep3').parent().find('.description').addClass('active');
			$('.action_box01 .dep4').removeClass('active');
			$('.action_box01 .dep4').parent().find('.description').addClass('active');	        
	        break;
	    case 'dep2':
			$('.action_box01 .dep3').parent().find('.description').removeClass('active');
			$('.action_box01 .dep3').addClass('active');	
			$('.action_box01 .dep4').removeClass('active');
			$('.action_box01 .dep4').parent().find('.description').addClass('active');
	        break;
	    case 'dep3':
			$('.action_box01 .dep4').addClass('active');
			$('.action_box01 .dep4').parent().find('.description').removeClass('active');	   
	        break;
	    case 'dep4':
	        break;	        
	       
	}
}
function selectInit(idx) { //리스트 온 셀렉트 초기화
	var listLength = $('.action_box01 .list').length;
	for(i=idx+1; i <= listLength; i++) {
		$('.action_box01 .dep' + i + ' ' + 'li').removeClass('on');
	}
}
function callAjax(dep1No, cate,listIdx) {
	//console.log(dep1No, cate+listIdx) //인자(뎁스넘버(1,2,3,4), 카테리스트넘버(dep1_ 클릭한li의 인덱스넘버 예(dep_1,dep_2))) 조회

	var cateName = cate+'_'+listIdx;
	var str = cate.substring(0,3);
	var Num = Number(cate.substring(3,4)) + 1;
	var list = $('.action_box01' +' ' + '.' + str + Num + ' ');
	$.ajax({
		type:"GET",
		url:'../js/1detp_json.js',
		dataType:'json',
		data:{},
		success:function(data){
			var cateNum = new Array();
			var printDta = new Array();

			for(i=0; i < data.length; i++){
				result =data[i].cate.indexOf(cateName);
				if (result >= 0){
					cateNum.push(i);
				}
			}
			if(typeof cateNum[0] !== 'undefined' && cateNum[0] !== null){
				list.html('');
				for(j=0; j < cateNum.length; j++){
					list.append("<li><a href='#'>" +data[cateNum[j]].model+"</a></li>")
				}				
				actionListGo(dep1No,cate)
			}else {
				list.html('');
				actionListback(dep1No,cate)
				list.append("<p class='description_data02'>데이터가없습니다.</p>")
			}
			unbindEvent(dept1);
			unbindEvent(dept2);		
			unbindEvent(dept3);		
			unbindEvent(dept4);	
			action_event();
        },
        error:function(xhr, status, error){
			alert(error);
        }
    });	
}

(function($){
    $.fn.jySselect=function(options){
        this.each(function(index){
            var jySselect = new selectJys(this,options);
            $(this).data("jySselect", jySselect);
        });
        return this;
    };
})(jQuery);
/**
 * @param  {[string]} $ [classNaming:classname],[ckNaming:lable-Id & forname],[valNaming:inputValuename]
 */
function selectJys(selector, options){
    this.$jySselect = null;
    this._$listBox = null;
    this._$textval = null;
    this._$arrow = null;
    this._$boxHeight = null;
    this._$sublist = null;
    this._$addcheck = null;
    this._options = null;
    this._init(selector);
    this._initOptions(options);
    this._initEvent();   
    this._addList();
    //this._selected(this._options.s_index);
}
selectJys.defaultOptions = {
    classNaming:'className', 
    ckNaming:'forId_', 
    valNaming:'value_', 
    mX:'',
    mY:'',
    mZ:'',
    movel:''
};
selectJys.attrv = {
  a : '',
  b : '',
  c : ''
};
selectJys.prototype._initOptions=function(options){
    this._options = $.extend({}, selectJys.defaultOptions, options);
};
selectJys.prototype._init=function(selector){
    this.$jySselect = $(selector);
    this._$cntWidth = this.$jySselect.width() - 2;
    this._$selectBox = this.$jySselect.find('.select');
    this._$textval = this.$jySselect.find(".selecttext");
    this._$arrow =  this.$jySselect.find('.select-arrow');
    this._$boxHeight = this.$jySselect.outerHeight();
    this._$sublist = this._$selectBox.find('ul');
    this._$sublistLi = this._$selectBox.find('ul li');
    this._$sublistLabel = this._$sublistLi.find('label')
    this._$sublist.css({'width':this._$cntWidth})

};
selectJys.prototype._onLoad = function(){
	var val = this._$sublistLi.eq(0).find('label').text();
	var s1 = this._$sublistLi.eq(0).find("input:checkbox").prop('checked', true);
	this._$textval.text(val);
	this._$textval.attr('value',val);
}
selectJys.prototype._addList = function(){
	var objthis =this;
	this._$addcheck = this._$sublistLi;
	$(this._$addcheck).each(function( index ) {
	 	$(this).children().children().attr('for', objthis._options.ckNaming + index)
	 	$(this).children().append("<input type='checkbox' class=" + objthis._options.classNaming + " name=" + objthis._options.classNaming + " value=" + objthis._options.valNaming + index + " id=" + objthis._options.ckNaming + index + ">")
	});
	this._onLoad(); 
}
selectJys.prototype._initEvent=function(){
    var objThis = this;

    this._$textval.on('click',function(){
        if(objThis._$arrow.hasClass('down')){
            objThis._$arrow.removeClass('down');
            objThis._$arrow.addClass('up');
            objThis._$selectBox.css({'top':objThis._$boxHeight -1});
            objThis._$sublist.slideDown(300);

        }else{

            objThis._$arrow.removeClass('up');
            objThis._$arrow.addClass('down');
            objThis._$sublist.slideUp(300);

        }
    });
    this._$arrow.on('click',function(){
        if(objThis._$arrow.hasClass('down')){

            objThis._$arrow.removeClass('down');
            objThis._$arrow.addClass('up');
            objThis._$sublist.css({'top':objThis._$boxHeight});
            objThis._$sublist.slideDown(300);

        }else{
  
            objThis._$arrow.removeClass('up');
            objThis._$arrow.addClass('down');
            objThis._$sublist.slideUp(300);

        }
    });

    this._$sublistLabel.on('click',function(){
    	  unique = '.'+objThis._options.classNaming;
    	  $(unique).filter(':checked').not(this).removeAttr('checked');
          var val = $(this).text();
          objThis._$textval.text(val);
          objThis._$textval.attr('value',val);
          objThis._$arrow.removeClass('up');
          objThis._$arrow.addClass('down');
          objThis._$sublist.slideUp(300);
    });

};

selectJys.prototype.chbrF=function(ar){
var UserAgent = navigator.userAgent;
if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|X11/i) != null ||UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
{
	return 1
}else{
	return 0
}
}
selectJys.prototype.test=function(ar){
	console.log('star')
};
selectJys.prototype._selected=function(ar){
  var val = this._$sublistLi.eq(ar).text();
  if(ar !== undefined){
    this._$textval.text(val);
    this._$textval.attr('value',val);
  }
  else{
    return;
  }
};

function dateJs(){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dateFormat: 'yy-mm-dd', firstDay: 0,
		isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['ko']);	
}
(function($){
    $.fn.JYStab=function(options){
        this.each(function(index){
            var JYStab = new jysTab(this,options);
            $(this).data("JYStab", JYStab);
        });
        return this;
    };
})(jQuery);
function jysTab(selector, options){
    this.$JYStab = null;
    this._init(selector);
    this._initEvent();   
}
jysTab.prototype._init=function(selector){
    this.$JYStab = $(selector);
    this._$city_list = this.$JYStab.find('.city_list > li');
    this._$city_cnt = this.$JYStab.find('.city_cnt > li');
};
jysTab.prototype._initEvent=function(){
   var objThis = this;
   this._$city_list.on('click',function(e){
   		e.preventDefault();
   		if($(this).children().hasClass('active')){
   				$(this).children().removeClass('active')
   		   		objThis._$city_cnt.removeClass('active');
	   			objThis._$city_list.removeClass('active');
   		}else{
		$('.city_list > li').children().removeClass('active');//2dp active remove
		$('.city_cnt > li').removeClass('active');//2dp active remove
	   		if(objThis._$city_cnt.hasClass('active')) {
	   			objThis._$city_cnt.removeClass('active');
	   			objThis._$city_list.removeClass('active');	
	   		}
	   		var idx = objThis._$city_list.index(this)
	   		$(this).children().addClass('active')
	   		objThis._$city_cnt.eq(idx).addClass('active')
   		}

    });
};
(function($){
    $.fn.JYStabletTab=function(options){
        this.each(function(index){
            var JYStabletTab = new jystableTab(this,options);
            $(this).data("JYStabletTab", JYStabletTab);
        });
        return this;
    };
})(jQuery);
function jystableTab(selector, options){
    this.$JYStabletTab = null;
    this._init(selector);
    this._initEvent();
}
jystableTab.prototype._init=function(selector){
    this.$JYStabletTab = $(selector);
    this._$tabList = this.$JYStabletTab.find('.tab_list li');
    this._$tabContent = this.$JYStabletTab.find('.content');
};
jystableTab.prototype._initEvent=function(){
   var objThis = this;
   this._$tabList.on('click',function(e){
   		e.preventDefault();

   		if(objThis._$tabList.children().hasClass('active')) {
   			objThis._$tabList.children().removeClass('active');
   			objThis._$tabContent.removeClass('active');
   		}
   		var idx = objThis._$tabList.index(this);
   		$(this).children().addClass('active');
		objThis._$tabContent.eq(idx).addClass('active');
    });
};
function jysSlider(selector){

    this.Slider = null;
    this.$img = null;
    

    this.currentIndex =-1;

    this.imageWidth = 0;
    
    this.$indexItems = null;
    
    this.init(selector);
    this.initImages();
    
    this.initEvent();

    this.showList(0);
}


jysSlider.prototype.init=function(selector){
    this.Slider = $(selector);
    this.$img = this.Slider.find(".image-list img");
    this.imageWidth=this.Slider.find(".slider-body").width();
    this.$indexItems = this.Slider.find(".thumb li a");
    this.alignImg(this.$indexItems);
}


jysSlider.prototype.initImages=function(selector){

    this.$img.each(function(){
        $(this).css({
            opacity:0.0
        })
    }) 
   
}
jysSlider.prototype.alignImg = function(img){
	var h = img.height();
	var x = 0;
	var z = 0;
	for(i=0; i <= img.children().length; i++){
		x = img.children().eq(i).height();
		z = (h - x) / 2;	
		if(z > 10) {
			img.children().eq(i).css({'top':0});	
		}else{
			img.children().eq(i).css({'top':z});			
		}
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
    
    this.$indexItems.on("click", function(e){
    	e.preventDefault();
        var index = objThis.$indexItems.index(this);
 
        if(objThis.currentIndex>index)
            objThis.showList(index,"prev");
        else 
            objThis.showList(index,"next");
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


    if(direction=="prev" || direction=="next"){
        

        var currentEndLeft=this.imageWidth;
        var nextStartLeft =-this.imageWidth;
    
        if(direction=="next"){
            currentEndLeft= -this.imageWidth;
            nextStartLeft=this.imageWidth;  
        }
        

        $currentImage.stop().animate({
            left:currentEndLeft,
            opacity:0
        },300, "easeOutQuint");
        
       
        $newImage.css({
            left:nextStartLeft,
            opacity:0
        });

        $newImage.stop().animate({
        left:0,
        opacity:1
        },300, "easeOutQuint");
    }else {
        $currentImage.css({
        opacity:0
        });
        
        $newImage.css({
            left:0,
            opacity:1
        })
    }

    this.selectIndexAt(index);
    
    this.currentIndex = index;
}

jysSlider.prototype.selectIndexAt=function(index){
    
    if(this.currentIndex!=-1)       
        this.$indexItems.eq(this.currentIndex).removeClass("select"); 
            
    this.$indexItems.eq(index).addClass("select");
}
function searchCheckJs() {
	var check_mycheck = $(".check_list input[type='checkbox']");
	var check_myck = $('.check_list label');
	var check_tabList = $('.check_list02 > li');
	/*init*/
	$('.check_list .all_check').addClass('active');
	$(check_myck).addClass('active')
	$(check_mycheck).prop("checked", true);	
	$(check_tabList).each(function( index ) {
		$(check_tabList).eq(index).addClass('active')
	});	

	$(".check_list .all_check").click(function(e) {
			e.preventDefault();
			if($(this).hasClass('active')){
				$(this).removeClass('active')
				$(check_mycheck).prop("checked", false);
				$(check_tabList).each(function( index ) {
					$(check_tabList).eq(index).removeClass('active');
				});
				$(check_myck).each(function( index ) {
					$(check_myck).eq(index).removeClass('active');
				});				

			}else {
				$(this).addClass('active');
				$(check_myck).addClass('active');
				$(check_mycheck).prop("checked", true);

				$(check_tabList).each(function( index ) {
					$(check_tabList).eq(index).addClass('active')
				});	
			}
	});
		
	$(check_myck).click(function(e){
		e.preventDefault();
		var flag = null;
		 $('.city_cnt li').removeClass('active');//3dp active remove
		 $('.tab_wrap01').eq($(check_myck).index(this)).find('.city_list > li a').removeClass('active');
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().find('input[type="checkbox"]').prop('checked',false);
			checkListn($(check_myck).index(this));
			check_danil();
		}else {
			$(this).addClass('active');
			$(this).parent().find('input[type="checkbox"]').prop('checked',true);

			flag = check_each(check_mycheck);
			checkListb($(check_myck).index(this));
			check_danil();
		}
	})
	function check_danil(){
 		var List = new Array();
		$(check_myck).each(function( index ) {
			if($(this).hasClass('active')){
				List.push(1)
			}else{
				List.push(-1)
			}
		})
		List.sort();
		if(List[0] === 1){
			$(".check_list .all_check").addClass('active')
		}else{
			$(".check_list .all_check").removeClass('active')
		}
	}
	function checkListb(idx){
		check_tabList.eq(idx).addClass('active');
	}
	function checkListn(idx){
		check_tabList.eq(idx).removeClass('active');
	}	
	function check_each(obj){
		for(i=0; i <= obj.length; i++) {
			if($(obj).eq(i).attr('checked')){
				return $(obj).eq(i).attr('checked');
			}
		}
	}	
}


$(function(){
$('.slider_auction').bxSlider({
mode: 'horizontal',
auto: false,
controls: true
});
var checktab1 = $("#check_tab_1").JYStab();
var checktab2 = $("#check_tab_2").JYStab();
var checktab3 = $("#check_tab_3").JYStab();
var checktab4 = $("#check_tab_4").JYStab();
var checktab5 = $("#check_tab_5").JYStab();
var checktab6 = $("#check_tab_6").JYStab();
var checktab7 = $("#check_tab_7").JYStab();
var checktab8 = $("#check_tab_8").JYStab();
var checktab9 = $("#check_tab_9").JYStab();
var checktab10 = $("#check_tab_10").JYStab();
var checktab11 = $("#check_tab_11").JYStab();
var checktab12 = $("#check_tab_12").JYStab();
var checktab13 = $("#check_tab_13").JYStab();
var checktab14 = $("#check_tab_14").JYStab();
var checktab15 = $("#check_tab_15").JYStab();
var tableTab = $("#table_tab01").JYStabletTab();
var tableTabCar = $("#tableTabCar01").JYStabletTab();
var sld = new jysSlider(".image-slider");
/* 차량검색 셀렉트 리스트*/
var select1 = $("#selectbox-1").jySselect({classNaming:'ckbox1',ckNaming:'ckbox1_',valNaming:'ckbox1_data_'});
var select2 = $("#selectbox-2").jySselect({classNaming:'ckbox2',ckNaming:'ckbox2_',valNaming:'ckbox2_data_'});
var select3 = $("#selectbox-3").jySselect({classNaming:'ckbox3',ckNaming:'ckbox3_',valNaming:'ckbox3_data_'});
var select4 = $("#selectbox-4").jySselect({classNaming:'ckbox4',ckNaming:'ckbox4_',valNaming:'ckbox4_data_'});
var select5 = $("#selectbox-5").jySselect({classNaming:'ckbox5',ckNaming:'ckbox5_',valNaming:'ckbox5_data_'});
var select6 = $("#selectbox-6").jySselect({classNaming:'ckbox6',ckNaming:'ckbox6_',valNaming:'ckbox6_data_'});
var select7 = $("#selectbox-7").jySselect({classNaming:'ckbox7',ckNaming:'ckbox7_',valNaming:'ckbox7_data_'});
var select8 = $("#selectbox-8").jySselect({classNaming:'ckbox8',ckNaming:'ckbox8_',valNaming:'ckbox8_data_'});
var select9 = $("#selectbox-9").jySselect({classNaming:'ckbox9',ckNaming:'ckbox9_',valNaming:'ckbox9_data_'});
var select10 = $("#selectbox-10").jySselect({classNaming:'ckbox10',ckNaming:'ckbox10_',valNaming:'ckbox10_data_'});
var select11 = $("#selectbox-11").jySselect({classNaming:'ckbox11',ckNaming:'ckbox11_',valNaming:'ckbox11_data_'});

/* 기간별검색 셀렉트리스트*/
var institution_1 = $("#institution_1").jySselect({classNaming:'institution_ckbox_01',ckNaming:'instion1_',valNaming:'instion1_data_'});
var institution_2 = $("#institution_2").jySselect({classNaming:'institution_ckbox_02',ckNaming:'instion2_',valNaming:'instion2_data_'});
var institution_3 = $("#institution_3").jySselect({classNaming:'institution_ckbox_03',ckNaming:'instion3_',valNaming:'instion3_data_'});
var institution_4 = $("#institution_4").jySselect({classNaming:'institution_ckbox_04',ckNaming:'instion4_',valNaming:'instion4_data_'});
});
