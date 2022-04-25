$(function(){
	//各首页热点轮播
	$('.gl-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.law-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.edu-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.phi-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.social-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.uni-slide .flexslider').flexslider({
		animation: "slide"
	});
	$('.uni-slide .flex-control-nav li a').each(function(){
		$(this).text('').append('<img>');
	});
	$('.uni-slide .flexslider img').each(function(i){
		$('.uni-slide .flex-control-nav img').eq(i-1).attr('src',$(this).attr('src'));
	});
	$('#back-top').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
			$('#go-bottom').fadeOut();
		} else {
			$('#back-top').fadeOut();
			$('#go-bottom').fadeIn();
		}
	});
	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//书籍轮播
	$('#box-scrolling').scrollbox({
		direction: 'h',
		distance: 131
	});
	$('#forward').click(function () {
		$('#box-scrolling').trigger('backward');
	});
	$('#backward').click(function () {
		$('#box-scrolling').trigger('forward');
	});

	$('#bl').scrollbox({
		direction: 'h',
		switchItems: 3,
		distance: 339,
		linear: true,
		delay: 0
	});

	$('#rec-list').scrollbox({
		direction: 'h',
		distance: 93
	});
	$('#forward').click(function () {
		$('#rec-list').trigger('backward');
	});
	$('#backward').click(function () {
		$('#rec-list').trigger('forward');
	});

	//教育(哲)学tabs切换
	$('.edu-head3-switcher a.item').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		return false;
	});
	$('.eh2 a, .eh4 a, .sub-head a,.project-tabs a').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		return false;
	});

	//法学tabs切换
	$('.two-tabs a').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		if($(this).parent().find('a').eq(0).hasClass('on')){
			$(this).parent().addClass('tw-tab1');
			$(this).parent().removeClass('tw-tab2');
		}else if($(this).parent().find('a').eq(1).hasClass('on')){
			$(this).parent().addClass('tw-tab2');
			$(this).parent().removeClass('tw-tab1');
		}
		return false;
	});
	$('.three-tabs a').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		if($(this).parent().find('a').eq(0).hasClass('on')){
			$(this).parent().addClass('th-tab1');
			$(this).parent().removeClass('th-tab2 th-tab3');
		}else if($(this).parent().find('a').eq(1).hasClass('on')){
			$(this).parent().addClass('th-tab2');
			$(this).parent().removeClass('th-tab1 th-tab3');
		}else if($(this).parent().find('a').eq(2).hasClass('on')){
			$(this).parent().addClass('th-tab3');
			$(this).parent().removeClass('th-tab1 th-tab2');
		}
		return false;
	});
	$('.two-tabs1 a').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		if($(this).parent().find('a').eq(0).hasClass('on')){
			$(this).parent().addClass('tw-tab1');
			$(this).parent().removeClass('tw-tab2');
		}else if($(this).parent().find('a').eq(1).hasClass('on')){
			$(this).parent().addClass('tw-tab2');
			$(this).parent().removeClass('tw-tab1');
		}
		return false;
	});
	$('.three-tabs1 a').click(function() {
		$(this).parent().find('.on').removeClass('on');
		$(this).addClass('on');
		if($(this).parent().find('a').eq(0).hasClass('on')){
			$(this).parent().addClass('th-tab1');
			$(this).parent().removeClass('th-tab2 th-tab3');
		}else if($(this).parent().find('a').eq(1).hasClass('on')){
			$(this).parent().addClass('th-tab2');
			$(this).parent().removeClass('th-tab1 th-tab3');
		}else if($(this).parent().find('a').eq(2).hasClass('on')){
			$(this).parent().addClass('th-tab3');
			$(this).parent().removeClass('th-tab1 th-tab2');
		}
		return false;
	});
});