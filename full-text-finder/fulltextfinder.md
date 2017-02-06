Full Text Finder - custom citation styles 
===============================

This works by first creating a hidden link in the FTF menu which contains all of the citation information. Then in the bottom branding on the FTF menu page we include some javascript to extract the citation components from that hidden link and some CSS to style them. 

## Step 1. Create a link within Holdings Management with all metadata elements. Hover Text should be: getData

Example link settings for holdings management
- link name: getData - For use in JavaScript to modify FTF menu
- Rank: 0
- Category: other
- link text: .
- hover text: getData
- base URL: http://resolver.ebscohost.com/openurl
- query string: ?&issn={issn}&issn1={issn1}&eissn={eissn}&eissn1={eissn1}&an={an}&doi={doi}&sici={sici}&source={generictitle}&title={atitle}&author={au}&authors={authors}&volume={volume}&issue={issue}&strtpage={spage}&pagect={tpages}&pages={pages}&date={date}&datei={datei}&year={year}&isbn={isbn}&pmid={pmid}&publisher={pub}
- show link: always
- general settings: {Show only if no (other) full text is available: NO; Show in Full Text Finder: yes;}

## Step 2. Add code to FTF bottom branding. 

In EBSCO admin edit the bottom branding for the FTF profile. 

Include the .js and CSS from EBSCO, or create your own. 

### see 
fulltextfindercitationstyle.js
fulltextfindercitationstyle.css
