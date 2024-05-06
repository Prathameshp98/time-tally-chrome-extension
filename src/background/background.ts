
chrome.runtime.onInstalled.addListener(() => {
    console.log("hello laoded");
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log('i just bookmarked this page')
})

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log('Tab with ID', activeInfo.tabId, 'is now active.');
});