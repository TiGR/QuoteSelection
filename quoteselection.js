$(document).ready(function() {
    quoteData = {};
    $("ul.Discussion div.Message").unbind().mouseup(function(e){
        quoteButton = getQuoteButton(e);
        quoteButton.hide();
        quoteData = {};
        if (txt = window.getSelection)
            txt = window.getSelection().toString();
        else
            txt = document.selection.createRange().text;
        if (!txt)
            // no text selected.
            return;

        meta = $(e.currentTarget).siblings(".Meta");
        name = meta.find(".Author").text().trim();
        url = meta.find(".Permalink a").attr("href");
    
        quoteData = {text: txt, name:name, url:url}
        console.log(e);
        console.log(quoteData);
        quoteButton.show();
    });

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
        return $("#quoteButton").css({position:"absolute",left:e.pageX,top:e.pageY});
    }

    getQuoteText = function() {
        title = gdn.definition('qsQuoteText').replace('%s', quoteData.name);
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
    
    function resetCommentForm() {
        var parent = $('div.CommentForm');
        $(parent).find('li.Active').removeClass('Active');
        $('a.WriteButton').parents('li').addClass('Active');
        $(parent).find('div.Preview').remove();
        $(parent).find('textarea').show();
        $('span.TinyProgress').remove();
    }
});