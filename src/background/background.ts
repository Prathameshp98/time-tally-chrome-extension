
import setStorage from "../Utils/extension/setStorage";
import storageHandler from "../Utils/extension/storageHandler";

let previousTabId = null;

// Listen for the tab activation event
chrome.tabs.onActivated.addListener(function (activeInfo) {
    const currentTabId = activeInfo.tabId;

    // Get the currently active tab's URL and domain
    chrome.tabs.get(currentTabId, async function (currentTab) {
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
                await storageHandler(currentDomain);
                
            } catch (error) {
                console.error('Error parsing current tab URL:', error);
            }
        }
    });

    // If there was a previously active tab, get its URL and domain
    if (previousTabId !== null && previousTabId !== currentTabId) {
        chrome.tabs.get(previousTabId, async function (previousTab) {
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

                    chrome.storage.local.get('data', async function (result) {
                        // Handle missing data or stats
                        
                        if(!(result.data && result.data.stats)){
                            await storageHandler(previousDomain);
                        }
                        let statsData = result?.data?.stats;

                        // Call your setStorage function here
                        await setStorage(statsData, currentTimeStamp, previousDomain, true);
                    });
                } catch (error) {
                    console.error('Error parsing previous tab URL:', error);
                }
            }
        });
    }

    // Update the previously active tab ID
    previousTabId = currentTabId;
});


