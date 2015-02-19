// ==UserScript==
// @name         Headphones
// @namespace    http://chomperstomp.com
// @version      0.1.5
// @description  Cut out the useless Chatter
// @author       Christopher McCulloh
// @match        https://org62.my.salesforce.com/*
// @updateURL    https://raw.githubusercontent.com/cormacmccarthy/controlfreak/master/headphones.user.js
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

//hide hidden items, and add hide to remaining
var hiddenChats = JSON.parse(localStorage.getItem('hiddenChats')) || []; 
console.log('hiddenChats', hiddenChats);
var enableHiddenChatsFeature = function enableHiddenChatsFeature() {
    $('.feeditem').each(function(i, el){
        var $el = $(el);
        var id = $el[0].id;
        var hiddenChatI = hiddenChats.indexOf(id);

        if(hiddenChatI >= 0){
            $el.remove();
        }else{
            if($el.find('.hideFeedItem').length <= 0){
                $el.find('.preamblecontainer.displayblock').append('<a href="remove' + id + '" class="hideFeedItem" data-id="' + id + '">hide</a>');
            }
        }
    });

    $('.hideFeedItem').on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        hiddenChats.unshift($this.data('id'));
        localStorage.setItem('hiddenChats', JSON.stringify(hiddenChats));
        $this.closest('.feeditem').remove();
    });
    
    window.setTimeout(enableHiddenChatsFeature, 4500);
}
enableHiddenChatsFeature();

$('.cxshowmorefeeditemscontainer.showmorefeeditemscontainer a').on('click', function(e){
    window.setTimeout(enableHiddenChatsFeature, 4500);
});
