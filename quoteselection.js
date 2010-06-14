$(document).ready(function() {
    quoteData = {};
    // we use "mouseup" event since Chrome does not work with "select" one.
    $("ul.Discussion div.Comment").mouseup(function(e){
        if (txt = window.getSelection)
            txt = window.getSelection().toString();
        else
            txt = document.selection.createRange().text;
        quoteButton = getQuoteButton(e);
        quoteData = {};
        if (!txt)
            // no text selected.
            return;

        meta = $(e.currentTarget).find(".Meta");
        name = meta.find(".Author").text().trim();
        url = meta.find(".Permalink a").attr("href");
    
        quoteData = {text: txt, name:name, url:url}
        quoteButton.show();
    });

    // Creates or returns (if it already exists) "Quote" button, and sets it's position
    getQuoteButton = function(e) {
        if (!document.getElementById("quoteButton")) {
            quoteButton = document.createElement("a");
            quoteButton.style.display = "none";
            quoteButton.id = "quoteButton";
            quoteButton.href = "#Form_Comment";
            document.body.insertBefore(quoteButton, document.body.firstChild);
            $("#quoteButton").text(gdn.definition("qsQuote")).click(function(e){
                body = $("#Form_Body").val();
                if (body!='') {
                    body += "\n\n";
                }
                resetCommentForm();
                $("#Form_Body").val(body + getQuoteText()).focus();
                $("#quoteButton").hide();
            });
        }
        return $("#quoteButton").css({display:"none",position:"absolute",left:e.pageX,top:e.pageY});
    }

    // returns quotation formatted according current InputFormatter setting
    getQuoteText = function() {
        title = gdn.definition('qsQuoteText').replace('%s', quoteData.name);
        // trim down domain part to make links shorter
        url = quoteData.url.replace(/^https?:\/\/[^\/]*/, '');
        switch (gdn.definition('qsInputFormatter','Html')) {
            case "Markdown":
                return "> *[" + title + "](" + url + ")*  \n" + quoteData.text.replace("\r", "").replace(/\n{2,}/gm, "\n\n>") + "\n\n";
            case "BBCode":
                return "[quote][i][url=" + url + "]" + title + "[/url][/i]\n" + quoteData.text + "[/quote]\n\n";
                break
            default:
                return "<blockquote><i><a href=\"" + url + "\">" + title + "</a></i>\n" + quoteData.text + "</blockquote>\n\n";
                break;
        }
    }
    
    // shows Comment textarea if it is not already displayed.
    function resetCommentForm() {
        var parent = $('div.CommentForm');
        $(parent).find('li.Active').removeClass('Active');
        $('a.WriteButton').parents('li').addClass('Active');
        $(parent).find('div.Preview').remove();
        $(parent).find('textarea').show();
        $('span.TinyProgress').remove();
    }
});