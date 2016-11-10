$(document).ready(function(){
	//a태그의 영역을 넓히기 위해 li의 영역 가져옴
	$('.list_box').hide();
	$('.loc_list').each(function(){
		var loc_h = $(this).height();
		$(this).find('a').height(loc_h);
	}); 

	//focus접근성 작업
	$('.loc_btn').on('focusin', function(){
		$(this).next().show().siblings('li');
		$(this).addClass('on');
	});
	$('.loc_btn').on('focusout', function(){
		$(this).next().hide().next();
		$(this).removeClass('on');
	});

	//툴팁호버 및 클릭
	$('.loc_txt .loc_btn').on({
		click: function(){
				var loc_h = $('.loc_list.show').height();
				var id = $(this).attr('href');
				var offTop = $(id).offset().top;
			if($('.loc_list').hasClass('show')){
				$('.loc_list').removeClass('show');
				$('.map_area').slideUp(500);
				$('.loc_list').find('a').removeClass('on');
				$('.loc_list').css('border-color','#d1d1d3');
				$('html,body').animate({
					scrollTop:offTop - (loc_h - 88)
				},1000);
			} else {
				$('html,body').animate({
					scrollTop:offTop
				},1000);
			}
		},
		mouseover: function(){
			var imgList = $('.map_ko').attr('src');
			var idx = $(this).parents('li').index();
			var map_name = imgList.slice(0,21);
			var yel = '#ffd200';
			$('.map_ko').attr('src',map_name+'_'+(idx+1)+'.png');
			$(this).addClass('on').parent('li').siblings().find('.loc_btn').removeClass('on');
			$(this).siblings('.list_box').show();
			$(this).siblings('div').css('borderColor',yel).find('i').css('background',yel);
		},
		mouseleave :function(){
			var map= $('.map_ko').attr('src').slice(0,21)+'.png';
			$(this).parents('.map').find('.map_ko').attr('src',map);
			$(this).siblings('.list_box').hide();
			$(this).removeClass('on');
			$(this).siblings('div').css('borderColor','#e1e0e1').find('i').css('background','#e1e0e1');
		}
	});

	$('.list_box').hover(function(){
		var yel = '#ffd200';
		var imgList = $('.map_ko').attr('src');
		var idx = $(this).parents('li').index();
		var map_name = imgList.slice(0,21);
		$('.map_ko').attr('src',map_name+'_'+(idx+1)+'.png');
		$(this).siblings('div').css('borderColor',yel).find('i').css('background',yel);
		$(this).show();
		$(this).siblings('.loc_btn').addClass('on');
	}, function(){
		var map= $('.map_ko').attr('src').slice(0,21)+'.png';
		$(this).parents('.map').find('.map_ko').attr('src',map);
		$(this).siblings('a').removeClass('on');
		$(this).hide();
		$(this).siblings('div').css('border-color','#e1e0e1').find('i').css('background','#e1e0e1');;
	});


	//지도 링크 클릭시 지점이동 후 펼치기
	$('.map .list_box li a').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		var id = $(this).attr('href'); //버튼에 연결된 href로이동
		var offTop = $(id).offset().top; //id값의 높이 
		$(id).siblings().removeClass('show');
		$(id).addClass('show');
		$(id).siblings('li').find('.map_area').slideUp(500);//다른형제들 닫아버림
		$('html, body').animate({
			scrollTop:offTop
		},500,function(){
			$(id).find('.map_area').slideDown(500);
		});
		$(id).find('a').addClass('on');
		$(id).siblings().find('a').removeClass('on');
		$(id).css('border-color','#616161');
		$(id).siblings().css('border-color','#d1d1d3');
		$(id).prev().css('border-color',' #616161');
	});

	// 아래 리스트 펼치기
	$('.loc ul .loc_list a').click(function(e){
		e.preventDefault();
		var area = $(this).parent('.loc_list');
		var thisDad = $(this).parent('li');
		var thisChild = $(this).parent('li').siblings();
		if (!area.hasClass('show')){ //show가 없다면
			thisDad.addClass('show');
			$(this).siblings('.map_area').slideDown(500);
			thisChild.find('.map_area').slideUp(500);
			thisChild.removeClass('show');
			$(this).addClass('on').parent('li').siblings().find('a').removeClass('on');
			thisChild.css('border-color','#d1d1d3');
			thisDad.css('border-color','#616161');
			thisDad.prev().css('border-color','#616161');
		} else { //show가 있다면
			$(this).parent('li').find('a').removeClass('on');
			thisDad.removeClass('show');
			$(this).siblings('.map_area').slideUp(500);
			thisDad.css('border-color','#d1d1d3');
			thisDad.prev().css('border-color',' #d1d1d3');
		}
	});
});
