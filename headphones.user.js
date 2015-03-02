// ==UserScript==
// @name        Be Still, Cody
// @namespace   http://chomperstomp.com
// @version     0.1.0+033
// @description Cut out the useless Chatter
// @author      Christopher McCulloh
// @contributor Chris Corwin
// @match       https://org62.my.salesforce.com/*
// @updateURL   https://rawgit.com/cormacmccarthy/be-still-cody/master/headphones.user.js
// @require     http://code.jquery.com/jquery-latest.js
// @require     https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js
// @grant       none
// ==/UserScript==

// the @require above should take care of this
// var jquery = document.createElement('script');
// jquery.src = "https://code.jquery.com/jquery-latest.js";
// document.getElementsByTagName('head')[0].appendChild(jquery);

// Add dependancies
var addDependancies = function addDependancies() {
	var injectedStyles = {
		'headphones': 'https://rawgit.com/cormacmccarthy/be-still-cody/master/headphones.user.css',
		'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'
		//, "https:// NEED SOME WAY TO MAKE THIS USER-SPECIFIC AT BUILD TIME /headphones.user.css"
	};

	_.each(injectedStyles, function eachInjectedStyles(value, key, styles) {
		$("head").append('<link href="' + value + '" rel="stylesheet" type="text/css">');
	});
}
addDependancies();


var trashBS = function trashBS() {
	// make tabs easier to access by assigning their text as class names
	$('#tabBar li').each(function eachTabBarLi(i, el) {
		var $el = $(el);
		$el.addClass($el.text().toLowerCase());
	});
	// Trash BS
	['#chat_widget_frame',
		'.brandZeronaryFgr',// trash logo
		'#Contract_Tab', '#AdvForecast_Tab', '#Opportunity_Tab', '#Contact_Tab', '#Account_Tab', '#Lead_Tab', '#Campaign_Tab', '#Case_Tab', '#Solution_Tab', '#report_Tab', '#Document_Tab', '#Workspace_Tab', '#ContentSearch_Tab', '#File_Tab', '#phHeader .left', '#bodyCell .links', '#presence_widget', '#tabBar .partner.applications', '#tabBar .sales.central', '#tabBar .companies', '.recElement.todoElement',// trash annoyingly bright yellow box thing
		'#section_header',// trash the amazing-space-eating "hide/show feed" button that for some reason needs its own huge bar. Well, trash the whole bar!
		'#ptBody',// trash pointless redundant egotistical feed header
		'.zen-branding',// trash logo
		'a[href^="javascript:openPopupFocusEscapePounds"]',// remove useless links to help docs
		'.chatterUserStatus',// trash redundant profile pic and link in Chatter
		'.headerContent'// trash pointless huge "salesforce.com" text and invisible header bar
	].forEach(function eachBS(el, i, bs) {
		$(el).remove();
	});
}
trashBS();

// Trash BS that loads really slowly
var trashSlowBS = function trashSlowBS() {
	['#presence_widget'].forEach(function eachPresenceWidget(el, i, bs) {
		$(el).remove();
	});


	$('.x-zen-tabMenu').addClass('nav').addClass('nav-pills');

	$('.feedcontainer .feeditemcommentplaceholder input').addClass('feedcontainerFeeditemcommentplaceholderInput');
	$('.feedcontainer .feeditemcommentplaceholder label span').addClass('feedcontainerFeeditemcommentplaceholderLabelSpan');
	$('.feedcontainer .feeditemcommentphoto img').addClass('feedcontainerFeeditemcommentphotoImg');
	$('.mainContentHeader').addClass('zen hidden');
	$('.headerContent').addClass('fade collapse');
	$('.zen-headerTop').addClass('pull-right');
	$('.zen-navViaMenus').addClass('pull-right');


	$('.leftContent ul').addClass('nav').addClass('nav-pills').addClass('nav-stacked');
	$('.selected').addClass('active').removeClass('selected');
	$('.zen-active').addClass('active').removeClass('zen-active');
	$('.zen-assistiveText').addClass('sr-only').removeClass('zen-assistiveText');
	$('.x-zen-assistiveText').addClass('sr-only').removeClass('x-zen-assistiveText');
	$('.brandPrimaryBgr').removeClass('brandPrimaryBgr');
	$('.primaryPalette').removeClass('primaryPalette');
	$('.zen-bodyZen').addClass('panel').addClass('panel-default').removeClass('zen-bodyZen').removeClass('brdPalette').removeClass('brandPrimaryBrd');
	$('.zen-navMenus').addClass('zen');
	$('.zen-bodyInner').addClass('panel-body').removeClass('zen-bodyInner');
	$('.leftContent').addClass('well');
	$('#rightContent').addClass('panel').addClass('panel-default');
	$('#rightContent > div').addClass('panel-body');
	$('html').addClass('fuelux').removeClass('zen');
	$('.zen-page > div > header').addClass('zen well');
	$('.menuButtonRounded').addClass('dropdown').removeClass('menuButtonRounded');
	$('.menuButtonButton').addClass('btn btn-primary dropdown-toggle').removeClass('menuButtonButton');
	$('link[href="/sCSS/33.0/sprites/1423103332000/Theme3/default/gc/zenifiedChatterPageBase.css"').remove();
	$('.feeditem').addClass('panel panel-default').removeClass('feeditem');
	$('.feeditemusericon').parent('a').parent('span').wrap('<div class="panel-heading"></div>');
	$('.feeditemusericon').removeClass('feeditemusericon');
	$('.feeditemcontent').addClass('panel-body').removeClass('feeditemcontent');
	$('.feeditemextras').addClass('well').removeClass('feeditemextras');
	$('.feeditemcomments').removeClass('feeditemcomments');
	$('.feeditemcomment').removeClass('feeditemcomment').addClass('panel panel-info');
	$('.feeditemcommentbody').removeClass('feeditemcommentbody').addClass('panel-body');
	$('.feeditemcommentphoto').addClass('pull-left');
	$('.feeditemcommentplaceholder').addClass('well').removeClass('feeditemcommentplaceholder');
	$('.newCommentContainer').addClass('well');
	$('.headerSearchLeftRoundedCorner').removeClass('headerSearchLeftRoundedCorner');

	window.setTimeout(trashSlowBS, 2000);
}
trashSlowBS();

