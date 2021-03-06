var initSearchOptions = '';
(function () {
    "use strict"; // optional

    //init variables to load App
    var initCatLimiter = 0;
    var trackCatLimiter = setInterval(function () { if (window.jQuery) { clearInterval(trackCatLimiter); StartCatLimiter(); } }, 10);

    function StartCatLimiter() {
        if (initCatLimiter === 1) { return; } else { initCatLimiter = 1; }
        var appPosition = jQuery('.CatLimiter-app').data('p'); // position

        jQuery.ajax({
            url: '/eds/searchoptions?sid=' + QueryString('sid') + '&vid=' + QueryString('vid') + '&nobk=T'
        }).done(function (data) {
            initSearchOptions = jQuery(data);
            var catalogueProp = (jQuery(initSearchOptions).find('#common_FC').prop('checked'))?' checked="checked" ':'';
            var catalogueText = jQuery(initSearchOptions).find('label[for="common_FC"]').text();
            var limiterItem = '<li>\
				<span class="limControl">\
					<input name="common_FC" onclick="CommonFCTriggerClick()" type="checkbox" ' + catalogueProp + ' id="common_FC" title="' + catalogueText + '">\
				</span>\
				<label class="limCaption" for="common_FC">\
					<a href="javascript:CommonFCTriggerClick()">' + catalogueText + '</a>\
				</label>\
			</li>';
            jQuery('#commonCheckboxLimiters li:eq(' + appPosition + ')').before(limiterItem);
        });
    }


}());

function CommonFCTriggerClick() {
	jQuery('body').append('<div id="modal-screen" class="ui-widget-overlay" style="z-index: 9000; top: 0px; left: 0px;opacity: 0.5;"></div><div style="display:none;" id="catLimiterSearchOptions"></div>');
	if (jQuery(initSearchOptions).find('#common_FC').prop('checked')) {
		jQuery(initSearchOptions).find('#common_FC').prop('checked', false);
	} else {
		jQuery(initSearchOptions).find('#common_FC').prop('checked', true);
	}
	jQuery('#catLimiterSearchOptions').append(initSearchOptions);
	jQuery(initSearchOptions).find('input[type="submit"]').trigger('click');
}

function QueryString(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    var r = [], m;
    while ((m = re.exec(document.location.search)) != null) r.push(m[1]);
    return r;
}
