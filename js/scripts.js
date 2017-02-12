$(document).ready(function(){


$.fn.setHeight = function( param ){
	var pole = $( this );

	if( !param ){
		pole.css( 'height', $( window ).height() );
		$( window ).resize(function() {
			pole.css( 'height', $( window ).height() );
		});
		return;
	}else{
		pole.css( 'height', $( window ).height() - $( param ).height() + 'px' );
		$( window ).resize(function() {
			pole.css( 'height', $( window ).height() - $( param ).height() + 'px' );
		});
		return;
	}
}

$.fn.unsliderEnlargement = function(param){

	var pole = $( this );
	pole.children( 'ul' ).css({
		'display': 'inline-block'
	});

	$.each( pole.children( 'ul' ).children( '.item' ), function( index ){
		var check =  /([.]{1})+([a-z0-9]{3,4})/.exec( $( this ).data( 'src' ) )[0];
		check = check.substr(1, 4);
		$( this ).setHeight();

		if( check == 'jpg' || check == 'jpeg' || check == 'png' ){
			$( this ).css({
				'background': 'url('+ $( this ).data( 'src' ) +') center',
				'background-size': 'cover',
				'background-repeat': 'no-repeat'
			});
			if( param == 'parallax' ) $( this ).css('background-attachment', 'fixed');
		}
		else if( check == 'mp4' || check == 'webm' ){
			var add = $( '<video muted autoplay loop class="unslider-video-background">' );
			add.css({
				'position': 'absolute',
			    'background-color': '#000',
			    'background-attachment': 'fixed',
			    'z-index': '-10',
			    'width': '100%',
			    'top': '0',
			    'left': '0'
			});
			add.setHeight();

			$.each( $( this ).data( 'src' ).split( ',' ), function( index, key ){
				add.append( '<source src="'+ key +'" type="video/'+ check +'">' );
			});

			add
				.append( 'Twoja przeglądarka nie obsługuje Video.' )
				.appendTo( $( this ) );
		}
	});

	var $positionSlideItem = 1;
	setInterval(function(){
		if( pole.find('.unslider-wrap').css('left') == $positionSlideItem ) return;
		
		pole.children( 'ul' ).children('li').each(function(index){

			if( $(this).hasClass('unslider-active') ){
				$(this).children('div').delay(300).animate({
					'opacity': 1,
					'right': '10%'
				}, 500);
			}else{
				$(this).children('div').delay(1000).css({
					'opacity': 0,
					'right': '100%'
				});
			}
				
		});
		
		$positionSlideItem = $('.unslider-wrap').css('left');
		
	}, 500);

	if( param == 'parallax' ){
		$(window).scroll(function(){
			pole.find('.unslider-video-background').css('top', $(window).scrollTop() - pole.offset().top +'px' );
		});
	}
		
}


////////////////////////////////////////////////
var $slider = $('.unslider-header');

$slider.unslider({
	autoplay: true,
	arrows: false,
	nav: false
})
.unsliderEnlargement();

$('.unslider-header-prev').click(function(){
	$slider.unslider('prev');
});

$('.unslider-header-next').click(function(){
	$slider.unslider('next');
});
////////////////////////////////////////////////
var $slider1 = $('.unslider-main');

$slider1.unslider({
	autoplay: false,
	arrows: false,
	nav: false
})
.unsliderEnlargement('parallax');

$('.unslider-header-prev').click(function(){
	$slider1.unslider('prev');
});

$('.unslider-header-next').click(function(){
	$slider1.unslider('next');
});


});