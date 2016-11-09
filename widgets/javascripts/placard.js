//Last updated: 07/28/16 DLP
(function() {
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    var trackSpringsharePlacard = setInterval(function() {
        if (window.jQuery) {
            clearInterval(trackSpringsharePlacard);
            StartSpringsharePlacard();
        }
    }, 10);

    function StartSpringsharePlacard() {
        jQuery(window.frameElement).parent().parent().css('display','none');
        var searchterm = cleanSearchTerm(jQuery('.search-terms', window.top.document).attr('title').trim());
        searchterm = searchterm.replace(":", ""); //Necessary for issue with Springshare widgets
        searchterm = encodeURIComponent(searchterm);
        var springshareParams = jQuery('#springsharePlacard').data('params');
        springshareParams = springshareParams.split('\|');
        /* Attribute type
				[0]=LibGuides IID
				[1]=LibGuides version
				[2]=LibGuides IID v2 A-Z Database
				[3]=LibAnswers IID
				[4]=LibAnswers version
				[5]=Border Color
				[6]=Background Color
				[7]=Heading Color
				[8]=Text Color
				[9]=Border Width
				[10]=Border Style
				[11]=Display with Research Starters
				[12]=Where to display the placard
				[13]=After # of Result
				[14]=Number of results from Springshare to show
				[15]=Hide "View More Results" link based on # of results
				[16]=Label for LibGuides Results
				[17]=LibGuides: How to match the search term (v2 only)
				[18]=LibGuides: Retrieve a list that searches for group titles only (v2 only)
				[19]=LibGuides: Retrieve a list that searches for subject titles only (v2 only)
				[20]=LibGuides: How to sort the results (v2 only)
				[21]=LibGuides: Limit to specific Guide Types (v2 only)
				[22]=LibGuides: Filter results by specific Tags, use comma for multiple e.g. 147514,147515. (v2 only)
				[23]=LibGuides:Filter results by specific Subjects, use comma for multiple e.g. 41670,41672.(v2 only)
				[24]=LibGuides: Filter results by specific Groups, use comma for multiple e.g. 3462,3463. (v2 only)
				[25]=LibGuides: Filter results by specific Accounts, use comma for multiple e.g. 7725,7764. (v2 only)
				[26]=LibGuides: Always hide the "View More Results" link (v2 only)
				[27]=Label for LibGuides v2 A-Z Database
				[28]=Database: How to sort the results
				[29]=Database: Always hide the "View More Results" link
				[30]=Label for LibAnswers Results
				[31]=LibAnswers: Limit the search by topic(s). IDs should be comma separated. Default is 0 (all). (v2 only)
				[32]=LibAnswers: The ID of the group(s) from which the results should be chosen. Default is 0 (all public groups). (v2 only)
				[33]=LibAnswers: The order the questions should be sorted (v2 only)
				[34]=LibAnswers: The direction to sort the field named in the "sort" parameter. (v2 only)
				[35]=LibGuides: v1 Limit by type
			*/
		
		//General placard settings		
        var placard = '<div id="Placard_springy" style="display:none; border-width:' + springshareParams[9] + ';border-style:' + springshareParams[10] + ';border-color:' + springshareParams[5] + ';background-color:' + springshareParams[6] + ';padding:10px;"><div style="float:left;padding:10px;"></div><span id="Placard_libguides"></span><span id="Placard_libanswers"></span><span id="Placard_libdatabases"></span></div>';
        var headingstyle = '<div class="springy_heading" style="float:left; padding:5px;"><p><span style="font-size:120%;font-weight:bold;color:' + springshareParams[7] + ';">';
        var bodystyle = '<span class="springy_result" style="font-size:12px;padding-top:1px;color:' + springshareParams[8] + '">';

        //Where to display placard
        if (springshareParams[12] == 'before') {
            jQuery('.result-list', window.parent.document).before(placard);
        } else if (springshareParams[12] == 'beforers') {
            jQuery('#resultListControl', window.parent.document).prepend(placard);
        } else if (springshareParams[12] == 'after') {
            jQuery('.result-list', window.parent.document).after(placard);
        } else {
            var location = "#ResultIndex_" + springshareParams[12];
            jQuery(location, window.parent.document).parent().after(placard);
        }
        
        //Get LibAnswers
        var laURL = "";
        if (springshareParams[3] !== "") {
            if (springshareParams[4] == '1') {
                laURL = "https://api.libanswers.com/api_query.php?iid=" + springshareParams[3] + "&q=" + searchterm + "&limit=" + springshareParams[14] + "&format=json&callback=?";
            } else {
                laURL = "https://api2.libanswers.com/1.0/search/" + searchterm + "?iid=" + springshareParams[3] + "&limit=" + springshareParams[14] + "&topic_id=" + springshareParams[31] + "&group_id=" + springshareParams[32] + "&sort=" + springshareParams[33] + "&sort_dir=" + springshareParams[34] + "&callback=eds";
            }
            jQuery.ajax({
                url: laURL,
                contentType: "application/x-www-form-urlencoded",
                dataType: "jsonp",
            }).done(function(json) {
                laProcess(json);
            });
        }
        
        //Get LibGuides
        if (springshareParams[0] !== "") {
            //LibGuides v1
            if (springshareParams[1] == '1') {
                lgURLParams = encodeURI("iid=" + springshareParams[0] + "&type=" + springshareParams[35] + "&search=" + searchterm + "&limit=" + springshareParams[14] + "&more=false&break=li&sortby=relevance");
            	//Need to use PHP for CORS issue
            	lgURL = "https://widgets.ebscohost.com/prod/simplekey/springshare/libguidesv1.php?"+lgURLParams;
            } else {
                //LibGuides v2
                var guideTypes = "";
                if (springshareParams[21] == '0') {
                    guideTypes = "guide_types=&";
                } else {
                    var guideMatch = springshareParams[21].split(",");
                    var arrlength = guideMatch.length;
                    for (var i = 0; i < arrlength; i++) {
                        guideTypes += "guide_types%5B" + i + "%5D=" + guideMatch[i] + "&";
                    }
                }
                var groups = "";
                if (springshareParams[24] == '0') {
                    groups = "group_ids=&";
                } else {
                    var groups_match = springshareParams[24].split(",");
                    var arrlength = groups_match.length;
                    for (var i = 0; i < arrlength; i++) {
                        groups += "group_ids%5B" + i + "%5D=" + groups_match[i] + "&";
                    }
                }
                var tags = "";
                if (springshareParams[22] == '0') {
                    tags = "tag_ids=&";
                } else {
                    var tags_match = springshareParams[22].split(",");
                    var arrlength = tags_match.length;
                    for (var i = 0; i < arrlength; i++) {
                        tags += "tag_ids%5B" + i + "%5D=" + tags_match[i] + "&";
                    }
                }
                var subjects = "";
                if (springshareParams[23] == '0') {
                    subjects = "subject_ids=&";
                } else {
                    var subjects_match = springshareParams[23].split(",");
                    var arrlength = subjects_match.length;
                    for (var i = 0; i < arrlength; i++) {
                        subjects += "subject_ids%5B" + i + "%5D=" + subjects_match[i] + "&";
                    }
                }
                var accounts = "";
                if (springshareParams[25] == '0') {
                    accounts = "account_ids=&";
                } else {
                    var accounts_match = springshareParams[25].split(",");
                    var arrlength = accounts_match.length;
                    for (var i = 0; i < arrlength; i++) {
                        accounts += "account_ids%5B" + i + "%5D=" + accounts_match[i] + "&";
                    }
                }
                lgURL = "https://lgapi.libapps.com/widgets.php?site_id=" + springshareParams[0] + "&widget_type=1&search_terms=" + searchterm + "&search_match=" + springshareParams[17] + "&search_type=0&sort_by=" + springshareParams[20] + "&list_format=1&drop_text=Select+a+Guide...&output_format=1&load_type=2&enable_description=0&enable_group_search_limit=" + springshareParams[18] + "&enable_subject_search_limit=" + springshareParams[19] + "&" + tags + subjects + guideTypes + groups + accounts + "widget_embed_type=2&num_results=" + springshareParams[14] + "&enable_more_results=" + springshareParams[26] + "&window_target=2";
            }
            jQuery.ajax({
                url: lgURL,
                contentType: "application/x-www-form-urlencoded",
                dataType: "html",
            }).done(function(html) {
                lgProcess(html);
            });
        }
        
        //Get LibGuides Databases
        if (springshareParams[2] !== "") {
            var dbURL = "https://lgapi.libapps.com/widgets.php?site_id=" + springshareParams[2] + "&widget_type=2&search_terms="+searchterm+"&search_match=2&subject_ids=&sort_by=" + springshareParams[28] + "&list_format=1&drop_text=Select+a+Database...&output_format=1&load_type=2&enable_description=0&widget_embed_type=2&num_results=" + springshareParams[14] + "&enable_more_results=" + springshareParams[29] + "&window_target=2";
        
			 jQuery.ajax({
					url: dbURL,
					contentType: "application/x-www-form-urlencoded",
					dataType: "html",
				}).done(function(dbhtml) {
					ldProcess(dbhtml);
				});
        }
        //Log Placard settings
        if (jQuery('#springsharePlacard').data('debug') == 'y') {
        	window.console && console.log(springshareParams);
        	var values = springshareParams.join('|');
        	window.console && console.log("Your values:"+values);
        }
        
        function cleanSearchTerm(term) {
                var types = ['TI', 'AU', 'TX', 'SU', 'SO', 'AB', 'IS', 'IB'];
                var prefix = term.substring(0, 3),
                    offset, l = types.length,
                    i;
                for (i = 0; i < l; i += 1) {
                    // remove search identifiers from middle of term
                    while (term.indexOf(' ' + types[i] + ' ') > -1) {
                        offset = term.indexOf(' ' + types[i] + ' ');
                        term = term.substring(0, offset) + term.substring(offset + 3);
                    }
                    // remove search identifiers from beginning of term
                    if (prefix === types[i] + ' ') {
                        term = term.substring(3);
                    }
                }
                return term;
            }
            
        //Process LibAnswers JSON Response
        function laProcess(ladata) {
        		var lahtml = "";
        		var lahits = "";
        		var libanswersplacardtitle = headingstyle + springshareParams[30] + '</span><br />';
        		var libanswersplacardtext = libanswersplacardtitle + bodystyle + '<ul>';
                if (springshareParams[4] == '1') {
                    lahits = ladata.query.total_results;
                    //LibAnswers v1
                    if (lahits > '0') {
                    	jQuery(ladata.query.results).each(function() {
                        	var la_url = jQuery(this)[0].url;
                            var la_question = jQuery(this)[0].question;
                            libanswersplacardtext += '<li><a href="' + la_url + '" target="_blank">' + la_question + '</a></li>';
                        });
                     	libanswersplacardtext += '</ul></span></p></div>'
                        jQuery('#Placard_libanswers', window.parent.document).append(libanswersplacardtext);
                        var width = countcolumns();
                        jQuery('.springy_heading', window.parent.document).width(width);
                      	placarddisplay();  
                    }
                } else {
                	//LibAnswers v2
                    lahits = ladata.data.search.numFound;
                    if (lahits > '0') {
                        jQuery(ladata.data.search.results).each(function() {
                            var la_url = jQuery(this)[0].url;
                            var la_question = jQuery(this)[0].question;
                            libanswersplacardtext += '<li><a href="' + la_url + '" target="_blank">' + la_question + '</a></li>';
                        });
                        libanswersplacardtext += '</ul></span></p></div>'
                        jQuery('#Placard_libanswers', window.parent.document).append(libanswersplacardtext);
                        var width = countcolumns();
                        jQuery('.springy_heading', window.parent.document).width(width);
                      	placarddisplay();
                    }
                }
            }
        
        //Process LibGuides HTML Response
        function lgProcess(lghtml) {
        	var lghits = "";
        	var lg_html = "";
        	var libguidesplacardtitle = headingstyle + springshareParams[16] + '</span><br />';
            if ("" === lghtml) {
                lg_html = 'No results were found';
            } else {
                lg_html = lghtml;
            }
            lg_html = lg_html.replace("No results match the request.", "No results were found");
            var noResults = "No results were found"
            if (springshareParams[15] == 'y') {
                //Check if results is less than requested # of results. Hide View More Results link if it is
                var count = (lg_html.split("<li>").length - 1)
                if (count < springshareParams[14]) {
                    lg_html = lg_html.replace("View More Results", "");
                }
            }
            if (jQuery(lg_html).text().indexOf(noResults) != -1) {
            } else {
                var libguidesplacardtext = libguidesplacardtitle + bodystyle + lg_html + '</span></p></div>';
                jQuery('#Placard_libguides', window.parent.document).append(libguidesplacardtext);
                var width = countcolumns();
                jQuery('.springy_heading', window.parent.document).width(width);
                placarddisplay();
            }
        }
        
        //Process LibGuides Database HTML Response
        function ldProcess(ldhtml) {
            var ld_html = "";
            var dbplacardtitle = headingstyle + springshareParams[27] + '</span><br />';
            if ("" === ldhtml) {
                ld_html = 'No results were found';
            } else {
                ld_html = ldhtml;
            }
            ld_html = ld_html.replace("No results match the request.", "No results were found");
            var noResults = "No results were found"
            if (springshareParams[15] == 'y') {
                //Check if results is less than requested # of results. Hide View More Results link if it is
                var count = (ld_html.split("<li>").length - 1)
                if (count < springshareParams[14]) {
                    ld_html = ld_html.replace("View More Results", "");
                }
            }
            if (jQuery(ld_html).text().indexOf(noResults) != -1) {
            } else {
                var dbplacardtext = dbplacardtitle + bodystyle + ld_html + '</span></p></div>';
                jQuery('#Placard_libdatabases', window.parent.document).append(dbplacardtext);
                var width = countcolumns();
                jQuery('.springy_heading', window.parent.document).width(width);
                placarddisplay();
            }
        }
        //Placard Display
        function placarddisplay(){
			if (springshareParams[11] == '1') {
				if (jQuery('#Placard_springy', window.parent.document).is(":hidden")) {
					jQuery('#Placard_springy', window.parent.document).show();
					$('.placard-container', window.parent.document).hide();
				} 
			} else if (springshareParams[11] == '2') {
				if ($('.placard-container', window.parent.document).html().length == '0') {
					if (jQuery('#Placard_springy', window.parent.document).is(":hidden")) {
						jQuery('#Placard_springy', window.parent.document).show();
					}
				}
			} else if (springshareParams[11] == '0') {
				if (jQuery('#Placard_springy', window.parent.document).is(":hidden")) {
					jQuery('#Placard_springy', window.parent.document).show();
				}
			}
		}
        	
        //Determine number of columns and then width of each
        function countcolumns(){
        	var numColumns = jQuery('.springy_heading', window.parent.document).length;
        	var percent = (90/numColumns)+"%";
        	return percent;
        }
    }
}());