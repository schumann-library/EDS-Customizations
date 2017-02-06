//Need to create link within HLM with all metadata elements! Hover Text should be: getData
//http://resolver.ebscohost.com/openurl?&issn={issn}&issn1={issn1}&eissn={eissn}&eissn1={eissn1}&an={an}&doi={doi}&sici={sici}&source={generictitle}&title={atitle}&author={au}&authors={authors}&volume={volume}&issue={issue}&strtpage={spage}&pagect={tpages}&pages={pages}&date={date}&datei={datei}&year={year}&isbn={isbn}&pmid={pmid}&publisher={pub}
//originally created by EBSCO - http://imageserver.ebscohost.com/branding/EDS/js/fulltextfindercitationstyle.js


var getData = jQuery("a[title='getData']").attr("href");
getData = getData.replace("/openurl/linkout?link=","");
getData = getData.split("&data=")[0];
var newData = decodeURIComponent(getData);
console.log(newData);

function getURLParam(name)
        {
            // get query string part of url into its own variable
            var url = newData;
            var query_string = url.split("?");
            
            // make array of all name/value pairs in query string
            var params = query_string[1].split("&");
            
            // loop through the parameters
            var i = 0;
            while (i < params.length) {
                // compare param name against arg passed in
                var param_item = params[i].split("=");
                if (param_item[0] == name) {
                    // if they match, return the value
                    return param_item[1];
                }
                i++;
            }
            return "";
        }
		
var myissn = getURLParam("issn");
var myissn1 = getURLParam("issn1");
var myeissn = getURLParam("eissn");
var myeissn1 = getURLParam("eissn1");
var myan = getURLParam("an");
var mydoi = getURLParam("doi");
var mysici = getURLParam("sici");
var mysource = getURLParam("source");
var mytitle = getURLParam("title");
var myauthor = getURLParam("author");
var myauthors = getURLParam("authors");
var myvolume = getURLParam("volume");
var myissue = getURLParam("issue");
var mystrtpage = getURLParam("strtpage");
var mypagect = getURLParam("pagect");
var mypages = getURLParam("pages");
var mydate = getURLParam("date");
var mydatei = getURLParam("datei");
var myyear = getURLParam("year");
var myisbn = getURLParam("isbn");
var mypmid = getURLParam("pmid");
var mypublisher = getURLParam("publisher");

var mynewdescript = (myauthor !== '' ? '<p class="citationvalues myauthor">Author: <span>'+myauthor+'</span></p>' :'');
mynewdescript += (mysource !== '' ? '<p class="citationvalues mysource">Publication: <span>'+mysource+'</span></p>' :''); 
mynewdescript += (myvolume !== '' ? '<p class="citationvalues myvolume">Volume: <span>'+myvolume+'</span></p>' :'');
mynewdescript += (myissue !== '' ? '<p class="citationvalues myissue">Issue: <span>'+myissue+'</span></p>' :'');
mynewdescript += (mypages !== '' ? '<p class="citationvalues mypages">Pages: <span>'+mypages+'</span></p>' :''); 
mynewdescript += (myyear !== '' ? '<p class="citationvalues myyear">Year: <span>'+myyear+'</span></p>' :'');
mynewdescript += (myissn1 !== '' ? '<p class="citationvalues myissn1">ISSN: <span>'+myissn1+'</span></p>' :'');
mynewdescript += (myeissn1 !== '' ? '<p class="citationvalues myeissn1">Online ISSN: <span>'+myeissn1+'</span></p>' :'');
mynewdescript += (myisbn !== '' ? '<p class="citationvalues myisbn">ISBN: <span>'+myisbn+'</span></p>' :'');
//mynewdescript += (myissn !== '' ? '<p class="citationvalues myissn">ISSN: <span>'+myissn+'</span></p>' :'');
//mynewdescript += (myeissn !== '' ? '<p class="citationvalues myeissn">eISSN: <span>'+myeissn+'</span></p>' :'');
mynewdescript += (mypublisher !== '' ? '<p class="citationvalues mypublisher">Publisher: <span>'+mypublisher+'</span></p>' :'');
mynewdescript += (mypagect !== '' ? '<p class="citationvalues mypagect">Page Count: <span>'+mypagect+'</span></p>' :'');
mynewdescript += (mystrtpage !== '' ? '<p class="citationvalues mystrtpage">Start Page: <span>'+mystrtpage+'</span></p>' :'');
mynewdescript += (mydate !== '' ? '<p class="citationvalues mydate">Date: <span>'+mydate+'</span></p>' :'');
mynewdescript += (mydatei !== '' ? '<p class="citationvalues mydatei">Date International: <span>'+mydatei+'</span></p>' :'');
mynewdescript += (mypmid !== '' ? '<p class="citationvalues mypmid">PMID: <span>'+mypmid+'</span></p>' :''); 
mynewdescript += (mydoi !== '' ? '<p class="citationvalues mydoi">DOI: <span>'+mydoi+'</span></p>' :'');
mynewdescript += (mysici !== '' ? '<p class="citationvalues mysici">SICI: <span>'+mysici+'</span></p>' :'');
mynewdescript += (myan !== '' ? '<p class="citationvalues myan">Accession Number: <span>'+myan+'</span></p>' :'');

mynewdescript = decodeURIComponent(mynewdescript);

 jQuery("a[title='getData']").parent().css("display","none");
  jQuery("p.descript").after(mynewdescript);
 jQuery("p.descript").remove();


     
$( window ).load(function(){
$('.header-module.media-content').prependTo('.main-content')

//create a button for each fulltext link
$("h4[data-auto='menu-section-header']:contains('Full Text')").parent().find("a[data-auto='menu-link']").each(function() {
  $( "<a>", {'class':'btn myfulltextbutton'} ).attr('href', $(this).attr('href')).text('Read Online').insertBefore(this)
});

//toggle other full text options
firstFulltextLink = $("h4[data-auto='menu-section-header']:contains('Full Text')").parent().find("li[data-auto='link-container']:first");
otherFulltextLinks = $("h4[data-auto='menu-section-header']:contains('Full Text')").parent().find("li[data-auto='link-container']:not(:first)").toggle();

if (otherFulltextLinks.length != '0') {
     
$('<a>').text('more options').wrap('<div/> {"id" : "more-options-link-wrapper"}').click(function(){
otherFulltextLinks.toggle();
$(this).text(function(i, text){
          return text === "more options" ? "hide options" : "more options";
      });
}).appendTo(firstFulltextLink.parent());

}



$('.open-url-resolver').show();


});