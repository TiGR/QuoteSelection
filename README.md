Quote Selection plugin version 0.7 for Vanilla 2
================================================

About
-----

This plugin provides users a tool to quote selected parts of discssion, quotes 
are formatted according to current InputFormatter setting (currently supported 
InputFormatters are: Markdown, Html and BBCode). Currently should work well with
visual editors, keeping formatting of selected text.

Installation
------------

Copy QuoteSelection directory to plugins/ and enable plugin in dashboard.

Configuration
-------------

There is no configuration currently. But you can localize this plugin to your 
language by adding thie following strings to definitions.php file:

    $Definition["Quote"] = "<Quote Button text>";
    $Definition["%s said"] = "<Text for quote title>";

Known Issues
------------

None.

Changes
-------

### 0.7 [2010.12.10]

- Fixed bug when "Cancel" button in inline comment edit form was not closing it,
but redirecting to discussions list page.
- Better support for alternative editors (such as WYSIWYG).
- New way to determine selection position. Selection problem should be fixed.
- Fix bug with button popping up on selections within inline edit textarea.

### 0.6 [2010.07.21]

- Minor fixes.

### 0.5 [2010.06.24]

- Automatically convert absolute links to anchors only, so that user could jump 
to comments that are on current page without page reload.
- Small optimization - use DiscussionController_RenderBefore instead of 
Base_Render_Before.
- JS code rewrite in order to make it reusable, object quoteSelection added.

### 0.4 [2010.06.20]

- Fix bug with bbCode and HTML generation.

### 0.3 [2010.06.18]

- Make this feature work only for registered users.

License
-------

This code is licensed under GPL free license.

Contacts
--------

Igor Tarasov  
tarasov.igor@gmail.com (email/gtalk/jabber)  
GitHub repository: [github.com/TiGR/QuoteSelection/](https://github.com/TiGR/QuoteSelection/)  
Issue tracker: [github.com/TiGR/QuoteSelection/issues](https://github.com/TiGR/QuoteSelection/issues)