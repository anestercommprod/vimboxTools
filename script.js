document.getElementById("techSup_scripts").onclick = function()
{
    chrome.windows.create({'url': 'techSup_scripts.html', 'type': 'popup'}, function(window) {
    });
}