
function storageClear(){
    chrome.storage.local.clear(function() {
        console.log('All data has been cleared from local storage');
    });
}

export default storageClear;