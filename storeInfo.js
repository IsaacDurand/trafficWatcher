function storeData(){
    event.preventDefault();
    chrome.storage.local.set({"destination": document.getElementById('destination').value}, function(){});
    chrome.storage.local.set({"start": document.getElementById('start-time').value}, function(){});
    chrome.storage.local.set({"buffer": document.getElementById('buffer-minutes').value}, function(){});

}

function clearForm(){
	document.getElementById('destination').value = '';
	document.getElementById('start-time').value = '';
	document.getElementById('buffer-minutes').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('store').addEventListener('click', function() {
    	storeData();
    	clearForm();
    	// add message
    	document.getElementById('test').innerHTML = '<p><strong>Thanks! Please wait while we calculate your expected drive time.</strong><a href="https://www.facebook.com/" target="_blank"></p><img src="icon.png"></a>'
    });
});
