# tao_autosave_plugin

## Description
A set of plugins for saving Extended Text Responses in the TAO Testing Platform

autosave.js is a plugin designed to 'force' a save every 5 minutes
save_button.js creates a save button allowing the user to 'force' a save on demand

Both plugins work by calling the 'jump' event of the testRunner api. The jump is made to the same question the user is currently on. Since the jump even triggers the submitItem proxy the current status of the question is 'saved' or submitted to the backend. For the end user this looks like the page refreshing. For this reason test takers should be made known of this behavior beforehand if autosave.js is enabled.

The design of these plugins also means they only work on 'non-linear' test designs (if a user is only given one attempt on a question the 'jump' on save will count as that attempt). The test design must allow for unlimited attempts and navigation to said question.



## Installation
Place the folder save_plugins into the taoQtiTest/views/js/plugins/tools directory of your TAO installation.

Register the plugins by editing config/taoTests/test_runner_plugin_registry.conf.php to contain the following...
'''javascript

'taoQtiTest/runner/plugins/tools/save_plugins/save_button' =>array(
    'id' => 'save_button',
    'module' => 'taoQtiTest/runner/plugins/tools/save_plugins/save_button',
    'bundle' => null,
    'position' => null,
    'name' => 'save_button',
    'description' => 'Save Button',
    'category' => 'tools',
    'active' => true,
    'tags' => array('tools')
),

'taoQtiTest/runner/plugins/tools/save_plugins/autosave' =>array(
    'id' => 'autosave',
    'module' => 'taoQtiTest/runner/plugins/tools/save_plugins/autosave',
    'bundle' => null,
    'position' => null,
    'name' => 'autosave',
    'description' => 'Automatically saves question data',
    'category' => 'tools',
    'active' => true,
    'tags' => array('tools')
)
'''

## Usage
Enable the plugins for respective questions by adding the categories 'saveButton' and/or 'autoSave' in the Properties of each test item in Test Authoring.
