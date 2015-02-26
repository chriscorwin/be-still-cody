// ==UserScript==
// @name        Be Still, Cody
// @namespace   http:// chomperstomp.com
// @version     0.1.0+003
// @description Cut out the useless Chatter
// @author      Christopher McCulloh
// @contributor Chris Corwin
// @match       https:// org62.my.salesforce.com/*
// @updateURL   https:// raw.githubusercontent.com/cormacmccarthy/be-still-cody/master/headphones.user.js
// @grant       none
// ==/UserScript==

// Add dependancies
var addDependancies = function() {
    var injectedStyles = [
        "https://code.jquery.com/jquery-latest.js"
    ,   "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
    //, "https:// NEED SOME WAY TO MAKE THIS USER-SPECIFIC AT BUILD TIME /headphones.user.css"
    ];

    $.each( injectedStyles, function( index, value ) {
        $( "head" ).append( '<link href="' + value + '"' + ' rel="stylesheet" type="text/css">' );
    } );

    var injectedScripts = [
        "https://code.jquery.com/jquery-latest.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js"
    ];

    $.each( injectedScripts, function( index, value ) {
        $( "head" ).append( '<script src="' + value + '"></script>' );
    } );
}

// make tabs easier to access by assigning their text as class names
$('#tabBar li')
	.each(function(i, el) {
		var $el = $(el);
		$el.addClass($el.text()
			.toLowerCase());
	});
// Trash BS
['.brandZeronaryFgr', // trash logo
	'#Contract_Tab', '#AdvForecast_Tab', '#Opportunity_Tab', '#Contact_Tab', '#Account_Tab', '#Lead_Tab', '#Campaign_Tab', '#Case_Tab', '#Solution_Tab', '#report_Tab', '#Document_Tab', '#Workspace_Tab', '#ContentSearch_Tab', '#File_Tab', '#phHeader .left', '#bodyCell .links', '#presence_widget', '#tabBar .partner.applications', '#tabBar .sales.central', '#tabBar .companies', '.recElement.todoElement', // trash annoyingly bright yellow box thing
	'#section_header', // trash the amazing-space-eating "hide/show feed" button that for some reason needs its own huge bar. Well, trash the whole bar!
	'#ptBody', // trash pointless redundant egotistical feed header
	'.zen-branding', // trash logo
	'a[href^="javascript:openPopupFocusEscapePounds"]', // remove useless links to help docs
	'.chatterUserStatus', // trash redundant profile pic and link in Chatter
	'.headerContent' // trash pointless huge "salesforce.com" text and invisible header bar
].forEach(function(el, i, bs) {
	$(el)
		.remove();
});
// Trash BS that loads really slowly
var trashSlowBS = function() {
	['#presence_widget'].forEach(function(el, i, bs) {
		$(el)
			.remove();
	});
	window.setTimeout(trashSlowBS, 2000);
}
trashSlowBS();
var attachChatterChanges = function attachChatterChanges() {
	chatter.ext_Feed.muteItem = function(element, c) {
		console.log('here');
		// var b = $(element).closest(".cxfeeditem").data('feedItem').feeditemtype;
		var toolbox = chatter.getToolbox();
		toolbox.mask(Ext.fly(element));
		toolbox.post({
			url: "/feeditems/" + c + "/mute",
			success: function(b, c) {
				$(element)
					.closest('.cxfeeditem')
					.remove();
			}
		});
		chatter.getEventBus()
			.fireEvent("chatter:feed", "onAfterDeleteFeedItem", {
				el: this
			})
	};
}
window.setTimeout(attachChatterChanges, 4500);
var betterMuteButton = function betterMuteButton() {
	$('.feeditem')
		.each(function(i, el) {
			var $el = $(el);
			if ($el.find('.hideFeedItem')
				.length <= 0) {
				var id = $el[0].id;
				$el.find('.preamblecontainer.displayblock')
					.append('<a href="remove' + id + '" class="hideFeedItem" data-id="' + id + '">hide</a>');
			}
		});
	$('.hideFeedItem')
		.on('click', function(e) {
			e.preventDefault();
			chatter.getFeed()
				.muteItem(this, $(this)
					.data('id'));
		});
	window.setTimeout(betterMuteButton, 4500);
}
betterMuteButton();
$('.cxshowmorefeeditemscontainer.showmorefeeditemscontainer a')
	.on('click', function(e) {
		window.setTimeout(betterMuteButton, 4500);
	});


// Add some handy string manipulation stuff to JavaScript itself.
String.prototype.endsWith = function( value ) {
    if ( this.length < value.length ) {
        return false;
    } else {
        return Boolean( this.substr( this.length - value.length, value.length + 1 ) === value );
    }
};
String.prototype.contains = function( value, caseFlag ) {
    if ( this.length < value.length ) {
        return false;
    } else {
        var regExPattern_value = caseFlag === false ? new RegExp( value, "i" ) : new RegExp( value );
        return Boolean( this.match( regExPattern_value ) );
    }
};

String.prototype.beginsWith = function( string ) {
    return this.indexOf( string ) === 0;
};

// Make a jQuery class stripper.
disableZen = function( el ) {
    prefix = "zen-";
    var $theseElements = $(el);
    $theseElements.each( function( i, el ) {
        var $thisElement = $( el );

        var oldClassNames = $thisElement.attr( "class" ).split( " " );
        var newClassNames = "";
        $thisElement.attr( "data-previous-class-names", $thisElement.attr( "class" ) );
        $.each( oldClassNames, function( index, value ) {
            if ( value.beginsWith( prefix ) ) {
                newClassNames = newClassNames + " " + "x-" + value;
                $thisElement.attr( ( "data-had-zen-class-" + value ), "true" );
            }
        } );
        el.className = newClassNames;
    } );
    return $theseElements;
};


removeZenPrefix = function( el ) {
    prefix = "zen-";
    var $theseElements = $(el);
    $theseElements.each( function( i, el ) {
        var classes = el.className.split( " " ).filter( function( c ) {
            console.log( "c.lastIndexOf( prefix, 0 )", c.lastIndexOf( prefix, 0 ) );
            console.log( "c.lastIndexOf( prefix, 0 ) !== 0", c.lastIndexOf( prefix, 0 ) !== 0 );
            return c.lastIndexOf( prefix, 0 ) !== 0;
        } );
        el.className = $.trim( classes.join( " " ) );
    } );
    return $theseElements;
};