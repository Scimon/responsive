var comp_loader = {
	breakpoints : {},
	init : function() {
		// Register all embed links 
		$('.embed').each( comp_loader.register );
	},
	register : function() {
		var url = $(this).attr( 'href' );
		// Id is the file name less last extension
		var comp_id = url.split( "/" ).pop().replace( /\..+$/, "" );
		// Embed target is the element with and id "embed-target-" + id OR the immediate parent
		var $embed_target = $(this).parents("#embed-target-" + comp_id); 
		if ( ! $embed_target.length ) { $embed_target = $(this).parent(); }
		if ( ! comp_loader.breakpoints[comp_id] ) {
			$.ajax( url, { success : comp_loader.load( url, comp_id, $embed_target ) } );
			comp_loader.breakpoints[comp_id] = {};
		}
	},
	load : function( url, comp_id, $embed_target ) {
		//console.log( comp_id );
		return function( data, textStatus, jqXHR ) {
			var nodes = $.parseHTML( data );
			// Look for stylsheets to embed and the 
			_.each( nodes, function( node ) {
				$node = $(node);
				if ( $node.filter( 'link.embeded' ).length ) {
					comp_loader.embed_style( $node );
				}
				if ( $node.filter( '#comp-' + comp_id ).length ) {
					comp_loader.get_data( $node , $embed_target );
				}
				if ( $node.find( '#comp-' + comp_id ).length ) {
					comp_loader.get_data( $node.find( '#comp-' + comp_id ) , $embed_target );
				}
			});
			comp_loader.init();
//			console.log( $( doc ).find( 'link.embed' ) );
		}
	},
	embed_style : function( $node ) {
		var url = $node.attr('href');
		if ( $('link[href="'+url+'"]').length == 0 ) {
			$('head').append( $node );
		}
	},
	get_data : function( $node, $embed_target ) {
		var original = $embed_target.html();
		//console.log( original );
		$embed_target.html('').append( $node ).data('original', original );
	}
	
}

//$().ready( comp_loader.init );

