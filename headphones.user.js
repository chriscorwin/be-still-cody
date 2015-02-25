// ==UserScript==
// @name         Headphones
// @namespace    http://chomperstomp.com
// @version      0.1.8
// @description  Cut out the useless Chatter
// @author       Christopher McCulloh
// @match        https://org62.my.salesforce.com/*
// @updateURL    https://raw.githubusercontent.com/cormacmccarthy/controlfreak/master/headphones.user.js
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//make tabs easier to access by assigning their text as class names
$('#tabBar li').each(function (i, el) {
	var $el = $(el);
	$el.addClass($el.text().toLowerCase());
});

// Trash BS
[
	'.brandZeronaryFgr',//trash logo
	'#Contract_Tab',
	'#AdvForecast_Tab',
	'#Opportunity_Tab',
	'#Contact_Tab',
	'#Account_Tab',
	'#Lead_Tab',
	'#Campaign_Tab',
	'#Case_Tab',
	'#Solution_Tab',
	'#report_Tab',
	'#Document_Tab',
	'#Workspace_Tab',
	'#ContentSearch_Tab',
	'#File_Tab',
	'#phHeader .left',
	'#bodyCell .links',
	'#presence_widget',
	'#tabBar .partner.applications',
	'#tabBar .sales.central',
	'#tabBar .companies',
	'.recElement.todoElement',//trash annoyingly bright yellow box thing
	'#section_header',//trash the amazing-space-eating "hide/show feed" button that for some reason needs its own huge bar. Well, trash the whole bar!
	'#ptBody',//trash pointless redundant egotistical feed header
	'.zen-branding',//trash logo
	'a[href^="javascript:openPopupFocusEscapePounds"]',//remove useless links to help docs
	'.chatterUserStatus',//trash redundant profile pic and link in Chatter
	'.headerContent'//trash pointless huge "salesforce.com" text and invisible header bar
].forEach(function (el, i, bs) {
	$(el).remove();
});

//trash BS that loads really slowly
var trashSlowBS = function () {
	[
		'#presence_widget'
	].forEach(function (el, i, bs) {
		$(el).remove();
	});
	window.setTimeout(trashSlowBS, 2000);
}
trashSlowBS();

var attachChatterChanges = function attachChatterChanges() {
	chatter.ext_Feed.muteItem = function (element, c) {
		console.log('here');
		//var b = $(element).closest(".cxfeeditem").data('feedItem').feeditemtype;

		var toolbox = chatter.getToolbox();
		toolbox.mask(Ext.fly(element));
		toolbox.post({
			url: "/feeditems/" + c + "/mute",
			success: function (b, c) {
				$(element).closest('.cxfeeditem').remove();
			}
		});
		chatter.getEventBus().fireEvent("chatter:feed", "onAfterDeleteFeedItem", {
			el: this
		})
	};
}

window.setTimeout(attachChatterChanges, 4500);

var betterMuteButton = function betterMuteButton() {
	$('.feeditem').each(function (i, el) {
		var $el = $(el);

		if ($el.find('.hideFeedItem').length <= 0) {
			var id = $el[0].id;
			$el.find('.preamblecontainer.displayblock').append('<a href="remove' + id + '" class="hideFeedItem" data-id="' + id + '">hide</a>');
		}
	});

	$('.hideFeedItem').on('click', function (e) {
		e.preventDefault();
		chatter.getFeed().muteItem(this, $(this).data('id'));
	});

	window.setTimeout(betterMuteButton, 4500);
}
betterMuteButton();

$('.cxshowmorefeeditemscontainer.showmorefeeditemscontainer a').on('click', function (e) {
	window.setTimeout(betterMuteButton, 4500);
});
