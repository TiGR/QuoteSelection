quoteSelection = {

    quoteData: {},
    quoteButton: null,
    
    init: function() {
        // we use "mouseup" event since Chrome does not work with "select" one.
        $("body").mouseup(function(e){
            if (txt = window.getSelection)
                txt = window.getSelection().toString();
            else
                txt = document.selection.createRange().text;
            quoteData = {};
            quoteButton = quoteSelection.getQuoteButton(e);
            if (!txt)
                // no text selected.
                return true;

            meta = $(e.target).parents("li.Comment").find(".Meta");
            if (meta.length==0) 
                // selected text does not belong to comments
                return true;
            quoteData = {
                text: txt,
                author: $.trim(meta.find(".Author").text()),
                url: meta.find(".Permalink a").attr("href")
            }
            quoteButton.show();
            return false;
        });
        
        quoteSelection.replaceLinks();
        
        // replace links when new comments get loaded with morepager.
        $(document).bind('CommentPagingComplete', {}, quoteSelection.replaceLinks);
        $(document).bind('CommentAdded', {}, quoteSelection.replaceLinks);
    },
    
    // Replace absolute comment links with relative where possible
    replaceLinks: function() {
        $("ul.Discussion div.Message blockquote a").each(function(i,el) {
            if (el.href.indexOf(gdn.combinePaths(gdn.definition('WebRoot', ''),
                "discussion/comment/")) === 0) {
                if (el.hash && $(el.hash).length) {
                    el.href = el.hash;
                }
            }
        });
    },

    // Creates or returns (if it already exists) "Quote" button, sets it's position. and hides it if it was displayed.
    getQuoteButton: function(e) {
        if (!document.getElementById("quoteButton")) {
            quoteButton = document.createElement("a");
            quoteButton.style.display = "none";
            quoteButton.id = "quoteButton";
            quoteButton.href = "#Form_Comment";
            document.body.insertBefore(quoteButton, document.body.firstChild);
            $("#quoteButton").text(gdn.definition("qsQuote")).mouseup(function(e){
                body = $("#Form_Body").val();
                if (body!='') {
                    body += "\n\n";
                }
                $("#Form_Body").parents("div.CommentForm").trigger("resetCommentForm");
                $("#Form_Body").val(body + quoteSelection.getQuoteText()).focus();
                $("#quoteButton").hide();
                return false;
            });
        }
        return $("#quoteButton").css({
            display: "none",
            position: "absolute",
            left: e.pageX,
            top: e.pageY
        });
    },

    // returns quotation formatted according current InputFormatter setting
    getQuoteText: function() {
        visualEditorMode = ((window.tinyMCE !== undefined) || ($.cleditor));
        title = gdn.definition('qsQuoteText').replace('%s', quoteData.author);
        switch (gdn.definition('qsInputFormatter','html')) {
            case "markdown":
                // trim down domain part to make links shorter
                url = quoteData.url.replace(/^https?:\/\/[^\/]*/, '');
                return "> [" + title + "](" + url + "): " +
                    quoteData.text.replace("\r", "").replace(/\n{2,}/gm, "\n\n>") +
                    "\n\n";

            case "bbcode":
                return "[quote][url=" + quoteData.url + "]" + title + "[/url]: " +
                    quoteData.text + "[/quote]\n\n";

            case "html":
            default:
                return "<blockquote><a href=\"" + quoteData.url + "\">" + title +
                    "</a>: " + quoteData.text + "</blockquote>" +
                    (visualEditorMode ? "<p>" : "\n\n");
        }
    }
}

$(document).ready(function() {
    quoteSelection.init();
});