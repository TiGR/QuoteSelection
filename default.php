<?php if (!defined('APPLICATION')) exit();

// Define the plugin:
$PluginInfo['QuoteSelection'] = array(
    'Name' => 'Quote selection',
    'Description' => "Provides a simple tool to quote posts. Users can select text some comment text and click &quot;quote&quot; button that would appear te get formatted quote.",
    'Version' => '0.4',
    'Author' => "Igor Tarasov",
    'AuthorEmail' => 'tarasov.igor@gmail.com',
    'AuthorUrl' => 'http://polosatus.ru',
);

class QuoteSelection implements Gdn_IPlugin {

    public function Base_Render_Before(&$Sender) {
        $Session = Gdn::Session();
        
        if ($Session->UserID == 0 or $Sender->ControllerName != 'discussioncontroller')
            // we enable this feature only for logged in users and only on discussion page
            return;

        $Sender->AddJsFile('/plugins/QuoteSelection/quoteselection.js');
        $Sender->AddCssFile('plugins/QuoteSelection/quoteselection.css');
        $Sender->AddDefinition('qsInputFormatter', Gdn::Config('Garden.InputFormatter'));
        $Sender->AddDefinition("qsQuote", T('Quote'));
        $Sender->AddDefinition("qsQuoteText", T('%s said'));
    }
    
    public function Setup() {}

}

?>
