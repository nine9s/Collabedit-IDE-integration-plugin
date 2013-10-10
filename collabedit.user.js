// ==UserScript==
// @name           collabedit
// @namespace      http://mefju.pl
// @include        http://collabedit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

if (window.top != window.self) {
    //do not run for wrapping iframe
    return;
}

var greaseMonkeyLimitationUrl 
    = "http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Security_Hole_.233%3a_Local_File_Access";

var doPeriodicUpdate = false;

$(function() {
    insertSiteControls();
    initializeControlsActions();
    scheduleSourceUpdates();
});   

function insertSiteControls() {
    $("body").append(" \
        <br /> \
        <label for='sourceFile'>Source file path: </label> \
        <input type='text' name='sourceFile' id='sourceFile'/> \
        <button id='updateSourceFileOnceButton'>Insert Once</button> \
        <input type='checkbox' name='insertingCheckbox' id='insertingCheckbox'/> \
        <label for='insertingCheckbox'>Enable source file updates</label> \
        <br/><br/> \
        Status: <span id='insertStatus'>Not Running</span> \
    ");
}

function initializeControlsActions() {
    $("#insertingCheckbox").change(function() {
        doPeriodicUpdate = $(this).attr('checked');
    }); 

    $("#updateSourceFileOnceButton").click(function() {
        updateSourceFile();
    });
}

function scheduleSourceUpdates() {
    setInterval(function() {
        if (doPeriodicUpdate) {
            updateSourceFile();
        }      
    }, 500);
}

function updateSourceFile() {
    GM_xmlhttpRequest({
        method: "GET",
        url: getNotCacheableFileUrl(),
        onload: function(response) {
            applySourceFileUpdate(response);
        }
    });
}

function getNotCacheableFileUrl() {
    var userFilePath = $("#sourceFile").val();
    if (userFilePath.indexOf("file:/") >= 0) {
        alert("Local files are not supported by GreaseMonkey: " + greaseMonkeyLimitationUrl);
    }
    if (userFilePath.indexOf("http://") == -1) {
        userFilePath = "http://" + userFilePath;
        $("#sourceFile").val(userFilePath);
    }
    return $("#sourceFile").val() + "?" + new Date().getTime();
}

function applySourceFileUpdate(response) {
    $("#insertStatus").text(response.statusText + ' ' + new Date());
    var sourceFileContent = response.responseText;
    
    var currentContent = unsafeWindow.editAreaLoader.getValue("the_input");
    var start = currentContent.indexOf('/*START*/');
    var end = currentContent.indexOf('/*END*/');
    var preText = currentContent.substring(0, start+9);
    var postText = currentContent.substring(end);
    var finalContent = preText+sourceFileContent+postText;
    unsafeWindow.editAreaLoader.setValue("the_input", finalContent);
    unsafeWindow.otClient.handleLocalTextChange(finalContent);

}
    
