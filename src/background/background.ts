
chrome.runtime.onInstalled.addListener(() => {
    console.log("hello laoded");
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log('i just bookmarked this page')
})