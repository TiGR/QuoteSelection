quoteSelection = {

    quoteData:      {},
    quoteButton:    null,
    range:          null,
    txt:            "",
    node:           null,
    html:           "",
    
    init: function() {
        // we use "mouseup" event since Chrome does not work with "select" one.
        $("body").mouseup(function(e) {
            quoteSelection._getSelectionData();
            quoteData = {};
            quoteButton = quoteSelection.getQuoteButton(e);
            if (typeof(html) == 'undefined' || !html || e.target.tagName == 'TEXTAREA')
                // no text selected or it is edit textarea field.
                return true;
            
            $node = $(node);
            meta = $node.parents("li.Comment").length
                ? $node.parents("li.Comment").find(".Meta")
                : $node.find(".Meta");
            if (meta.length==0) {
                // selected text does not belong to comments
                quoteButton.hide(); // in case it was already displayed.
                return true;
            }
            quoteData = {
                text:   txt,
                author: $.trim(meta.find(".Author").text()),
                url:    meta.find(".Permalink a").attr("href"),
                html:   html
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
                if (window.getSelection) 
                    window.getSelection().empty();
                else
                    document.selection.clear();
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
                    "</a>: " + quoteData.html + "</blockquote>" +
                    (visualEditorMode ? "<p>" : "\n\n");
        }
    },
    
    _getSelectionData: function() {
        if (window.getSelection != undefined) {
            // The w3c way
            selection = window.getSelection();
            node = selection.anchorNode;
            // endNode = selection.focusNode; // just in case :)
            if (node != null) {
                // something selected
                txt = selection.toString();
                quoteSelection._getSelectionHTML(selection);
            }
        } else {
            // IE<9 mustdie.
            range = document.selection.createRange();
            txt = document.selection.text;
            html = range.htmlText;
            node = range.parentElement();
        }
    },
    
    _getSelectionHTML: function(selection) {
        range = selection.getRangeAt(0).cloneRange();
        div = range.startContainer.ownerDocument.createElement("div");
        div.appendChild(range.cloneContents());
        html = div.innerHTML;
        // cleanup:
        range.detach();
        delete div;
        delete range;
    }
}

$(document).ready(function() {
    quoteSelection.init();
});