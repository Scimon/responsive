var exploder = {
	breakpoint : 600,
	explode : function() {
		if ( window.self == window.top ) {
			$('.explode').each( function() {
				var ex = !! ( $('body').width() > exploder.breakpoint );
				if ( ex ) {
					$('body').addClass('exploded');
				} else {
					$('body').removeClass('exploded');
				}

				var url = $(this).attr( 'href' ) ? $(this).attr( 'href' ) : $(this).attr( 'data' );
				var klass = $(this).attr( 'class' );
				var text = $(this).data('text') ? $(this).data('text') : $(this).html();
				if ( ex ) {
					$(this).replaceWith( '<object data-text="'+ text +'" class="'+ klass +'" data="'+ url +'" type="text/html"></object>' );
				} else {
					$(this).replaceWith( '<a class="'+ klass +'" href="'+ url +'">'+ text +'</a>' );
				}
			});
		} else {
			$('.explode').remove();
			$('body').addClass('child');
		}
	},
	checkExplode : function() {
		var ex = !! ( $('body').width() > exploder.breakpoint );
		if ( ex != $('body').hasClass('exploded' ) ) {
			exploder.explode();
		}
	},
	init : function() {
		exploder.explode();
		if ( window.self == window.top ) {
			$(window).on('resize', exploder.checkExplode );
		}
	}
}

$().ready( exploder.init );