var betterFeedItemActions = function betterFeedItemActions() {
	$('.cxfeeditem').each(function eachFeedItem(i, el) {
		var $el = $(el);
		if ($el.find('.hideFeedItem').length <= 0) {
			var id = $el[0].id;

			var $menu = $el.find('.feeditemActionMenu').detach();
			// var hide = '<a href="remove' + id + '" class="hideFeedItem" data-id="' + id + '"><span class="glyphicon glyphicon-volume-off" aria-hidden="true"></span></a>';
			var bookmark, editTopics, del;

			$menu.find('a').each(function () {
				var icon;
				$this = $(this);
				switch ($this.text()) {
					case "Bookmark":
						icon = "bookmark";
						bookmark = $this;
						break;
					case "Edit Topics":
						icon = "glyphicon-tags";
						editTopics = $this;
						break;
					case "Delete":
						icon = "glyphicon-remove";
						del = $this;
						break;
					case "Mute":
						icon = "glyphicon-volume-off";
						hide = $this;
						break;

				}

				$this.html('<span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span>')
			})

			$('<div class="feeditemActionsWrapper"></div>').appendTo($el.find('.panel-heading'))
				.append(hide, bookmark, editTopics, del);
		}
	});
	// $('.hideFeedItem').on('click', function onClickHideFeedItem(e) {
	// 	e.preventDefault();
	// 	chatter.getFeed().muteItem(this, $(this).data('id'));
	// });
	window.setTimeout(betterFeedItemActions, 4500);
}

var attachChatterChanges = function attachChatterChanges() {
	if (typeof chatter === "undefined") {
		return;
	}

	chatter.ext_Feed.muteItem = function muteItem(element, c) {
		// var b = $(element).closest(".cxfeeditem").data('feedItem').feeditemtype;
		var toolbox = chatter.getToolbox();
		toolbox.mask(Ext.fly(element));
		toolbox.post({
			url: "/feeditems/" + c + "/mute",
			success: function toolboxPostSuccess(b, c) {
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

	betterFeedItemActions();
}
window.setTimeout(attachChatterChanges, 4500);

$('.cxshowmorefeeditemscontainer.showmorefeeditemscontainer a')
	.on('click', function callbetterFeedItemActions(e) {
		window.setTimeout(betterFeedItemActions, 4500);
	});


// Add some handy string manipulation stuff to JavaScript itself.
String.prototype.endsWith = function endsWith(value) {
	if (this.length < value.length) {
		return false;
	} else {
		return Boolean(this.substr(this.length - value.length, value.length + 1) === value);
	}
};
String.prototype.contains = function contains(value, caseFlag) {
	if (this.length < value.length) {
		return false;
	} else {
		var regExPattern_value = caseFlag === false ? new RegExp(value, "i") : new RegExp(value);
		return Boolean(this.match(regExPattern_value));
	}
};

String.prototype.beginsWith = function beginsWith(string) {
	return this.indexOf(string) === 0;
};

// Make a jQuery class stripper.
var disableZen = function disableZen(el) {
	prefix = "zen-";
	var $zenElements = $(el);
	$zenElements.each(function disableEachZenElement(i, el) {
		var $thisElement = $(el);

		var oldClassNames = $thisElement.attr("class").split(" ");
		var newClassNames = "";
		$thisElement.attr("data-previous-class-names", $thisElement.attr("class"));
		$.each(oldClassNames, function (index, value) {
			if (value.beginsWith(prefix)) {
				newClassNames = newClassNames + " " + "x-" + value;
				$thisElement.attr( ("data-had-zen-class-" + value), "true");
			}
		});
		el.className = newClassNames;
	});
	return $zenElements;
};
disableZen();

var removeZenPrefix = function removeZenPrefix(el) {
	prefix = "zen-";
	var $zenElements = $(el);
	$zenElements.each(function removeEachZenElement(i, el) {
		var classes = el.className.split(" ").filter(function (c) {
			console.log("c.lastIndexOf( prefix, 0 )", c.lastIndexOf(prefix, 0));
			console.log("c.lastIndexOf( prefix, 0 ) !== 0", c.lastIndexOf(prefix, 0) !== 0);
			return c.lastIndexOf(prefix, 0) !== 0;
		});
		el.className = $.trim(classes.join(" "));
	});
	return $zenElements;
};
removeZenPrefix();
