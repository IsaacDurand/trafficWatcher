function storeData(){
    event.preventDefault();
    chrome.storage.local.set({"destination": document.getElementById('destination').value}, function(){});
    chrome.storage.local.set({"start": document.getElementById('start-time').value}, function(){});
    chrome.storage.local.set({"buffer": document.getElementById('buffer-minutes').value}, function(){});

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('store').addEventListener('click', storeData);
});
