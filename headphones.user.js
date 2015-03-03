// ==UserScript==
// @name        Be Still, Cody
// @namespace   http://chomperstomp.com
// @version     0.1.0+066
// @description Cut out the useless Chatter
// @author      Christopher McCulloh
// @contributor Chris Corwin
// @match       https://org62.my.salesforce.com/*
// @updateURL   https://raw.githubusercontent.com/cormacmccarthy/be-still-cody/master/headphones.user.js
// @updateURL   https:// rawgit.com/cormacmccarthy/be-still-cody/master/headphones.user.js
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

var reDOM = function reDOM() {
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
}

var closedFeedItems = JSON.parse(localStorage.getItem('closedFeedItems')) || [];
var toggleFeedItem = function toggleFeedItem($el) {
	if ($el.find('.cxfeeditemcontent').hasClass('hidden')) {
		discloseFeedItem($el);
	} else {
		closeFeedItem($el);
	}
}
var closeFeedItem = function closeFeedItem($el) {
	var labelClass = 'label-default';
	var commentsN = scrapeFeedItemCommentCount($el);
	var previouslyHiddenItem = _.findWhere(closedFeedItems, {
		id: $el.prop('id')
	});

	if (!previouslyHiddenItem) {
		//new item, add to closedFeedItems list
		closedFeedItems.unshift({
			id: $el.prop('id'),
			comments: commentsN
		});
	} else if (previouslyHiddenItem.comments < commentsN) {
		//don't update the comments count. Only update the count on newly closing an item, otherwise it will show comments as read when they may not have been
		labelClass = 'label-primary';
		$('cxfeedcontainer').after($el.detach());
	}

	localStorage.setItem('closedFeedItems', JSON.stringify(closedFeedItems));
	$el.find('.disclosureTrigger .glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
	$el.find('.disclosureTrigger .label').removeClass().addClass('label ' + labelClass).text(commentsN);
	$el.find('.cxfeeditemcontent').addClass('hidden');
}
var discloseFeedItem = function discloseFeedItem($el) {
	//remove from closedFeedItems array
	if (closedFeedItems.length > 0) {
		closedFeedItems = _.reject(closedFeedItems, function (id) {
			return id == $el.prop('id');
		});
		localStorage.setItem('closedFeedItems', JSON.stringify(closedFeedItems));
	}

	$el.find('.disclosureTrigger .glyphicon').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');;
	$el.find('.cxfeeditemcontent').removeClass('hidden')
}
var scrapeFeedItemCommentCount = function scrapeFeedItemCommentCount($el) {
	var hiddenN = $el.find('.cxfeedcommentcount').text() - 0;
	var shownN = $el.find('.cxfeedcomment').length;
	return hiddenN + shownN || 0;
}

var reDOMfeeditems = function reDOMfeeditems() {
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

	$('.cxfeeditem:not(.processed)').each(function eachFeedItem(i, el) {
		var $el = $(el);

		$el.addClass('processed');

		$el.find('.panel-heading').prepend('<a class="disclosureTrigger"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span><span class="label label-default"></span></a>');

		var id = $el[0].id;

		var $feeditemTitle = $el.find('.preamblecontainer').detach();
		var $person = $feeditemTitle.find('.feeditemsecondentity').detach();
		var $group = $feeditemTitle.find('.feeditemfirstentity').detach();
		$feeditemTitle.empty().append($person, $('<span> - </span>'), $group);
		$el.find('.panel-heading').append($feeditemTitle);

		var $topics = $el.find('.topics').detach();
		$topics.find('.editLink').remove();
		$el.find('.panel-heading').append($topics);

		var $menu = $el.find('.feeditemActionMenu').detach();

		var hide, bookmark, editTopics, del;
		$menu.find('a').each(function () {
			var icon;
			$this = $(this);
			switch ($this.text()) {
				case "Bookmark":
					icon = "bookmark";
					bookmark = $this;
					break;
				case "Edit Topics":
					icon = "tags";
					editTopics = $this;
					break;
				case "Delete":
					icon = "remove";
					del = $this;
					break;
				case "Mute":
					icon = "volume-off";
					hide = $this;
					break;

			}

			$this.html('<span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span>')
		});

		$('<div class="feeditemActionsWrapper"></div>').appendTo($el.find('.panel-heading'))
			.append(hide, bookmark, editTopics, del);

		$el.find('.disclosureTrigger .label').text(scrapeFeedItemCommentCount($el));

		var isHidden = _.findWhere(closedFeedItems, {
			id: $el.prop('id')
		});

		if (isHidden) {
			closeFeedItem($el);
		}

		$el.find('.disclosureTrigger').on('click', function (e) {
			e.preventDefault();
			var $this = $(this).closest('.cxfeeditem');
			toggleFeedItem($this);
		});

		var $timestamp = $el.find('a.feeditemtimestamp').detach();
		$el.find('.panel-heading').append($timestamp);
	});

	window.setTimeout(reDOMfeeditems, 4500);
}

var trashBS = function trashBS() {
	// make tabs easier to access by assigning their text as class names
	$('#tabBar li').each(function eachTabBarLi(i, el) {
		var $el = $(el);
		$el.addClass($el.text().toLowerCase());
	});
	// Trash BS
	['#chat_widget_frame',
		'link[href="/sCSS/33.0/sprites/1423103332000/Theme3/default/gc/zenifiedChatterPageBase.css"',
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
reDOM();
reDOMfeeditems();

// Trash BS that loads really slowly
var trashDelayedBS = function trashDelayedBS() {
	['#presence_widget'].forEach(function eachPresenceWidget(el, i, bs) {
		$(el).remove();
	});

	window.setTimeout(trashDelayedBS, 2000);
}
trashDelayedBS();

var bailAfter = 10;
var bailCount = 0;
var attachChatterChanges = function attachChatterChanges() {
	bailCount++;
	if (typeof chatter === "undefined") {
		if (bailCount < bailAfter) {
			window.setTimeout(attachChatterChanges, 500);
		}

		return;
	}

	bailCount = bailAfter;

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
}
attachChatterChanges();

$('.cxshowmorefeeditemscontainer.showmorefeeditemscontainer a')
	.on('click', function callreDOMfeeditems(e) {
		window.setTimeout(reDOMfeeditems, 4500);
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
