
import setStorage from "../Utils/setStorage";
import storageHandler from "../Utils/storageHandler";

chrome.runtime.onInstalled.addListener(() => {
    console.log("hello laoded");
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log('i just bookmarked this page')
})

// let previousTabId = null;

// chrome.tabs.onActivated.addListener(function(activeInfo) {

//     const currentTimeStamp = new Date().getTime();

//     // If there was a previously active tab, get its URL
//     if (previousTabId !== null) {
//         chrome.tabs.get(previousTabId, function(tab) {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//                 return;
//             }
            
//             const domain = (new URL(tab.url)).hostname;
//             console.log('Left tab URL:', domain);

//             chrome.storage.local.get('data', function(result) {
//                 const statsData = result.data.stats;

//                 setStorage(statsData, currentTimeStamp, domain, true);
//             })
//         });
//     }

//     previousTabId = activeInfo.tabId;
// });






let previousTabId = null;

// Listen for the tab activation event
chrome.tabs.onActivated.addListener(function (activeInfo) {
    const currentTabId = activeInfo.tabId;

    // If there was a previously active tab, get its URL and domain
    if (previousTabId !== null && previousTabId !== currentTabId) {
        chrome.tabs.get(previousTabId, function (previousTab) {
            if (chrome.runtime.lastError) {
                console.error('Error fetching previous tab: ', chrome.runtime.lastError.message);
                return;
            }

            const currentTimeStamp = new Date().getTime();

            if (previousTab && previousTab.url) {
                try {
                    // Extract the domain of the left tab
                    const previousDomain = new URL(previousTab.url).hostname;
                    console.log('Left tab domain:', previousDomain);

                    chrome.storage.local.get('data', function (result) {
                        // Handle missing data or stats
                        let statsData = result.data.stats;
                        if(!(result.data && result.data.stats)){
                            // storageHandler(previousDomain);
                        }

                        // Call your setStorage function here
                        setStorage(statsData, currentTimeStamp, previousDomain, true);
                    });
                } catch (error) {
                    console.error('Error parsing previous tab URL:', error);
                }
            }
        });
    }

    // Get the currently active tab's URL and domain
    chrome.tabs.get(currentTabId, function (currentTab) {
        if (chrome.runtime.lastError) {
            console.error('Error fetching current tab: ', chrome.runtime.lastError.message);
            return;
        }

        if (currentTab && currentTab.url) {
            try {
                // Extract the domain of the entered tab
                const currentDomain = new URL(currentTab.url).hostname;
                console.log('Entered tab domain:', currentDomain);

                // Call your storageHandler function here
                // storageHandler(currentDomain);
            } catch (error) {
                console.error('Error parsing current tab URL:', error);
            }
        }
    });

    // Update the previously active tab ID
    previousTabId = currentTabId;
});


