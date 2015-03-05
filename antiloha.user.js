// ==UserScript==
// @name         Antiloha
// @namespace    http://chomperstomp.com/
// @version      0.1.0+001
// @description  Turn Aloha from a memory-game style free-for all into something slightly more understandable
// @author       Christopher McCulloh
// @updateURL    https://raw.githubusercontent.com/cormacmccarthy/be-still-cody/master/Antiloha.user.js
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js
// @match        https://aloha.my.salesforce.com/apex/aloha_appLauncher?sfdc.tabName=01rd000000030Y4
// @grant        none
// ==/UserScript==

$('body').append('<style>#sortable .tile{width: 120px;} .front img{width: 100px;} .front, .back {width: 100px;} #sortable li{margin: 0 10px 10px 0 !important;} </style>');

$("#hdr .animate").html( $("#hdr .animate").html().replace(/Aloha/g,"Hello") );

$('#sortable li a').each(function(i, el){
    var $el = $(el);
    $el.css({height: '175px'});
    var words = $el.find('.description p')[0];
    var id = $el.find('.front h2')[0];
    $el.find('.back').remove();
    $el.find('.front h2').remove();
    $el.prop('id', $(id).text().replace(/[ \(\)\&\#]/g,"").toLowerCase());
    $(words).css({'margin-top': '75px', 'font-size': '.8em'}).appendTo($el);
});

//remove bs
['#gus', '#boothforce', '#eos', '#supplierportal', '#successcommunity', '#partnercommunity', '#planview', '#technologyrd', '#cashforce', '#trustacademy'].forEach(function(el, i, arr){
    $(el).closest('li').remove();
});

//sort the "sortable" stuff so that relevant stuff is closer to the top
['#googlesites', '#slic', '#supportforce', '#peopleforce', '#coupa', '#corpediafteonly', '#salesforcemediacenter'].forEach(function(el, i, arr){
    var $el = $(el).closest('li').detach();
    $el.appendTo('#sortable');
});

//sanitize tiles
var sanitization = [
    {'id':'#org62', 'title':'chatter'},
    {'id':'#foundationorg', 'title':'volunteer hours and donations'},
    {'id':'#dreamjobcentral', 'title':'benefit elections & time off'},
    {'id':'#workday', 'title':'personal contact info, benefit elections, time off requests.'},
    {'id':'#concur', 'title':'travel & expenses'},
    {'id':'#adpportalnon-sso', 'title':'paystubs & W2s'},
    {'id':'#anyperkusonly', 'title':'retail discounts'},
    {'id':'#serraview', 'title':'Officespace v2 (office maps)'},
    {'id':'#wageworks', 'title':'Benefits (Wellness, Commuter, etc)'},
    {'id':'#googledrive', 'title':'Google Drive'},
    {'id':'#googlesites', 'title':'Google Sites'},
    {'id':'#slic', 'title':'Kinda like Basecamp...'},
    {'id':'#supportforce', 'title':'IT Ticketing'},
    {'id':'#peopleforce', 'title':'Talentforce'},
    {'id':'#corpediafteonly', 'title':'"Ethics" & Compliance'},
    {'id':'#salesforcemediacenter', 'title':'Media Streaming/Hosting'},

];
sanitization.forEach(function(item, i, sanitization){
    console.log('id', item.id, 'text', item.title);
    $(item.id).find('p').text(item.title);
});

