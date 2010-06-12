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
            quoteButton.href = "#";
            document.body.insertBefore(quoteButton);
        }
        return $("#quoteButton").css({position:"absolute",left:e.pageX,top:e.pageY}).text("quote").click(function(e){
            $("#Form_Body").val($("#Form_Body").val()+"\n\n> [comment from " + quoteData.name + "](" + quoteData.url + ")  \n" + quoteData.text);
        });
    }
});