Collabedit IDE integration plugin
=================================

This is a GreaseMonkey plugin to quickly integrate collabedit.com with your editor.

In simple words: you will be able to present your solution on collabedit, coding in your own environment, using ctrl+space, executing the code, etc. 

How to use it:
--------------
    #. Install GreaseMonkey plugin for firefox. Enable it.
    #. Add collabedit.user.js to GreaseMonkey configuration (enable it for url patterns: http://collabedit.com/*)
    #. Setup some light server to serve your source file. For example run in your project directory:
        python -m SimpleHTTPServer 9914
    #. Setup your IDE to automatically save your source file every second.
    #. Go to collabedit.com site and find the plugins controls below the main textarea.

Tips:
-----
    #. The plugin might be helpful in facebook technical interview. 
    #. I strongly reccomend you to ask your interviewer for permission, before you use the plugin. 
    #. You are using it for your own responsibility! I am not responsible for any potential interview failures, caused by the plugin. 
    #. Double check that the plugin works fine for you. Especially, it may stop working after collabedit software update.

How does it work:
-----------------
    * The plugin reads a specified file in short intervals. That means, the file needs to be saved very often in order to let the plugin "see" the changes. 
    * The solution is not very sophisticated, nor effective but for one-time collabedit-collaboration is just enough.

Limitations:
------------
    #. When the plugin is enabled, all the changes of your collaborators would be overwritten.
    #. Local source files are not supported. You have to serve it with http. (This is to GreaseMonkey security reasons)


