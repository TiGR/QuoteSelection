<?php if (!defined('APPLICATION')) exit();

// Define the plugin:
$PluginInfo['QuoteSelection'] = array(
    'Name' => 'Quote selection',
    'Description' => "Provides a simple tool to quote posts. Users can select text some comment text and click &quot;quote&quot; button that would appear te get formatted quote.",
    'Version' => '0.7',
    'HasLocale' => TRUE,
    'Author' => "Igor Tarasov",
    'AuthorEmail' => 'tarasov.igor@gmail.com',
    'AuthorUrl' => 'http://polosatus.ru',
);

class QuoteSelectionPlugin extends Gdn_Plugin {

    public function DiscussionController_Render_Before(&$Sender) {
        $Session = Gdn::Session();
        
        if ($Session->UserID == 0)
            // we enable this feature only for logged in users and only on discussion page
            return;

        $Sender->AddJsFile($this->GetResource('quoteselection.js', FALSE, FALSE));
        $Sender->AddCssFile($this->GetResource('quoteselection.css', FALSE, FALSE));
        $Sender->AddDefinition('qsInputFormatter', strtolower(Gdn::Config('Garden.InputFormatter')));
        $Sender->AddDefinition("qsQuote", T('Quote'));
        $Sender->AddDefinition("qsQuoteText", T('%s said'));
    }
    
    public function Setup() {}

}

?>
