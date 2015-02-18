// ==UserScript==
// @name         Headphones
// @namespace    http://chomperstomp.com
// @version      0.1.3
// @description  Cut out the useless Chatter
// @author       Christopher McCulloh
// @match        https://org62.my.salesforce.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//make tabs easier to access by assigning their text as class names
$('#tabBar li').each(function(i, el){
	var $el = $(el);
	$el.addClass($el.text().toLowerCase());
});

// Trash BS
[
	'.brandZeronaryFgr', //trash logo
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
].forEach(function(el, i, bs){
	$(el).remove();
});

//trash BS that loads really slowly
var trashSlowBS = function() {
	[
		'#presence_widget'
	].forEach(function(el, i, bs){
		$(el).remove();
	});
	window.setTimeout(trashSlowBS, 2000);
}
trashSlowBS();

