<?php if (!defined('APPLICATION')) exit();

// Define the plugin:
$PluginInfo['QuoteSelection'] = array(
    'Name' => 'Quote selection',
    'Description' => "Provides a simple tool to quote posts. User just have to select text and click &quot;quote&quot; button that would appear.",
    'Version' => '0.1',
    'Author' => "Igor Tarasov",
    'AuthorEmail' => 'tarasov.igor@gmail.com',
    'AuthorUrl' => 'http://polosatus.ru',
);

class QuoteSelection implements Gdn_IPlugin {

    public function Base_Render_Before(&$Sender) {
        if ($Sender->ControllerName != 'discussioncontroller')
            return;
        $Sender->AddJsFile('/plugins/QuoteSelection/quoteselection.js');
        $Sender->AddCssFile('plugins/GettingStarted/style.css');
        $Sender->AddDefinition('QS.InputFormatter', Gdn::Config('Garden.InputFormatter'));
        $Sender->AddDefinition("QS.Quote", T('Quote'));
        $Sender->AddDefinition("QS.QuoteText", T('Comment by %s'));
    }
    
    public function Setup() {}

}

?>